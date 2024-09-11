<?php

namespace App\Http\Controllers;

use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use App\Models\SaldoUser;
use App\Models\TransactionPrabayar;
use App\Services\DigiflazService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DigiflazController extends Controller
{
    protected $digiflaz;

    public function __construct(DigiflazService $digiflaz)
    {
        $this->digiflaz = $digiflaz;
    }

    public function _get_product_prabayar()
    {
        DB::beginTransaction();
        try {
            $params = [
                'cmd' => 'prepaid',
            ];

            $response = $this->digiflaz->request('price-list', $params, 'pricelist');

            $dataInsert = [];
            foreach ($response['data'] as $res) {
                $dataInsert[] = [
                    'product_name'             => $res['product_name'],
                    'product_category'         => $res['category'],
                    'product_brand'            => $res['brand'],
                    'product_type'             => $res['type'],
                    'product_seller_name'      => $res['seller_name'],
                    'product_cost'             => $res['price'],
                    'product_sku'              => $res['buyer_sku_code'],
                    'product_status'           => $res['buyer_product_status'],
                    'product_unlimited_status' => $res['unlimited_stock'],
                    'product_stock'            => $res['stock'],
                    'product_multi_trx'        => $res['multi'],
                    'product_cut_off_start'    => $res['start_cut_off'],
                    'product_cut_off_end'      => $res['end_cut_off'],
                    'product_desc'             => $res['desc']
                ];
            }

            ProductPrabayar::upsert(
                $dataInsert,
                ['product_sku'],
                [
                    'product_name',
                    'product_category',
                    'product_brand',
                    'product_type',
                    'product_seller_name',
                    'product_cost',
                    'product_sku',
                    'product_status',
                    'product_unlimited_status',
                    'product_stock',
                    'product_multi_trx',
                    'product_cut_off_start',
                    'product_cut_off_end',
                    'product_desc'
                ]
            );

            DB::commit();

            return redirect()
                       ->route('product.prabayar')
                       ->with('success', 'Data product berhasil diimport ulang.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()
                       ->route('product.prabayar')
                       ->with('error', $th->getMessage());
        }
    }

    public function _get_product_pasca()
    {
        DB::beginTransaction();
        try {
            $params = [
                'cmd' => 'pasca',
            ];

            $response = $this->digiflaz->request('price-list', $params, 'pricelist');

            $dataInsert = [];
            foreach ($response['data'] as $res) {
                $dataInsert[] = [
                    'product_name'        => $res['product_name'],
                    'product_category'    => $res['category'],
                    'product_brand'       => $res['brand'],
                    'product_seller_name' => $res['seller_name'],
                    'product_admin_fee'   => $res['admin'],
                    'product_commision'   => $res['commission'],
                    'product_sku'         => $res['buyer_sku_code'],
                    'product_status'      => $res['buyer_product_status'],
                    'product_desc'        => $res['desc']
                ];
            }

            ProductPasca::upsert(
                $dataInsert,
                ['product_sku'],
                [
                    'product_name',
                    'product_category',
                    'product_brand',
                    'product_seller_name',
                    'product_admin_fee',
                    'product_commision',
                    'product_sku',
                    'product_status',
                    'product_desc'
                ]
            );
            DB::commit();

            return redirect()
                       ->route('product.pascabayar')
                       ->with('success', 'Data product berhasil diimport ulang.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()
                       ->route('product.pascabayar')
                       ->with('error', $th->getMessage());
        }
    }

    public function getWebhook(Request $request)
    {
        $post_data = file_get_contents('php://input');
        $arr       = json_decode($post_data, true);

        // $signature = hash_hmac('sha1', $post_data, $secret);
        // \Log::info('signature ', $signature);

        // if ($request->header('X-Hub-Signature') == 'sha1='.$signature) {
        //     \Log::info( json_decode($request->getContent(), true));
        // }

        $current_trx = TransactionPrabayar::where('transaction_code', $arr['data']['ref_id'])->first();

        // if($current_trx) {
        if ($arr['data']['status'] == 'Sukses') {
            /* update saldo user */

            if (Auth::user()->hasRole('Mitra')) {
                $cek_saldo = SaldoUser::where('user_id', $current_trx->transaction_user_id)->first();

                if ($cek_saldo) {
                    $current_product   = ProductPrabayar::where('product_sku', $current_trx->transaction_sku)->first();
                    $cek_saldo->saldo -= $current_product->product_price;
                    $cek_saldo->save();
                }
            }
        }
        TransactionPrabayar::where('transaction_code', $arr['data']['ref_id'])
            ->update([
                'transaction_sn'      => $arr['data']['sn'],
                'transaction_status'  => $arr['data']['status'],
                'transaction_message' => $arr['data']['message']
            ]);
    }
}
