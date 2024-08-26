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
        Schema::create('permission_has_parents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('permission_parent_id');
            $table->unsignedBigInteger('permission_id');
            $table->timestamps();

            // Foreign keys
            $table->foreign('permission_parent_id')->references('id')->on('permission_parents')->onDelete('cascade');
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');

            // Indexes
            $table->index('permission_parent_id');
            $table->index('permission_id');

            // Ensure no duplicate parent-permission pairs
            $table->unique(['permission_parent_id', 'permission_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_has_parents');
    }
};
