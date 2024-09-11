<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserEditRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Role $roles)
    {
        $searchTerm = $request->input('query');
        $searchRole = $request->input('selectedRole');

        $data = User::search($searchTerm)
                    ->query(function (Builder $query) use ($searchRole) {
                        if ($searchRole && $searchRole !== 'all') {
                            $query->with('roles')->filterByRole($searchRole);
                        } else {
                            $query->with('roles');
                        }
                    })
                    ->latest()
                    ->paginate(10);

        if ($searchTerm) {
            $data->appends([
                'query' => $searchTerm,
            ]);
        }
        $data->appends([
            'selectedRole' => $searchRole
        ]);

        return Inertia::render('User/Index', [
            'users'        => UserResource::collection($data),
            'search'       => $searchTerm,
            'selectedRole' => $searchRole,
            'roles'        => $roles->latest()->pluck('name'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Role $roles)
    {
        return Inertia::render('User/Create', [
            'roles' => $roles->latest()->pluck('name'),
        ]);
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
    public function edit(Role $roles, string $id)
    {
        $currentUser = User::find($id);

        return Inertia::render('User/Edit', [
            'roles'        => $roles->latest()->pluck('name'),
            'currentData'  => $currentUser,
            'selectedRole' => $currentUser->roles->first()->name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserEditRequest $request, string $id)
    {
        $validated = $request->validated();

        if (empty($validated['password'])) {
            $validated = Arr::except($validated, array('password'));
        }

        $user = User::find($id);
        $user->update($validated);
        DB::table('model_has_roles')->where('model_id', $id)->delete();

        $user->assignRole($request->input('roles'));

        return redirect()
                   ->route('user.index')
                   ->with('success', 'Data user berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return redirect()->route('user.index')->with('error', 'Data tidak ditemukan');
        }
        $user->delete();

        return redirect()->route('user.index')->with('success', 'Data berhasil dihapus');
    }

    public function ubah_password()
    {
        Log::info('Masuk ke fungsi _change_password');

        return Inertia::render('User/ChangePassword');
    }

    public function update_password(UpdatePasswordRequest $request)
    {
        $user = User::findOrFail(Auth::user()->id);

        $user->password = Hash::make($request->password);

        $user->save();

        return redirect()->route('profil.password')->with('success', 'Password berhasil diupdate');
    }
}
