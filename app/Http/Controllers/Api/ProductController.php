<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NumberCode;
use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use App\Services\DigiflazService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $digiflaz;

    public function __construct(DigiflazService $digiflaz)
    {
        $this->digiflaz = $digiflaz;
    }

    public function _search_product_pulsa_and_data_by_number(Request $request)
    {
        $products    = [];
        $customer_no = substr($request->customer_no, 0, 4);
        $code        = NumberCode::where('number', $customer_no)->first();

        if ($code) {
            $query = ProductPrabayar::where('product_brand', $code->operator)
                         ->where('product_category', $request->product_category);

            if (Auth::user()->hasRole('Mitra')) {
                $query->where('product_price', '>', 0);
            }
            $products = $query
                            ->orderBy(DB::raw('CAST(SUBSTRING_INDEX(product_name, " ", -1) AS UNSIGNED)'), 'asc')
                            ->get()
                            ->map(function ($product) {
                                return [
                                    'product_sku'            => $product->product_sku,
                                    'product_name'           => $product->product_name,
                                    'product_cost'           => 'Rp. ' . number_format($product->product_cost),
                                    'original_product_cost'  => $product->product_cost,
                                    'original_product_price' => $product->product_price,
                                    'product_price'          => 'Rp. ' . number_format($product->product_price),
                                ];
                            });
        }

        return response()->json(['status' => true, 'message' => 'Sukses', 'data' => $products], 200);
    }

    public function _get_token_pln(Request $request)
    {
        $query = ProductPrabayar::where('product_category', 'PLN');

        if (Auth::user()->hasRole('Mitra')) {
            $query->where('product_price', '>', 0);
        }
        $products = $query
                        ->orderBy(DB::raw('CAST(SUBSTRING_INDEX(product_name, " ", -1) AS UNSIGNED)'), 'asc')
                        ->get()
                        ->map(function ($product) {
                            return [
                                'product_sku'            => $product->product_sku,
                                'product_name'           => $product->product_name,
                                'product_cost'           => 'Rp. ' . number_format($product->product_cost),
                                'original_product_cost'  => $product->product_cost,
                                'original_product_price' => $product->product_price,
                                'product_price'          => 'Rp. ' . number_format($product->product_price),
                            ];
                        });

        return response()->json(['status' => true, 'message' => 'Sukses', 'data' => $products], 200);
    }

    public function _search_emoney_product(Request $request)
    {
        $products = [];
        $q        = ProductPrabayar::where('product_brand', $request->brand);

        if (Auth::user()->hasRole('Mitra')) {
            $q->where('product_price', '>', 0);
        }
        $products = $q->orderBy(DB::raw('CAST(SUBSTRING_INDEX(product_name, " ", -1) AS UNSIGNED)'), 'asc')
                      ->get()
                      ->map(function ($product) {
                          return [
                              'product_sku'            => $product->product_sku,
                              'product_name'           => $product->product_name,
                              'product_cost'           => 'Rp. ' . number_format($product->product_cost),
                              'original_product_cost'  => $product->product_cost,
                              'original_product_price' => $product->product_price,
                              'product_price'          => 'Rp. ' . number_format($product->product_price),
                          ];
                      });

        return response()->json(['status' => true, 'message' => 'Sukses', 'data' => $products], 200);
    }

    public function _get_product_pasca(Request $request)
    {
        $brands = ProductPasca::select('product_name', 'product_sku')->where('product_brand', $request->brand)->get();

        return response()->json(['status' => true, 'message' => 'Sukses', 'data' => $brands], 200);
    }
}
