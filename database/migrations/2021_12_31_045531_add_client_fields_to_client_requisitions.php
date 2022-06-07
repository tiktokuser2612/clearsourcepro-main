<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddClientFieldsToClientRequisitions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_requisitions', function (Blueprint $table) {
            
            $table->string('client_company_name')->nullable();
            $table->string('client_phone')->nullable();
          
            $table->string('client_email')->nullable();
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
            //
        });
    }
}
