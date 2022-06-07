<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColInRequisitionTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_requisitions', function (Blueprint $table) {
            $table->renameColumn('general_hiring_manager', 'hiring_manager');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('client_requisitions', function (Blueprint $table) {
            $table->renameColumn('general_hiring_manager', 'hiring_manager');
        });
    }
}
