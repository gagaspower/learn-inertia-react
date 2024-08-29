<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Customer extends Model
{
    use HasFactory, Searchable;

    protected $table = 'customers';

    protected $fillable = [
        'kode_customer',
        'nama_customer',
        'alamat_customer',
        'telp_customer'
    ];

    public function kendaraans()
    {
        return $this->hasMany(KendaraanCustomer::class, 'customer_id');
    }

    public function toSearchableArray()
    {
        return [
            'nama_customer' => $this->nama_customer,
        ];
    }
}
