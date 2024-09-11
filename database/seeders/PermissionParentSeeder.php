<?php

namespace Database\Seeders;

use App\Models\PermissionParent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parents = [
            'Hak Akses',
            'User Manajemen',
            'Brand Produk',
            'Kode Nomor',
            'Produk Prabayar',
            'Produk Pascabayar',
            'Laporan',
            'Deposit'
        ];

        foreach ($parents as $parent) {
            PermissionParent::create(['parent_name' => $parent]);
        }
    }
}
