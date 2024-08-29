<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\MerkKendaraanController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    // Route::inertia('/', 'Home');
    Route::controller(MerkKendaraanController::class)->group(function () {
        Route::get('/merk-kendaraan', 'index')->name('merk.index');
        Route::post('/merk-kendaraan', 'store')->name('merk.store');
        Route::post('/merk-kendaraan/{id}', 'update')->name('merk.update');
        Route::delete('/merk-kendaraan/{id}', 'destroy')->name('merk.delete');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('user', 'index')->name('user.index');
        Route::get('/user/add', 'create')->name('user.create');
        Route::post('user', 'store')->name('user.store');
        Route::get('user/{id}', 'edit')->name('user.edit');
        Route::put('user/{id}', 'update')->name('user.update');
        Route::delete('user/{id}', 'destroy')->name('user.delete');
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('/role', 'index')->name('role.index');
        Route::get('/role/{id}', 'show')->name('role.detail');
        Route::put('/role/{id}', 'update')->name('role.update');
    });

    Route::controller(CustomerController::class)->group(function () {
        Route::get('/customer', 'index')->name('customer.index');
        Route::get('/customer/add', 'create')->name('customer.create');
        Route::post('/customer/add', 'store')->name('customer.store');
        Route::get('/customer/{id}', 'show')->name('customer.detail');
        Route::put('/customer/{id}', 'update')->name('customer.update');
        Route::delete('/customer/{id}', 'destroy')->name('customer.delete');
    });

    Route::controller(LayananController::class)->group(function () {
        Route::get('/layanan', 'index')->name('layanan.index');
        Route::get('/layanan/add', 'create')->name('layanan.create');
        Route::post('/layanan/add', 'store')->name('layanan.store');
        Route::get('/layanan/{id}', 'edit')->name('layanan.edit');
        Route::put('/layanan/{id}', 'update')->name('layanan.update');
        Route::delete('/layanan/{id}', 'destroy')->name('layanan.delete');
    });

    Route::controller(TransaksiController::class)->group(function () {
        Route::get('/transaksi', 'index')->name('transaksi.index');
    });

    Route::post('/auth/logout', [AuthController::class, 'destroy'])->name('auth.logout');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/', 'index')->name('login');
    Route::post('/auth/login', 'store')->name('login.store');
});
