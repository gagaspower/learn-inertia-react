<?php

namespace App\Http\Controllers;

use App\Exports\ProductPascabayarExport;
use App\Exports\ProductPrabayarExport;
use App\Http\Requests\ProductPrabayarImportRequest;
use App\Http\Resources\ProductPascabayarResource;
use App\Http\Resources\ProductPrabayarResource;
use App\Imports\ProductPrabayarImport;
use App\Models\NumberCode;
use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function _get_product_prabayar_list(Request $request)
    {
        $_product_cat = $this->_get_product_categories('Prabayar');

        $selected_categories = $request->selected_categories;

        $product_prabayar = ProductPrabayar::when($selected_categories, function (Builder $query, string $selected_categories) {
            if ($selected_categories !== 'all') {
                $query->where('product_category', $selected_categories);
            }
        })->latest()->paginate(10);

        $product_prabayar->appends([
            'selected_categories' => $request->selected_categories
        ]);

        return Inertia::render('Product/Prabayar', [
            'categories' => $_product_cat,
            'products'   => ProductPrabayarResource::collection($product_prabayar)
        ]);
    }

    public function _get_product_pascabayar_list(Request $request)
    {
        $_product_cat = $this->_get_product_categories('Pascabayar');

        $selected_categories = $request->selected_categories;

        $product_pasca = ProductPasca::when($selected_categories, function (Builder $query, string $selected_categories) {
            if ($selected_categories !== 'all') {
                $query->where('product_brand', $selected_categories);
            }
        })->latest()->paginate(10);

        $product_pasca->appends([
            'selected_categories' => $request->selected_categories
        ]);

        return Inertia::render('Product/Pascabayar', [
            'categories' => $_product_cat,
            'products'   => ProductPascabayarResource::collection($product_pasca)
        ]);
    }

    public function _download_product_prabayar()
    {
        return Excel::download(new ProductPrabayarExport, 'product_prabayar.xlsx');
    }

    public function _download_product_pascabayar()
    {
        return Excel::download(new ProductPascabayarExport, 'product_pascabayar.xlsx');
    }

    public function _import_product_prabayar(ProductPrabayarImportRequest $request)
    {
        $validated = $request->validated();
        Excel::import(new ProductPrabayarImport, $validated['file']);

        return redirect()->route('product.prabayar')->with('success', 'Harga jual produk berhasil diupdate');
    }

    public function _update_harga(Request $request)
    {
        $validated = $request->validate([
            'product_price' => 'required|numeric'
        ]);

        $product                = ProductPrabayar::where('product_sku', $request->product_sku)->first();
        $product->product_price = $validated['product_price'];
        $product->save();

        return redirect()->back()->with('success', 'Harga jual produk berhasil diupdate');
    }

    protected function _get_product_categories($type)
    {
        $categories = collect();
        if ($type === 'Prabayar') {
            $categories = ProductPrabayar::select('product_category')->groupBy('product_category')->pluck('product_category');
        } elseif ($type === 'Pascabayar') {
            $categories = ProductPasca::select('product_brand')->groupBy('product_brand')->pluck('product_brand');
        }

        return $categories;
    }

    public function _get_product_by_number(Request $request)
    {
        $products = [];
        if (strlen($request->customer_no) >= 4) {
            $customer_no = substr($request->customer_no, 0, 4);
            $_get_brand  = NumberCode::where('number', $customer_no)->first();

            if ($_get_brand) {
                $products = ProductPrabayar::where('product_brand', $_get_brand->operator)
                                ->where('product_category', $request->product_category)
                                ->get();
            }
        }

        $result = ProductPrabayarResource::collection($products);

        return response()->json($result);
    }

    public function _get_product_by_brand_and_category(Request $request)
    {
        $products = [];

        $products = ProductPrabayar::where('product_brand', $request->brand)
                        ->where('product_category', $request->category)
                        ->get();

        $result = ProductPrabayarResource::collection($products);

        return response()->json($result);
    }

    public function _get_product_pasca_by_brand(Request $request)
    {
        $brands = ProductPasca::select('product_name', 'product_sku')->where('product_brand', $request->brand)->get();

        return response()->json($brands);
    }
}
