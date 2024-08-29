<?php

namespace App\Http\Controllers;

use App\Http\Requests\LayananRequest;
use App\Http\Resources\LayananResource;
use App\Models\Layanan;
use Inertia\Inertia;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Layanan $layanan)
    {
        return Inertia::render('Layanan/Index', ['data' => LayananResource::collection($layanan->get())]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Layanan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LayananRequest $request)
    {
        $input = $request->validated();

        Layanan::create($input);

        return to_route('layanan.index')->with('success', 'Layanan berhasil disimpan');
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
        $currentLayanan = Layanan::find($id);

        return Inertia::render('Layanan/Edit', [
            'data' => $currentLayanan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LayananRequest $request, string $id)
    {
        $input   = $request->validated();
        $layanan = Layanan::find($id);
        $layanan->update($input);

        return to_route('layanan.index')->with('success', 'Layanan berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Layanan::find($id)->delete();

        return to_route('layanan.index')->with('success', 'Layanan berhasil dihapus');
    }
}
