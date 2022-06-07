<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddClientsColsInUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('company_website')->after('company_type')->nullable();
            $table->string('hours_of_operations')->after('company_website')->nullable();
            $table->string('year_in_business')->after('hours_of_operations')->nullable();

            $table->string('client_locations')->after('year_in_business')->nullable();
            $table->string('primary_contact_title')->after('client_locations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user', function (Blueprint $table) {
            //
        });
    }
}
