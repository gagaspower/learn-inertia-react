<?php

namespace App\Exports;

use App\Models\ProductPrabayar;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class ProductPrabayarExport implements FromCollection, WithHeadings, WithMapping, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ProductPrabayar::all();
    }

    public function headings(): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return ['sku', 'nama_product', 'kategori', 'brand', 'harga_digiflaz', 'harga_jual'];
        } else {
            return ['SKU', 'PRODUK', 'KATEGORI', 'BRAND', 'HARGA'];
        }
    }

    public function map($product): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return [
                $product->product_sku,
                $product->product_name,
                $product->product_category,
                $product->product_brand,
                'Rp. ' . number_format($product->product_cost),
                $product->product_price
            ];
        } else {
            return [
                $product->product_sku,
                $product->product_name,
                $product->product_category,
                $product->product_brand,
                'Rp. ' . number_format($product->product_price),
            ];
        }
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Mendapatkan objek sheet
                $sheet = $event->sheet->getDelegate();

                foreach (range('A', 'F') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }
            },
        ];
    }
}
