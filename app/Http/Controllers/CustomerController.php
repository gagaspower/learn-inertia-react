<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerEditRequest;
use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('query');

        $data = Customer::search($query)->paginate(10);

        if ($query) {
            $data->appends(['query' => $query]);
        }

        return Inertia::render('Customer/Index', [
            'data'  => CustomerResource::collection($data),
            'query' => $query
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $request)
    {
        $validated = $request->validated();
        $kode      = 'CS-1';

        $count_cs = Customer::count();
        if ($count_cs) {
            $kode = 'CS-' . $count_cs + 1;
        }
        $validated['kode_customer'] = $kode;

        Customer::create($validated);

        return to_route('customer.create')->with('success', 'Customer berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $current = Customer::find($id);

        return Inertia::render('Customer/Edit', [
            'data' => $current
        ]);
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
    public function update(CustomerEditRequest $request, string $id)
    {
        $validated = $request->validated();

        $findCustomer = Customer::find($id);
        $findCustomer->update($validated);
        // Customer::create($validated);

        return to_route('customer.detail', ['id' => $id])->with('success', 'Customer berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return to_route('customer.index')->with('error', 'Data tidak ditemukan');
        }
        $customer->delete();

        return to_route('customer.index')->with('success', 'Data berhasil dihapus');
    }
}
