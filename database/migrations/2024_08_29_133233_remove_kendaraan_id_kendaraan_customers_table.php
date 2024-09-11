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
        Schema::table('kendaraan_customers', function (Blueprint $table) {
            $table->dropForeign(['merk_kendaraan_id']);

            // Hapus index
            $table->dropIndex(['merk_kendaraan_id']);

            // Hapus kolom
            $table->dropColumn('merk_kendaraan_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kendaraan_customers', function (Blueprint $table) {
            $table->unsignedBigInteger('merk_kendaraan_id');

            // Tambahkan kembali foreign key constraint
            $table->foreign('merk_kendaraan_id')->references('id')->on('merk_kendaraans')->onDelete('cascade');

            // Tambahkan kembali index
            $table->index('merk_kendaraan_id');
        });
    }
};
