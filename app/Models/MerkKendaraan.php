<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class MerkKendaraan extends Model
{
    use HasFactory, Searchable;

    protected $table    = 'merk_kendaraans';
    protected $fillable = ['nama_merk', 'kategori_merk'];

    public function toSearchableArray(): array
    {
        return [
            'nama_merk' => $this->nama_merk
        ];
    }
}
