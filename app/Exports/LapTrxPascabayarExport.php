<?php

namespace App\Exports;

use App\Models\TransactionPasca;
use App\Models\TransactionPrabayar;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class LaptrxPascabayarExport implements FromQuery, WithHeadings, WithMapping, WithEvents
{
    protected $categories;
    protected $start_date;
    protected $end_date;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function __construct($categories, $start_date, $end_date)
    {
        $this->categories = $categories;
        $this->start_date = $start_date;
        $this->end_date   = $end_date;
    }

    public function query()
    {
        $cat  = $this->categories;
        $user = Auth::user();

        return TransactionPasca::with(['productPasca', 'user'])
                   ->whereHas('productPasca', function ($query) use ($cat) {
                       if ($cat && $cat !== 'all') {
                           $query->where('product_brand', $cat);
                       }
                   })
                   ->whereHas('user', function ($query) use ($user) {
                       if ($user->hasRole('Mitra')) {
                           $query->where('id', $user->id);
                       }
                   })
                   ->whereBetween('created_at', [
                       $this->start_date . ' 00:00:00',
                       $this->end_date . ' 23:59:59'
                   ])
                   ->latest();
    }

    public function headings(): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return ['KODE TRANSAKSI', 'NO/ID PELANGGAN', 'PRODUK', 'KATEGORI PRODUK', 'BRAND PRODUK', 'JUMLAH TAGIHAN', 'STATUS TRANSAKSI', 'SOURCE TRANSAKSI', 'USER', 'SN'];
        } else {
            return ['KODE TRANSAKSI', 'NO/ID PELANGGAN', 'PRODUK', 'KATEGORI PRODUK', 'BRAND PRODUK', 'JUMLAH TAGIHAN', 'STATUS TRANSAKSI', 'SOURCE TRANSAKSI', 'SN'];
        }
    }

    public function map($product): array
    {
        $user = Auth::user();
        if ($user->hasRole('Admin')) {
            return [
                $product->transaction_code,
                (string) $product->transaction_customer_no,
                $product->productPasca->product_name,
                $product->transaction_product_category,
                $product->transaction_product_brand,
                $product->transaction_price,
                $product->transaction_status,
                $product->transaction_source,
                $product->user->name,
                (string) $product->transaction_sn,
            ];
        } else {
            return [
                $product->transaction_code,
                (string) $product->transaction_customer_no,
                $product->productPasca->product_name,
                $product->transaction_product_category,
                $product->transaction_product_brand,
                $product->transaction_price,
                $product->transaction_status,
                $product->transaction_source,
                (string) $product->transaction_sn,
            ];
        }
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Mendapatkan objek sheet
                $sheet = $event->sheet->getDelegate();

                foreach (range('A', 'K') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }

                $snColumn   = Auth::user()->hasRole('Admin') ? 'J' : 'I';
                $highestRow = $sheet->getHighestRow();

                for ($row = 2; $row <= $highestRow; $row++) {
                    $cellValue = $sheet->getCell("{$snColumn}{$row}")->getValue();
                    $sheet->setCellValueExplicit("{$snColumn}{$row}", $cellValue, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
                }

                $customerNoColumn = 'B';
                $highestRow       = $sheet->getHighestRow();

                for ($row = 2; $row <= $highestRow; $row++) {
                    $cellValue = $sheet->getCell("{$customerNoColumn}{$row}")->getValue();
                    $sheet->setCellValueExplicit("{$customerNoColumn}{$row}", $cellValue, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
                }
            },
        ];
    }
}
