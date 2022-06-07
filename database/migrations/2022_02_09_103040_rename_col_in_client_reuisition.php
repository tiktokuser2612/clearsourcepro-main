<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColInClientReuisition extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_requisitions', function (Blueprint $table) {
            $table->renameColumn('client_id', 'company_id');
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
            $table->renameColumn('client_id', 'company_id');
        });
    }
}
