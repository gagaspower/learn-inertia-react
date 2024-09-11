<?php

namespace App\Exports;

use App\Models\ProductPasca;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class ProductPascabayarExport implements FromCollection, WithHeadings, WithMapping, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ProductPasca::all();
    }

    public function headings(): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return ['SKU', 'PRODUK', 'BRAND', 'BIAYA ADMIN', 'KOMISI'];
        } else {
            return ['SKU', 'PRODUK', 'BRAND', 'BIAYA ADMIN'];
        }
    }

    public function map($product): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return [
                $product->product_sku,
                $product->product_name,
                $product->product_brand,
                'Rp. ' . number_format($product->product_admin_fee),
                'Rp. ' . number_format($product->product_commision)
            ];
        } else {
            return [
                $product->product_sku,
                $product->product_name,
                $product->product_brand,
                'Rp. ' . number_format($product->product_admin_fee)
            ];
        }
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Mendapatkan objek sheet
                $sheet = $event->sheet->getDelegate();

                foreach (range('A', 'E') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }
            },
        ];
    }
}
