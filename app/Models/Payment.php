<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'order_id',
        'payment_type',
        'bank',
        'gross_amount',
        'status_message',
        'transaction_status',
        'transaction_time',
        'expiry_time',
        'va_number',
        'bill_key',
        'biller_code',
        'user_id',
        'user_last_saldo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
