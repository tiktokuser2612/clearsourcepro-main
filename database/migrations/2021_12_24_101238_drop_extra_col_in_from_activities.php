<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropExtraColInFromActivities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            
            $table->dropColumn('current_status');
            $table->dropColumn('posting_type');
            $table->dropColumn('location');
            $table->dropColumn('role_title');
            $table->dropColumn('salary');
            $table->dropColumn('base_pay');
            $table->dropColumn('hour');
            $table->dropColumn('role_summary_of_candidate');
            $table->dropColumn('file');
            $table->string('message')->after('user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('from_activities', function (Blueprint $table) {
            //
        });
    }
}
