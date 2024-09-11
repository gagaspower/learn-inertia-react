<?php

use App\Http\Controllers\AuthController;
// use App\Http\Controllers\BrandController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\DigiflazController;
use App\Http\Controllers\NumberCodeController;
use App\Http\Controllers\PPOBController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('user', 'index')->name('user.index');
        Route::get('/user/add', 'create')->name('user.create');
        Route::post('user', 'store')->name('user.store');
        Route::get('user/{id}', 'edit')->name('user.edit');
        Route::put('user/{id}', 'update')->name('user.update');
        Route::delete('user/{id}', 'destroy')->name('user.delete');
        Route::get('profil/password', 'ubah_password')->name('profil.password');
        Route::put('profil/password/update', 'update_password')->name('profile.update_password');
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('/role', 'index')->name('role.index');
        Route::get('/role/{id}', 'show')->name('role.detail');
        Route::put('/role/{id}', 'update')->name('role.update');
    });

    // Route::controller(BrandController::class)->group(function () {
    //     Route::get('brand', 'index')->name('brand.index');
    //     Route::get('brand/add', 'create')->name('brand.create');
    //     Route::post('brand/store', 'store')->name('brand.store');
    //     Route::get('brand/edit/{id}', 'edit')->name('brand.edit');
    //     Route::post('brand/update/{id}', 'update')->name('brand.update');
    //     Route::delete('brand/delete/{id}', 'destroy')->name('brand.delete');
    // });

    Route::controller(NumberCodeController::class)->group(function () {
        Route::get('kode-nomor', 'index')->name('kode_nomor.index');
        Route::get('kode-nomor/add', 'create')->name('kode_nomor.create');
        Route::post('kode-nomor/store', 'store')->name('kode_nomor.store');
        Route::get('kode-nomor/edit/{id}', 'edit')->name('kode_nomor.edit');
        Route::post('kode-nomor/update/{id}', 'update')->name('kode_nomor.update');
        Route::delete('kode-nomor/delete/{id}', 'destroy')->name('kode_nomor.delete');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('product/prabayar', '_get_product_prabayar_list')->name('product.prabayar');
        Route::get('product/pascabayar', '_get_product_pascabayar_list')->name('product.pascabayar');
        Route::get('product/prabayar/download', '_download_product_prabayar')->name('product.prabayar.download');
        Route::get('product/pascabayar/download', '_download_product_pascabayar')->name('product.pascabayar.download');
        Route::post('product/prabayar/import', '_import_product_prabayar')->name('product.prabayar.import');
        Route::post('product/prabayar/update-harga', '_update_harga')->name('product.prabayar.update_harga');

        Route::post('product/prabayar/search-product-by-number', '_get_product_by_number')->name('product.prabayar.search_by_number');
        Route::post('product/prabayar/search-emoney-product', '_get_product_by_brand_and_category')->name('product.prabayar.product_by_brand');
        Route::post('product/pascabayar/pdam-product', '_get_product_pasca_by_brand')->name('product.pascabayar.product_pasca_by_brand');
    });

    Route::controller(PPOBController::class)->group(function () {
        Route::get('ppob', 'index')->name('ppob.index');
        Route::get('ppob/pulsa', '_pulsa')->name('ppob.pulsa');
        Route::get('ppob/data', '_data')->name('ppob.data');
        Route::get('ppob/emoney', '_emoney')->name('ppob.emoney');
        Route::get('ppob/token', '_token')->name('ppob.token');
        Route::get('ppob/bpjs', '_bpjs')->name('ppob.bpjs');
        Route::get('ppob/pln-pascabayar', '_pln_pasca')->name('ppob.pln_pascabayar');
        Route::get('ppob/internet', '_internet')->name('ppob.internet');
        Route::get('ppob/pdam', '_pdam')->name('ppob.pdam');
        Route::get('ppob/pbb', '_pbb')->name('ppob.pbb');

        Route::post('ppob/topup', '_store_trx_prabayar')->name('ppob.topup');
        Route::post('ppob/pln-subscribe', 'pln_subcribe')->name('ppob.pln_subcribe');
        Route::post('ppob/inquiry-pasca', 'inq_pasca')->name('ppob.inquiry_pasca');
        Route::post('ppob/pay-pasca', 'pay_pasca')->name('ppob.pay_pasca');
    });

    Route::controller(DepositController::class)->group(function () {
        Route::get('deposit/mitra', 'index')->name('deposit.index');
        Route::get('deposit/admin', 'index_admin')->name('deposit.admin');
        Route::get('deposit/histori-admin', 'list_histori_admin')->name('deposit.histori_admin');
        Route::get('deposit/tiket', 'create')->name('deposit.create_ticket');
        Route::get('deposit/get-bank', '_get_bank_deposit')->name('deposit.get_bank');
        Route::post('deposit/depo-admin', '_store_depo_admin')->name('deposit.store_admin');
        Route::post('deposit/depo', '_store_depo')->name('deposit.store');
    });

    Route::controller(ReportController::class)->group(function () {
        Route::get('laporan', 'index')->name('laporan.index');
        Route::get('laporan/prabayar', 'lap_prabayar')->name('laporan.prabayar');
        Route::get('laporan/pascabayar', 'lap_pascabayar')->name('laporan.pascabayar');
        Route::post('laporan/prabayar/get-report', '_get_report_prabayar')->name('laporan.prabayar.get_report');
        Route::post('laporan/pascabayar/get-report', '_get_report_pascabayar')->name('laporan.pascabayar.get_report');
        Route::get('laporan/prabayar/download', '_download_lap_prabayar');
        Route::get('laporan/pascabayar/download', '_download_lap_pascabayar');
    });

    Route::post('/auth/logout', [AuthController::class, 'destroy'])->name('auth.logout');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/', 'index')->name('login');
    Route::get('/auth/daftar', 'create')->name('auth.daftar');
    Route::post('/auth/login', 'store')->name('login.store');
    Route::post('/auth/daftar/store', 'store_register')->name('auth.daftar.store');
});

Route::controller(DigiflazController::class)->group(function () {
    Route::get('/digiflaz/get-product-prabayar', '_get_product_prabayar')->name('digiflaz.import_product_prabayar');
    Route::get('/digiflaz/get-product-pascabayar', '_get_product_pasca')->name('digiflaz.import_product_pascabayar');
    Route::post('/digiflaz/webhook', 'getWebhook');
});

Route::post('/deposit/webhook', [DepositController::class, 'webhook']);
