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
            $table->string('nama_kendaraan')->after('customer_id');
            $table->unique('nopol_kendaraan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kendaraan_customers', function (Blueprint $table) {
            $table->dropColumn('nama_kendaraan');
            $table->dropUnique(['nopol_kendaraan']);
        });
    }
};
