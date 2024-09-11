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
        Schema::create('product_prepaids', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_category');
            $table->string('product_brand');
            $table->string('product_type')->nullable();
            $table->string('product_seller_name')->nullable();
            $table->integer('product_cost');
            $table->integer('product_price')->default(0);
            $table->string('product_sku');
            $table->boolean('product_status')->default(true);
            $table->boolean('product_unlimited_status')->default(true);
            $table->integer('product_stock');
            $table->boolean('product_multi_trx')->default(true);
            $table->string('product_cut_off_start')->nullable();
            $table->string('product_cut_off_end')->nullable();
            $table->string('product_desc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_prepaids');
    }
};
