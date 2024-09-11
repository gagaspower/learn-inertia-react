<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminPayment extends Model
{
    use HasFactory;

    protected $table = 'admin_payments';

    protected $fillable = [
        'bank_payment',
        'amount_payment',
        'notes_payment'
    ];
}
