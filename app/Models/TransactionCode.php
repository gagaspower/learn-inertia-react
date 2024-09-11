<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCode extends Model
{
    use HasFactory;

    protected $table = 'transaction_codes';

    protected $fillable = [
        'transaction_code',
        'transaction_date',
        'transaction_number'
    ];
}
