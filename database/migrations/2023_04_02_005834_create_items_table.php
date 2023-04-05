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
        Schema::create('items', function (Blueprint $table) {
            $table->timestamps();
            $table->bigIncrements('id');
            $table->bigInteger('category_id')->index();
            $table->integer('code')->length(6)->unique()->index();
            $table->string('slug', 100)->unique();
            $table->string('name', 100);
            $table->string('model', 100);
            $table->string('color', 100);
            $table->string('description', 255);
            $table->string('material', 255);
            $table->decimal('width', 5, 2)->unsigned();
            $table->decimal('height', 5, 2)->unsigned();
            $table->decimal('depth', 5, 2)->unsigned();
            $table->decimal('weight', 5, 2)->unsigned();
            $table->integer('priority')->unsigned()->default(0);
            $table->boolean('is_public')->default(0)->index();

            $table->foreign('category_id')
                ->references('id')
                ->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
