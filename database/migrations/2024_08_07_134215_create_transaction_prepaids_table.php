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
        Schema::create('transaction_prepaids', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code');
            $table->string('transaction_customer_no');
            $table->string('transaction_sku');
            $table->string('transaction_message')->nullable();
            $table->string('transaction_status')->nullable();
            $table->string('transaction_status_code')->nullable();
            $table->string('transaction_product_category');
            $table->string('transaction_product_brand');
            $table->string('transaction_sn')->nullable();
            $table->integer('transaction_user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_prepaids');
    }
};
