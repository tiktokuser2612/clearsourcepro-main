<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function($table) {
            $table->string('company_name')->after('user_role')->nullable();
            $table->string('company_type')->after('company_name')->nullable();
            $table->string('phone')->after('company_type')->nullable();
            $table->string('address')->after('phone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function($table) {
            $table->string('company_name')->after('user_role')->nullable();
            $table->string('company_type')->after('company_name')->nullable();
            $table->string('phone')->after('company_type')->nullable();
            $table->string('address')->after('phone')->nullable();
        });
    }
}
