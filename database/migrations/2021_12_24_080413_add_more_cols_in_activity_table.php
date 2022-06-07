<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMoreColsInActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->string('paid')->after('action')->nullable();
            $table->string('current_status')->nullable();
            $table->string('posting_type')->nullable();
            $table->string('location')->nullable();
            $table->string('role_title')->nullable();
            $table->string('salary')->nullable();
            $table->string('base_pay')->nullable();
            $table->string('hour')->nullable();
            $table->string('role_summary_of_candidate')->nullable();
            $table->string('file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('activity', function (Blueprint $table) {
            //
        });
    }
}
