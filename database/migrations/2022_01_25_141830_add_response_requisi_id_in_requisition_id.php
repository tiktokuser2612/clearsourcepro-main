<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddResponseRequisiIdInRequisitionId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('requisitions', function (Blueprint $table) {
            $table->string('response_requisition_id')->after('file_table_id')->nullable();
            $table->boolean('jv_activation_status')->after('response_requisition_id')->deafult(false); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('requisition_id', function (Blueprint $table) {
            $table->varchar('response_requisition_id');
            $table->boolean('jv_activation_status')->deafult(false);
        });
    }
}
