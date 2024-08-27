<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionParent extends Model
{
    use HasFactory;

    protected $table = 'permission_parents';

    protected $fillable = [
        'parent_name'
    ];

    public $timestamps = false;

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permission_has_parents', 'permission_parent_id', 'permission_id');
    }
}
