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
            'Owner',
            'Merk Kendaraan',
            'Customer',
            'Hak Akses',
            'Data Kendaraan Customer',
            'Layanan'
        ];

        foreach ($parents as $parent) {
            PermissionParent::create(['parent_name' => $parent]);
        }
    }
}
