<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPrabayar extends Model
{
    use HasFactory;

    protected $table = 'product_prabayars';

    protected $fillable = [
        'product_name',
        'product_category',
        'product_brand',
        'product_type',
        'product_seller_name',
        'product_cost',
        'product_price',
        'product_sku',
        'product_status',
        'product_unlimited_status',
        'product_stock',
        'product_multi_trx',
        'product_cut_off_start',
        'product_cut_off_end',
        'product_desc',
        'created_at',
        'updated_at'
    ];

    public function brands()
    {
        return $this->belongsTo(Brand::class, 'product_brand', 'brand_name');
    }
}
