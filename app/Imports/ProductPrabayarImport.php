<?php

namespace App\Imports;

use App\Models\ProductPrabayar;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductPrabayarImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (!empty($row['sku']) && !empty($row['harga_jual'])) {
                ProductPrabayar::where('product_sku', $row['sku'])->update([
                    'product_price' => $row['harga_jual']
                ]);
            }
        }
    }
}
