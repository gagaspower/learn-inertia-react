<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    use HasFactory;

    public function parents()
    {
        return $this->belongsToMany(PermissionParent::class, 'permission_has_parents', 'permission_id', 'permission_parent_id');
    }
}
