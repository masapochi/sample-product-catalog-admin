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
        Schema::create('icons', function (Blueprint $table) {
            $table->timestamps();
            $table->bigIncrements('id');
            $table->string('slug', 255)->unique()->index();
            $table->string('name', 100);
            $table->integer('priority')->unsigned()->default(0);
            $table->boolean('is_public')->default(0)->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('icons');
    }
};
