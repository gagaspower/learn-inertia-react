<?php

namespace App\Http\Controllers;

use App\Exports\LaptrxPascabayarExport;
use App\Exports\LaptrxPrabayarExport;
use App\Http\Resources\LaporanPrabayarResource;
use App\Models\ProductPasca;
use App\Models\ProductPrabayar;
use App\Models\TransactionPasca;
use App\Models\TransactionPrabayar;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Laporan/Index');
    }

    public function lap_prabayar()
    {
        $product_categories = $this->_get_product_categories('Prabayar');

        return Inertia::render('Laporan/Prabayar', [
            'categories_filter' => $product_categories
        ]);
    }

    public function lap_pascabayar(Request $request)
    {
        $product_categories = $this->_get_product_categories('Pascabayar');

        return Inertia::render('Laporan/Pascabayar', [
            'categories_filter' => $product_categories
        ]);
    }

    protected function _get_product_categories($type)
    {
        $categories = collect();
        if ($type === 'Prabayar') {
            $categories = ProductPrabayar::select('product_category')->groupBy('product_category')->pluck('product_category');
        } elseif ($type === 'Pascabayar') {
            $categories = ProductPasca::select('product_brand')->groupBy('product_brand')->pluck('product_brand');
        }

        return $categories;
    }

    public function _get_report_prabayar(Request $request)
    {
        $start_date = $request->start_date ?? Carbon::today()->toDateString();  // Default ke format YYYY-MM-DD
        $end_date   = $request->end_date ?? Carbon::today()->toDateString();

        $categories = $request->categories;
        $user       = Auth::user();
        $url        = '';

        if ($categories) {
            if ($url == '')
                $url = '?categories=' . $categories;
            else
                $url .= '&categories=' . $categories;
        }

        if ($start_date && $end_date) {
            if ($url == '')
                $url = '?start_date=' . $start_date . '&end_date=' . $end_date;
            else
                $url .= '&start_date=' . $start_date . '&end_date=' . $end_date;
        }

        $query = TransactionPrabayar::with(['productPrepaid', 'user'])
                     ->whereHas('productPrepaid', function ($query) use ($categories) {
                         if ($categories && $categories !== 'all') {
                             $query->where('product_category', $categories);
                         }
                     })
                     ->whereHas('user', function ($query) use ($user) {
                         if ($user->hasRole('Mitra')) {
                             $query->where('id', $user->id);
                         }
                     })
                     ->whereBetween('created_at', [
                         $start_date . ' 00:00:00',
                         $end_date . ' 23:59:59'
                     ])
                     ->latest();

        $results = $query->paginate(10)->through(fn($result) => [
            'transaction_code'                    => $result->transaction_code,
            'transaction_customer_no'             => $result->transaction_customer_no,
            'transaction_product_sku'             => $result->transaction_sku,
            'transaction_product_name'            => $result->productPrepaid->product_name,
            'transaction_product_category'        => $result->transaction_product_category,
            'transaction_product_brand'           => $result->transaction_product_brand,
            'transaction_product_price'           => $result->productPrepaid->product_price,
            'transaction_product_price_formatted' => 'Rp. ' . number_format($result->productPrepaid->product_price),
            'transaction_product_cost'            => $result->productPrepaid->product_cost,
            'transaction_product_cost_formatted'  => 'Rp. ' . number_format($result->productPrepaid->product_cost),
            'transaction_sn'                      => $result->transaction_sn,
            'transaction_source'                  => $result->transaction_source,
            'transaction_user'                    => $result->user->name,
            'transaction_status'                  => $result->transaction_status
        ]);

        $results->withPath(url('laporan/prabayar' . $url));

        return response()->json([
            'data'      => $results,
            'excel_url' => url('laporan/prabayar/download' . $url),
        ]);
    }

    public function _get_report_pascabayar(Request $request)
    {
        $start_date = $request->start_date ?? Carbon::today()->toDateString();
        $end_date   = $request->end_date ?? Carbon::today()->toDateString();

        $categories = $request->categories;
        $user       = Auth::user();
        $url        = '';

        if ($categories) {
            if ($url == '')
                $url = '?categories=' . $categories;
            else
                $url .= '&categories=' . $categories;
        }

        if ($start_date && $end_date) {
            if ($url == '')
                $url = '?start_date=' . $start_date . '&end_date=' . $end_date;
            else
                $url .= '&start_date=' . $start_date . '&end_date=' . $end_date;
        }

        $query = TransactionPasca::with(['productPasca', 'user'])
                     ->whereHas('productPasca', function ($query) use ($categories) {
                         if ($categories && $categories !== 'all') {
                             $query->where('product_brand', $categories);
                         }
                     })
                     ->whereHas('user', function ($query) use ($user) {
                         if ($user->hasRole('Mitra')) {
                             $query->where('id', $user->id);
                         }
                     })
                     ->whereBetween('created_at', [
                         $start_date . ' 00:00:00',
                         $end_date . ' 23:59:59'
                     ])
                     ->latest();

        $results = $query->paginate(10)->through(fn($result) => [
            'transaction_code'                    => $result->transaction_code,
            'transaction_customer_no'             => $result->transaction_customer_no,
            'transaction_product_sku'             => $result->transaction_sku,
            'transaction_product_name'            => $result->productPasca->product_name,
            'transaction_product_category'        => $result->transaction_product_category,
            'transaction_product_brand'           => $result->transaction_product_brand,
            'transaction_product_price'           => $result->transaction_price,
            'transaction_product_price_formatted' => 'Rp. ' . number_format($result->transaction_price),
            'transaction_sn'                      => $result->transaction_sn,
            'transaction_source'                  => $result->transaction_source,
            'transaction_user'                    => $result->user->name,
            'transaction_status'                  => $result->transaction_status
        ]);

        $results->withPath(url('laporan/pascabayar' . $url));

        return response()->json([
            'data'      => $results,
            'excel_url' => url('laporan/pascabayar/download' . $url),
        ]);
    }

    function _download_lap_prabayar(Request $request)
    {
        $start_date = $request->start_date ?? Carbon::today()->toDateString();
        $end_date   = $request->end_date ?? Carbon::today()->toDateString();
        $categories = $request->categories;

        return Excel::download(new LaptrxPrabayarExport($categories, $start_date, $end_date), 'laporan_transaksi_prabayar.xlsx');
    }

    function _download_lap_pascabayar(Request $request)
    {
        $start_date = $request->start_date ?? Carbon::today()->toDateString();
        $end_date   = $request->end_date ?? Carbon::today()->toDateString();
        $categories = $request->categories;

        return Excel::download(new LaptrxPascabayarExport($categories, $start_date, $end_date), 'laporan_transaksi_pascabayar.xlsx');
    }
}
