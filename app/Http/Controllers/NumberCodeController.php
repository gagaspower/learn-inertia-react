<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditKodeNomorRequest;
use App\Http\Requests\KodeNomorRequest;
use App\Http\Resources\PrefixResource;
use App\Models\NumberCode;
use App\Services\GetAllProductAliases;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NumberCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selected_brand = $request->input('selected_provider');

        $operator = ['AXIS', 'INDOSAT', 'SMARTFREN', 'TRI', 'TELKOMSEL', 'XL', 'CERIA'];
        $data = NumberCode::when($selected_brand, function (Builder $query, string $selected_brand) {
            if ($selected_brand !== 'All') {
                $query->where('operator', $selected_brand);
            }
        })->latest()->paginate(10);

        $data->appends([
            'selected_provider' => $selected_brand
        ]);

        return Inertia::render('KodeNomor/Index', [
            'nomor'  => PrefixResource::collection($data),
            'brands' => $operator
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $operator = ['AXIS', 'INDOSAT', 'SMARTFREN', 'TRI', 'TELKOMSEL', 'XL', 'CERIA'];

        return Inertia::render('KodeNomor/Create', [
            'brands' => $operator
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KodeNomorRequest $request)
    {
        $validated = $request->validated();

        NumberCode::create($validated);

        return redirect()
                   ->route('kode_nomor.index')
                   ->with('success', 'Kode nomor operator berhasil ditambah.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $operator = ['AXIS', 'INDOSAT', 'SMARTFREN', 'TRI', 'TELKOMSEL', 'XL', 'CERIA'];
        $data     = NumberCode::find($id);

        return Inertia::render('KodeNomor/Edit', [
            'currentData' => $data,
            'brands'      => $operator
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditKodeNomorRequest $request, string $id)
    {
        $validated = $request->validated();

        $number = NumberCode::find($id);
        $number->update($validated);

        return redirect()
                   ->route('kode_nomor.index')
                   ->with('success', 'Kode nomor operator berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $number = NumberCode::find($id);
        $number->delete();

        return redirect()
                   ->route('kode_nomor.index')
                   ->with('success', 'Kode nomor operator berhasil diihapus.');
    }

    protected function _getOperator()
    {
        $product_aliases = new GetAllProductAliases();
        $productAliases = collect($product_aliases->_getGet());
        $selectedBrands = ['AXIS', 'INDOSAT', 'SMARTFREN', 'TRI', 'TELKOMSEL', 'XL'];
        $filteredAliases = $productAliases->filter(function ($brand) use ($selectedBrands) {
            return in_array($brand, $selectedBrands);
        });

        $filteredAliasesArray = $filteredAliases->values()->all();

        return $filteredAliasesArray;
    }
}
