<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductPrabayar;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function getBrandEmoney()
    {
        $data = ProductPrabayar::where('product_category', 'E-Money')->groupBy('product_brand')->pluck('product_brand');

        return response()->json([
            'status'  => true,
            'message' => 'Sukses',
            'data'    => $data
        ]);
    }
}
