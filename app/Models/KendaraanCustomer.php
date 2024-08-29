<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KendaraanCustomer extends Model
{
    use HasFactory;

    protected $table = 'kendaraan_customers';

    protected $fillable = [
        'customer_id',
        'merk_kendaraan_id',
        'nopol_kendaraan',
        'jenis_kendaraan'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
