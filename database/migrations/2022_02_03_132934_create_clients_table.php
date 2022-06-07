<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_type')->nullable();
            $table->string('company_website')->nullable();
            $table->string('hours_of_operations')->nullable();
            $table->string('year_in_business')->nullable();
            $table->string('primary_contact_name')->nullable();
            $table->string('primary_contact_title')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('Corp/Primary Address')->nullable();
            $table->string('Locations')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
