<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Services\GetAllProductAliases;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Brand::latest()->paginate(10);

        return Inertia::render('Brand/Index', [
            'brands' => BrandResource::collection($data)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(GetAllProductAliases $product_aliases)
    {
        $categories = ['Prabayar', 'Pascabayar'];

        return Inertia::render('Brand/Create', [
            'categories'      => $categories,
            'product_aliases' => $product_aliases->_getGet()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BrandRequest $request)
    {
        $validated = $request->validated();

        if ($request->file('brand_logo')) {
            $imageName = time() . '.' . $request->brand_logo->extension();
            $request->file('brand_logo')->storeAs('brand', $imageName, 'public');
            $validated['brand_logo'] = $imageName;
        }

        Brand::create($validated);

        return redirect()
                   ->route('brand.index')
                   ->with('success', 'Brand berhasil ditambah.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GetAllProductAliases $product_aliases, $id)
    {
        $categories = ['Prabayar', 'Pascabayar'];

        $brand = Brand::find($id);

        return Inertia::render('Brand/Edit', [
            'brand'           => $brand,
            'categories'      => $categories,
            'product_aliases' => $product_aliases->_getGet()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BrandRequest $request, string $id)
    {
        $validated = $request->validated();
        $brand     = Brand::findOrFail($id);

        if ($request->hasFile('brand_logo')) {
            $oldLogo   = $brand->brand_logo;
            $imageName = time() . '.' . $request->brand_logo->extension();
            $request->file('brand_logo')->storeAs('brand', $imageName, 'public');
            $validated['brand_logo'] = $imageName;
            if ($oldLogo && file_exists(public_path('storage/brand/' . $oldLogo))) {
                unlink(public_path('storage/brand/' . $oldLogo));
            }
        } else {
            $validated = $request->except('brand_logo');
        }

        $brand->update($validated);

        return redirect()
                   ->route('brand.index')
                   ->with('success', 'Brand berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand   = Brand::findOrFail($id);
        $oldLogo = $brand->brand_logo;
        if ($oldLogo) {
            if ($oldLogo && file_exists(public_path('storage/brand/' . $oldLogo))) {
                unlink(public_path('storage/brand/' . $oldLogo));
            }
        }
        $brand->delete();

        return redirect()
                   ->route('brand.index')
                   ->with('success', 'Brand berhasil dihapus.');
    }

    protected function _get_product_alias_prabayar() {}
}
