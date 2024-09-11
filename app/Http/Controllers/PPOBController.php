<?php

namespace App\Http\Controllers;

use App\Models\NumberCode;
use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use App\Models\TransactionPasca;
use App\Models\TransactionPrabayar;
use App\Services\DigiflazService;
use App\Services\GetCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class PPOBController extends Controller
{
    protected $digiflaz;
    protected $_get_kode;

    public function __construct(DigiflazService $digiflaz, GetCode $_get_kode)
    {
        $this->digiflaz  = $digiflaz;
        $this->_get_kode = $_get_kode;
    }

    public function index()
    {
        return Inertia::render('PPOB/Index');
    }

    public function _pulsa()
    {
        return Inertia::render('PPOB/Pulsa');
    }

    public function _data()
    {
        return Inertia::render('PPOB/Data');
    }

    public function _emoney()
    {
        $emoney_brands = ProductPrabayar::select('product_brand')->groupBy('product_brand')->where('product_category', 'E-Money')->pluck('product_brand');

        return Inertia::render('PPOB/Emoney', [
            'brands' => $emoney_brands
        ]);
    }

    public function _token()
    {
        return Inertia::render('PPOB/Token');
    }

    public function _bpjs()
    {
        return Inertia::render('PPOB/BPJS');
    }

    public function _pln_pasca()
    {
        return Inertia::render('PPOB/PlnPascabayar');
    }

    public function _internet()
    {
        $brands = ProductPasca::select('product_name', 'product_sku')->where('product_brand', 'INTERNET PASCABAYAR')->get();

        return Inertia::render('PPOB/Internet', [
            'brands' => $brands
        ]);
    }

    public function _pdam()
    {
        return Inertia::render('PPOB/PDAM');
    }

    public function _pbb()
    {
        return Inertia::render('PPOB/PBB');
    }

    public function _store_trx_prabayar(Request $request)
    {
        DB::beginTransaction();
        try {
            $cek_saldo       = $this->cek_saldo_digiflaz();
            $current_product = ProductPrabayar::where('product_sku', $request->sku)->first();
            if ($current_product->product_cost > $cek_saldo['deposit']) {
                return response()->json(['status' => false, 'message' => 'Mohon maaf. Saat ini transaksi tidak dapat dilakukan'], 500);
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
                    'transaction_source'           => 'web',
                    'created_at'                   => Carbon::now(),
                    'updated_at'                   => Carbon::now(),
                ]);
            }

            DB::commit();

            return response()->json($response['data'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(['status' => false, 'message' => 'Mohon maaf. Saat ini transaksi tidak dapat dilakukan'], 500);
        }
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

    public function pln_subcribe(Request $request)
    {
        $result = $this->digiflaz->pln_subcribe('transaction', $request->customer_no);

        return response()->json($result['data']);
    }

    public function inq_pasca(Request $request)
    {
        Log::info('REQUEST INQUIRY : ' . json_encode($request->all()));
        $kode = $this->_get_kode->_generate();

        $params = [
            'commands'       => 'inq-pasca',
            'buyer_sku_code' => $request->sku,
            'customer_no'    => $request->customer_no,
            'ref_id'         => $kode
        ];

        $response = $this->digiflaz->request('transaction', $params, $kode);
        if ($response['data'] && $response['data']['status'] !== 'Gagal' || isset($response['data']['customer_name'])) {
            $response['data']['selling_price_without_admin'] = 'Rp. ' . number_format($response['data']['selling_price'] - $response['data']['admin']);
            $response['data']['selling_price_formatter']     = 'Rp. ' . number_format($response['data']['selling_price']);
            $response['data']['admin_formatter']             = 'Rp. ' . number_format($response['data']['admin']);
        }

        return response()->json($response['data']);
    }

    public function pay_pasca(Request $request)
    {
        $cek_saldo       = $this->cek_saldo_digiflaz();
        $current_product = ProductPasca::where('product_sku', $request->sku)->first();
        if ($request->selling_price > $cek_saldo['deposit']) {
            return response()->json(['status' => false, 'message' => 'Mohon maaf. Saat ini transaksi tidak dapat dilakukan'], 500);
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
                'transaction_source'           => 'web',
                'created_at'                   => Carbon::now(),
                'updated_at'                   => Carbon::now(),
            ]);
        }

        return response()->json($response['data']);
    }
}
