<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\DepositController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(ProductController::class)->group(function () {
        Route::post('/product/prabayar/search', '_search_product_pulsa_and_data_by_number');
        Route::post('/product/prabayar/emoney', '_search_emoney_product');
        Route::get('/product/prabayar/pln', '_get_token_pln');
        Route::post('/product/pascabayar/get-product-by-brand', '_get_product_pasca');
    });

    Route::controller(BrandController::class)->group(function () {
        Route::get('/brand/get-emoney-brand', 'getBrandEmoney');
    });

    Route::controller(DepositController::class)->group(function () {
        Route::post('/deposit/get-saldo', 'get_saldo');
        Route::get('/deposit/get-bank', 'get_bank');
        Route::post('/deposit/store-deposit', 'store_deposit');
        Route::post('/deposit/store-deposit-admin', 'store_deposit_admin');
        Route::get('/deposit/get-histori', 'get_history');
    });

    Route::controller(TransactionController::class)->group(function () {
        Route::post('/transaksi/prabayar/pln/subscribe', 'pln_subcribe');
        Route::post('/transaksi/prabayar/topup', 'topup');
        Route::post('/transaksi/pascabayar/inquiry-pasca', 'inq_pasca');
        Route::post('/transaksi/pascabayar/payment-pasca', 'pay_pasca');

        Route::post('/transaksi/get-all-transaction', '_get_all_transaction');
        Route::get('/transaction/get-latest-transaction', '_get_latest_trx');
    });

    Route::post('/auth/current', [AuthController::class,        'show']);
    Route::put('/auth/change-password', [AuthController::class, 'update']);
    Route::post('/auth/logout', [AuthController::class,         'destroy']);
});

Route::post('/auth/login', [AuthController::class,      'create']);
Route::post('/auth/registrasi', [AuthController::class, 'store']);
