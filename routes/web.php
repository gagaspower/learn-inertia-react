<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MerkKendaraanController;
use App\Http\Controllers\RoleController;
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
        Route::post('user', 'store')->name('user.store');
        Route::put('user/{id}', 'update')->name('user.update');
        Route::delete('user/{id}', 'destroy')->name('user.delete');
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('/role', 'index')->name('role.index');
        Route::get('/role/{id}', 'show')->name('role.detail');
        Route::put('/role/{id}', 'update')->name('role.update');
    });

    Route::post('/auth/logout', [AuthController::class, 'destroy'])->name('auth.logout');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/', 'index')->name('login');
    Route::post('/auth/login', 'store')->name('login.store');
});
