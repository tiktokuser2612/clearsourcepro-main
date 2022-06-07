<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropColAddColInReqiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('requisitions', function (Blueprint $table) {
            
            $table->dropColumn('other_recruiter');
            
        });

        Schema::table('requisitions', function (Blueprint $table) {
            
            $table->integer('other_recruiter')->after('hiring_manager_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reqi', function (Blueprint $table) {
            //
        });
    }
}
