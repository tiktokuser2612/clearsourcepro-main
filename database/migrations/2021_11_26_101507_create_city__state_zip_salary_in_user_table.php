<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCityStateZipSalaryInUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('city')->after('phone')->nullable();
            $table->string('state')->after('city')->nullable();
            $table->string('salary')->after('state')->nullable();
            $table->string('hiring_dates')->after('salary')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('city__state_zip_salary_in_user');
    }
}
