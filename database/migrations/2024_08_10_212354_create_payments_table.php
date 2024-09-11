<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->string('payment_type');
            $table->string('bank');
            $table->integer('gross_amount');
            $table->string('status_message');
            $table->string('transaction_status');
            $table->dateTime('transaction_time')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('expiry_time')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('va_number');
            $table->string('bill_key');
            $table->string('biller_code');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
