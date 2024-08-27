<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kendaraan_customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('merk_kendaraan_id');
            $table->string('nopol_kendaraan');
            $table->string('jenis_kendaraan');
            $table->timestamps();

            // Foreign keys
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('merk_kendaraan_id')->references('id')->on('merk_kendaraans')->onDelete('cascade');

            // Indexes
            $table->index('customer_id');
            $table->index('merk_kendaraan_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraan_customers');
    }
};
