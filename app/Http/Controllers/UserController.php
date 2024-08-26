<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTerm = $request->input('query');
        $searchRole = $request->input('role');

        $roles = Role::latest()->get()->pluck('name');

        $data = User::search($searchTerm)
                    ->query(function (Builder $query) use ($searchRole) {
                        if ($searchRole && $searchRole !== 'all') {
                            $query->whereHas('roles', function ($q) use ($searchRole) {
                                $q->where('name', $searchRole);
                            });
                        }
                    })
                    ->latest()
                    ->paginate(10);

        if ($searchTerm || $searchRole) {
            $data->appends([
                'query' => $searchTerm,
                'role'  => $searchRole
            ]);
        }

        return Inertia::render('Pengguna', [
            'users'      => UserResource::collection($data),
            'roles'      => $roles,
            'search'     => $searchTerm,
            'searchRole' => $searchRole
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
    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create($validated);
        $user->assignRole($request->input('roles'));

        return redirect()
                   ->route('user.index')
                   ->with('success', 'Data user berhasil ditambah.');
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
