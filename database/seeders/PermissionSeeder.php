<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parents = [
            'Hak Akses User',
            'User Manajemen',
            // 'Brand Produk',
            'Kode Nomor',
            'Daftar Produk Prabayar',
            'Daftar Produk Pascabayar',
            'Laporan',
            'Deposit'
        ];

        foreach ($parents as $parent) {
            Permission::create(['name' => $parent]);
        }
    }
}
