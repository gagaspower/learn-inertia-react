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
        Schema::create('product_pascas', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_category');
            $table->string('product_brand');
            $table->string('product_seller_name')->nullable();
            $table->integer('product_admin_fee');
            $table->integer('product_commision');
            $table->string('product_sku')->unique();
            $table->boolean('product_status')->default(true);
            $table->string('product_desc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_pascas');
    }
};
