<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use App\Models\TransactionPasca;
use App\Models\TransactionPrabayar;
use App\Services\DigiflazService;
use App\Services\GetCode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    protected $digiflaz;
    protected $_get_kode;

    public function __construct(DigiflazService $digiflaz, GetCode $_get_kode)
    {
        $this->digiflaz  = $digiflaz;
        $this->_get_kode = $_get_kode;
    }

    public function topup(Request $request)
    {
        $cek_saldo       = $this->cek_saldo_digiflaz();
        $current_product = ProductPrabayar::where('product_sku', $request->sku)->first();
        if ($current_product->product_cost > $cek_saldo['deposit']) {
            return response()->json(['data' => ['status' => false, 'message' => 'Mohon maaf. Saat ini transaksi tidak dapat dilakukan']], 500);
        }

        $kode = $this->_get_kode->_generate();
        $params = [
            'buyer_sku_code' => $request->sku,
            'customer_no'    => $request->customer_no,
            'ref_id'         => $kode
        ];

        $response = $this->digiflaz->request('transaction', $params, $kode);

        if ($response['data']['status'] !== 'Gagal') {
            TransactionPrabayar::create([
                'transaction_code'             => $kode,
                'transaction_customer_no'      => $request->customer_no,
                'transaction_sku'              => $request->sku,
                'transaction_message'          => $response['data']['message'],
                'transaction_status'           => $response['data']['status'],
                'transaction_status_code'      => $response['data']['rc'],
                'transaction_product_category' => $current_product->product_category,
                'transaction_product_brand'    => $current_product->product_brand,
                'transaction_sn'               => $response['data']['sn'],
                'transaction_user_id'          => Auth::user()->id,
                'transaction_source'           => 'winpay mobile',
                'created_at'                   => Carbon::now(),
                'updated_at'                   => Carbon::now()
            ]);
        }

        return response()->json(['data' => [
            'status'  => $response['data']['status'] !== 'Gagal' ? true : false,
            'message' => $response['data']['message'],
            'data'    => $response['data']
        ]]);
    }

    public function inq_pasca(Request $request)
    {
        $kode = $this->_get_kode->_generate();

        $params = [
            'commands'       => 'inq-pasca',
            'buyer_sku_code' => $request->sku,
            'customer_no'    => $request->customer_no,
            'ref_id'         => $kode
        ];

        $response = $this->digiflaz->request('transaction', $params, $kode);
        if ($response['data']['status'] !== 'Gagal') {
            $response['data']['total_without_admin'] = $response['data']['selling_price'] - $response['data']['admin'];
        }

        return response()->json($response);
    }

    protected function cek_saldo_digiflaz()
    {
        $params = [
            'cmd' => 'deposit'
        ];

        $result   = $this->digiflaz->request('cek-saldo', $params, 'depo');
        $response = $result['data'];

        return $response;
    }

    public function pay_pasca(Request $request)
    {
        $cek_saldo       = $this->cek_saldo_digiflaz();
        $current_product = ProductPasca::where('product_sku', $request->sku)->first();
        if ($request->selling_price > $cek_saldo['deposit']) {
            return response()->json(['data' => [
                'status'  => false,
                'message' => 'Mohon maaf. Saat ini transaksi tidak dapat dilakukan'
            ]], 500);
        }

        $params = [
            'commands'       => 'pay-pasca',
            'buyer_sku_code' => $request->sku,
            'customer_no'    => $request->customer_no,
            'ref_id'         => $request->ref_id
        ];

        $response = $this->digiflaz->request('transaction', $params, $request->ref_id);

        if ($response['data']['status'] !== 'Gagal') {
            TransactionPasca::create([
                'transaction_code'             => $request->ref_id,
                'transaction_customer_no'      => $request->customer_no,
                'transaction_sku'              => $request->sku,
                'transaction_message'          => $response['data']['message'],
                'transaction_status'           => $response['data']['status'],
                'transaction_status_code'      => $response['data']['rc'],
                'transaction_product_category' => $current_product->product_category,
                'transaction_product_brand'    => $current_product->product_brand,
                'transaction_sn'               => $response['data']['sn'],
                'transaction_price'            => $response['data']['selling_price'],
                'transaction_user_id'          => Auth::user()->id,
                'transaction_source'           => 'winpay mobile',
                'created_at'                   => Carbon::now(),
                'updated_at'                   => Carbon::now()
            ]);
        }

        return response()->json($response);
    }

    public function pln_subcribe(Request $request)
    {
        $result = $this->digiflaz->pln_subcribe('transaction', $request->customer_no);

        return response()->json($result);
    }

    public function _get_all_transaction(Request $request)
    {
        $result = [];

        $data_prabayar   = $this->_get_trx_prabayar($request);
        $data_pascabayar = $this->_get_trx_pascabayar($request);

        if ($data_prabayar) {
            foreach ($data_prabayar as $prabayar) {
                $insert = array(
                    'transaction_code'                  => $prabayar->transaction_code,
                    'transaction_customer_no'           => $prabayar->transaction_customer_no,
                    'transaction_product_sku'           => $prabayar->transaction_sku,
                    'transaction_customer_no_formatted' => strlen($prabayar->transaction_customer_no) > 6 ? substr($prabayar->transaction_customer_no, 0, 6) . str_repeat('*', strlen($prabayar->transaction_customer_no) - 6) : $prabayar->transaction_customer_no,
                    'transaction_message'               => $prabayar->transaction_message,
                    'transaction_status'                => $prabayar->transaction_status,
                    'transaction_product_category'      => $prabayar->transaction_product_category,
                    'transaction_product_brand'         => $prabayar->transaction_product_brand,
                    'transaction_sn'                    => $prabayar->transaction_sn,
                    'transaction_product_name'          => $prabayar->productPrepaid->product_name,
                    'transaction_product_price'         => $prabayar->productPrepaid->product_price,
                    'transaction_date'                  => Carbon::parse($prabayar->created_at)->translatedFormat('d F Y'),
                    'transaction_type'                  => 'Prabayar'
                );
                array_push($result, $insert);
            }
        }

        if ($data_pascabayar) {
            foreach ($data_pascabayar as $pascabayar) {
                $insert = array(
                    'transaction_code'                  => $pascabayar->transaction_code,
                    'transaction_customer_no'           => $pascabayar->transaction_customer_no,
                    'transaction_product_sku'           => $pascabayar->transaction_sku,
                    'transaction_customer_no_formatted' => strlen($pascabayar->transaction_customer_no) > 6 ? substr($pascabayar->transaction_customer_no, 0, 6) . str_repeat('*', strlen($pascabayar->transaction_customer_no) - 6) : $pascabayar->transaction_customer_no,
                    'transaction_message'               => $pascabayar->transaction_message,
                    'transaction_status'                => $pascabayar->transaction_status,
                    'transaction_product_category'      => $pascabayar->transaction_product_category,
                    'transaction_product_brand'         => $pascabayar->transaction_product_brand,
                    'transaction_sn'                    => $pascabayar->transaction_sn,
                    'transaction_product_name'          => $pascabayar->productPasca->product_name,
                    'transaction_product_price'         => 'Rp ' . number_format($pascabayar->transaction_price, 0, ',', '.'),
                    'transaction_date'                  => Carbon::parse($pascabayar->created_at)->translatedFormat('d F Y'),
                    'transaction_type'                  => 'Pascabayar'
                );
                array_push($result, $insert);
            }
        }

        return response()->json(['status' => true, 'message' => $result ? 'Sukses' : 'Tidak ada transaksi', 'data' => $result], 200);
    }

    public function _get_latest_trx(Request $request)
    {
        $result = [];

        $data_prabayar   = $this->_get_trx_prabayar_new();
        $data_pascabayar = $this->_get_trx_pascabayar_new();

        if ($data_prabayar) {
            foreach ($data_prabayar as $prabayar) {
                $insert = array(
                    'transaction_code'                  => $prabayar->transaction_code,
                    'transaction_customer_no'           => $prabayar->transaction_customer_no,
                    'transaction_product_sku'           => $prabayar->transaction_sku,
                    'transaction_customer_no_formatted' => strlen($prabayar->transaction_customer_no) > 6 ? substr($prabayar->transaction_customer_no, 0, 6) . str_repeat('*', strlen($prabayar->transaction_customer_no) - 6) : $prabayar->transaction_customer_no,
                    'transaction_message'               => $prabayar->transaction_message,
                    'transaction_status'                => $prabayar->transaction_status,
                    'transaction_product_category'      => $prabayar->transaction_product_category,
                    'transaction_product_brand'         => $prabayar->transaction_product_brand,
                    'transaction_sn'                    => $prabayar->transaction_sn,
                    'transaction_product_name'          => $prabayar->productPrepaid->product_name,
                    'transaction_product_price'         => $prabayar->productPrepaid->product_price,
                    'transaction_date'                  => $prabayar->created_at,
                    'transaction_date_formatted'        => Carbon::parse($prabayar->created_at)->translatedFormat('d F Y'),
                    'transaction_type'                  => 'Prabayar'
                );
                array_push($result, $insert);
            }
        }

        if ($data_pascabayar) {
            foreach ($data_pascabayar as $pascabayar) {
                $insert = array(
                    'transaction_code'                  => $pascabayar->transaction_code,
                    'transaction_customer_no'           => $pascabayar->transaction_customer_no,
                    'transaction_product_sku'           => $pascabayar->transaction_sku,
                    'transaction_customer_no_formatted' => strlen($pascabayar->transaction_customer_no) > 6 ? substr($pascabayar->transaction_customer_no, 0, 6) . str_repeat('*', strlen($pascabayar->transaction_customer_no) - 6) : $pascabayar->transaction_customer_no,
                    'transaction_message'               => $pascabayar->transaction_message,
                    'transaction_status'                => $pascabayar->transaction_status,
                    'transaction_product_category'      => $pascabayar->transaction_product_category,
                    'transaction_product_brand'         => $pascabayar->transaction_product_brand,
                    'transaction_sn'                    => $pascabayar->transaction_sn,
                    'transaction_product_name'          => $pascabayar->productPasca->product_name,
                    'transaction_product_price'         => 'Rp ' . number_format($pascabayar->transaction_price, 0, ',', '.'),
                    'transaction_date'                  => $pascabayar->created_at,
                    'transaction_date_formatted'        => Carbon::parse($pascabayar->created_at)->translatedFormat('d F Y'),
                    'transaction_type'                  => 'Pascabayar'
                );
                array_push($result, $insert);
            }
        }

        $latestTrx = collect($result)->sortByDesc('transaction_date')->take(5);

        return response()->json(['status' => true, 'message' => $latestTrx ? 'Sukses' : 'Tidak ada transaksi', 'data' => $latestTrx->values()->all()], 200);
    }

    protected function _get_trx_prabayar($data)
    {
        $TransaksiPrabayar = TransactionPrabayar::with('productPrepaid');

        if ($data->status !== 'Semua Status') {
            $TransaksiPrabayar->where('transaction_status', $data->status);
        }
        if ($data->produk !== 'Semua Produk') {
            $TransaksiPrabayar->where('transaction_product_category', $data->produk);
        }

        if ($data->periode !== 'Semua Tanggal') {
            if ($data->periode === '7 Hari Terakhir') {
                $TransaksiPrabayar->whereDate('created_at', '>=', Carbon::now()->subDays(7)->toDateString());
            } elseif ($data->periode === '30 Hari Terakhir') {
                $TransaksiPrabayar->whereDate('created_at', '>=', Carbon::now()->subDays(30)->toDateString());
            } elseif ($data->periode === 'Pilih tanggal sendiri' && $data->startDate && $data->endDate) {
                $TransaksiPrabayar->whereBetween(DB::raw('DATE(created_at)'), [
                    $data->startDate,
                    $data->endDate
                ]);
            }
        } else {
            $TransaksiPrabayar->whereYear('created_at', Carbon::now()->year);
        }

        if (Auth::user()->hasRole('Mitra')) {
            $TransaksiPrabayar->where('transaction_user_id', Auth::user()->id);
        }

        $result = $TransaksiPrabayar->latest()->get();

        return $result;
    }

    protected function _get_trx_pascabayar($data)
    {
        $TransaksiPascabayar = TransactionPasca::with('productPasca');

        if ($data->status !== 'Semua Status') {
            $TransaksiPascabayar->where('transaction_status', $data->status);
        }

        $brand = $data->produk;
        if ($brand !== 'Semua Produk') {
            if ($data->produk === 'PLN') {
                $brand = 'PLN PASCABAYAR';
            } else {
                $brand = $data->produk;
            }
            $TransaksiPascabayar->where('transaction_product_brand', 'LIKE', '%' . $brand . '%');
        }

        if ($data->periode !== 'Semua Tanggal') {
            if ($data->periode === '7 Hari Terakhir') {
                $TransaksiPascabayar->whereDate('created_at', '>=', Carbon::now()->subDays(7)->toDateString());
            } elseif ($data->periode === '30 Hari Terakhir') {
                $TransaksiPascabayar->whereDate('created_at', '>=', Carbon::now()->subDays(30)->toDateString());
            } elseif ($data->periode === 'Pilih tanggal sendiri' && $data->startDate && $data->endDate) {
                $TransaksiPascabayar->whereBetween(DB::raw('DATE(created_at)'), [
                    $data->startDate,
                    $data->endDate
                ]);
            }
        } else {
            $TransaksiPascabayar->whereYear('created_at', Carbon::now()->year);
        }

        if (Auth::user()->hasRole('Mitra')) {
            $TransaksiPascabayar->where('transaction_user_id', Auth::user()->id);
        }
        $result = $TransaksiPascabayar->latest()->get();

        return $result;
    }

    protected function _get_trx_prabayar_new()
    {
        $query = TransactionPrabayar::with('productPrepaid');
        if (Auth::user()->hasRole('Mitra')) {
            $query->where('transaction_user_id', Auth::user()->id);
        }
        $TransaksiPrabayar = $query->whereYear('created_at', Carbon::now()->year)->latest()->get();

        return $TransaksiPrabayar;
    }

    protected function _get_trx_pascabayar_new()
    {
        $query = TransactionPasca::with('productPasca');

        if (Auth::user()->hasRole('Mitra')) {
            $query->where('transaction_user_id', Auth::user()->id);
        }
        $TransaksiPascabayar = $query->whereYear('created_at', Carbon::now()->year)->latest()->get();

        return $TransaksiPascabayar;
    }
}
