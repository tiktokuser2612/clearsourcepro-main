<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_records', function (Blueprint $table) {
            $table->id();
            $table->boolean('current_status');
            $table->string('posting_type');
            $table->string('location');
            $table->string('role_title');
            $table->string('salary');
            $table->string('base_pay');
            $table->string('hour');
            $table->string('bonus_plan');
            $table->text('role_summary_of_candidate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_records');
    }
}
