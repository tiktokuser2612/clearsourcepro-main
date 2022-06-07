<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientHiringManagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_hiring_managers', function (Blueprint $table) {
            
            $table->id();

            $table->integer('client_id')->nullable();
            $table->string('hiring_manager_name')->nullable();
            $table->string('hiring_manager_title')->nullable();
            $table->string('hiring_manager_phone')->nullable();
            $table->string('hiring_manager_email')->nullable();
            
            $table->string('contact_info_name')->nullable();
            $table->string('contact_info_email')->nullable();
            $table->string('contact_info_phone')->nullable();
            $table->string('contact_info_address')->nullable();
            $table->string('contact_info_city')->nullable();
            $table->string('contact_info_state')->nullable();
            $table->string('contact_info_zip')->nullable();

            $table->text('description')->nullable();
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
        Schema::dropIfExists('client_hiring_managers');
    }
}
