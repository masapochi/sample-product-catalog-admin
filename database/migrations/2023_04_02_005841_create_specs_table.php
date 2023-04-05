<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();
        Schema::create('specs', function (Blueprint $table) {
            $table->timestamps();
            $table->bigIncrements('id');
            $table->bigInteger('item_id')->index();
            $table->string('heading', 100);
            $table->string('content', 255);
            $table->integer('priority')->unsigned()->default(0);
            $table->boolean('is_public')->default(false)->index();

            $table->foreign('item_id')
                ->references('id')
                ->on('items')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('specs');
    }
};
