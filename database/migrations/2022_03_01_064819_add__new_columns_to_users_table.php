<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('middle_initial')->nullable();
            $table->date('dob')->nullable();
            $table->string('title')->nullable();
            $table->string('manager')->nullable();
            $table->string('start_date')->nullable();
            $table->string('evaluation_date')->nullable();
            $table->string('evaluation_form')->nullable();
            $table->string('termination_date')->nullable();

            $table->string('home_phone_number')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('mailing_address')->nullable();
            $table->string('secondary_address')->nullable();
            
            $table->string('country')->nullable();
            $table->string('time_zone')->nullable();
            $table->string('language')->nullable();
            $table->string('desired_compensation')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('name')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('relationship')->nullable();

            // $table->string('new')->nullable();
            // $table->string('prospect')->nullable();
            
            $table->boolean('active')->default(1)->nullable();

            $table->string('contract_sent')->nullable();
            $table->string('years_in_business')->nullable();

            $table->enum('contacted', ['Called LM', 'Sent email', 'Texted','LinkedIn'])->nullable();

            $table->enum('client_status', ['New', 'Prospect','Contacted'])->default('New')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
