<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionHasParent extends Model
{
    use HasFactory;

    protected $table = 'permission_has_parents';

    protected $fillable = [
        'permission_parent_id',
        'permission_id'
    ];

    public $timestamps = false;
}
