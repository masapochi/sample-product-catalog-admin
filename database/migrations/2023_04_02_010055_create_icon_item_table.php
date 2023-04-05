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
        Schema::create('icon_item', function (Blueprint $table) {
            $table->timestamps();
            $table->integer('item_id');
            $table->bigInteger('icon_id');
            $table->integer('priority')->default(0)->unsigned()->index();

            $table->primary(['item_id', 'icon_id']);

            $table->foreign('item_id')
                ->references('id')
                ->on('items')
                ->onDelete('cascade');

            $table->foreign('icon_id')
                ->references('id')
                ->on('icons')
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
        Schema::dropIfExists('icon_item');
    }
};
