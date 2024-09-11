<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NumberCode extends Model
{
    protected $table    = 'number_codes';
    protected $fillable = ['number', 'operator'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
