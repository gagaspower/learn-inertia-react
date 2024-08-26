<?php

namespace App\Http\Controllers;

use App\Http\Requests\MerkRequest;
use App\Http\Resources\MerkResource;
use App\Models\MerkKendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerkKendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTerm = $request->input('query');
        $merks      = MerkKendaraan::search($searchTerm)->latest()->paginate(10);

        if ($searchTerm)
            $merks->appends(['query' => $searchTerm]);

        return Inertia::render('Home', [
            'merks'  => MerkResource::collection($merks),
            'search' => $searchTerm
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MerkRequest $request)
    {
        $validated = $request->validated();

        MerkKendaraan::create($validated);

        return redirect()
                   ->route('merk.index')
                   ->with('success', 'Merk kendaraan berhasil ditambah.');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MerkRequest $request, string $id)
    {
        $validated = $request->validated();

        $merk = MerkKendaraan::find($id);

        if (!$merk) {
            return redirect()
                       ->route('merk.index')
                       ->with('error', 'Merk kendaraan tidak ditemukan.');
        }

        $merk->nama_merk     = $validated['nama_merk'];
        $merk->kategori_merk = $validated['kategori_merk'];
        $merk->save();

        return redirect()
                   ->route('merk.index')
                   ->with('success', 'Merk kendaraan berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $merk = MerkKendaraan::find($id);

        if ($merk) {
            $merk->delete();
        } else {
            return redirect()
                       ->route('merk.index')
                       ->with('error', 'Data merk kendaraan tidak ditemukan.');
        }

        return redirect()
                   ->route('merk.index')
                   ->with('success', 'Merk kendaraan berhasil dihapus.');
    }
}
