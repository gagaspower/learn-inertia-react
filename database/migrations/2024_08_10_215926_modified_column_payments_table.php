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
        Schema::table('payments', function (Blueprint $table) {
            $table->string('va_number')->nullable()->change();
            $table->string('bill_key')->nullable()->change();
            $table->string('biller_code')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('va_number')->nullable(false)->change();
            $table->string('bill_key')->nullable(false)->change();
            $table->string('biller_code')->nullable(false)->change();
        });
    }
};
