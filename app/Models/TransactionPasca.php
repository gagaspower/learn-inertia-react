<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionPasca extends Model
{
    use HasFactory;

    protected $table = 'transaction_pascas';

    protected $fillable = [
        'transaction_code',
        'transaction_customer_no',
        'transaction_sku',
        'transaction_message',
        'transaction_status',
        'transaction_status_code',
        'transaction_product_category',
        'transaction_product_brand',
        'transaction_sn',
        'transaction_price',
        'transaction_user_id',
        'transaction_source'
    ];

    public function productPasca()
    {
        return $this->belongsTo(ProductPasca::class, 'transaction_sku', 'product_sku');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'transaction_user_id');
    }
}
