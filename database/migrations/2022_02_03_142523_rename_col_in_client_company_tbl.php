<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColInClientCompanyTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_companies', function (Blueprint $table) {
            // $table->renameColumn('Corp/PrimaryAddress','address_type');
            $table->dropColumn('Corp/Primary Address');
            $table->string('address_type')->after('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('client_company_tbl', function (Blueprint $table) {
            //
        });
    }
}
