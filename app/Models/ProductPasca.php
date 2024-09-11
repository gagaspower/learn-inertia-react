<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPasca extends Model
{
    use HasFactory;

    protected $table = 'product_pascas';

    protected $fillable = [
        'product_name',
        'product_category',
        'product_brand',
        'product_seller_name',
        'product_admin_fee',
        'product_commision',
        'product_sku',
        'product_status',
        'product_desc'
    ];
}
