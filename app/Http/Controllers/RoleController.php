<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\PermissionParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = Role::latest()->get();

        return Inertia::render('Role/Index', [
            'data' => $role
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $selectedRole       = Role::find($id);
        $selectedPermission = DB::table('role_has_permissions')->where('role_id', $id)->get();

        $permissions = PermissionParent::with('permissions')->get();

        // Kirim data ke view
        return Inertia::render('Role/Detail', [
            'permissions'        => $permissions,
            'selectedRole'       => $selectedRole,
            'selectedPermission' => $selectedPermission
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
    public function update(Request $request, string $id)
    {
        $request->validate([
            'roles'          => 'required',
            'permissionData' => 'required'
        ], [
            'roles.required'          => 'Role user wajib diisi',
            'permissionData.required' => 'Setidaknya pilih satu hak akses'
        ]);

        $role = Role::find($id);

        $permissionsID = array_map(
            function ($value) {
                return (int) $value;
            },
            $request->input('permissionData')
        );

        $role->syncPermissions($permissionsID);

        return redirect()
                   ->route('role.detail', ['id' => $id])
                   ->with('success', 'Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
