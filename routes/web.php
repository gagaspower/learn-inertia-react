<?php

use App\Http\Controllers\MerkKendaraanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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
});
