<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToClientRequisitions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_requisitions', function (Blueprint $table) {
            $table->string('general_primary_address')->nullable();
            $table->string('general_hiring_manager')->nullable();
          
            $table->string('general_type_of_insurance_licensed_needed')->nullable();
            $table->string('general_non_residents')->nullable();
            $table->string('general_need_AHIP')->nullable();
            $table->string('general_products_carriers')->nullable();
            $table->string('general_appointment_info')->nullable();
            $table->string('general_hours_schedule')->nullable();
            $table->string('general_base_pay')->nullable();
            $table->string('general_bonus_plan')->nullable();
            $table->string('general_minimum_experience')->nullable();
            $table->string('general_technology')->nullable();
            $table->string('general_training')->nullable();
            $table->string('general_inbound_outbound')->nullable();
            $table->string('general_schedule_phone_interview')->nullable();
            $table->string('general_openings')->nullable();
            $table->string('general_apply_form')->nullable();
            $table->string('general_time_off_requested')->nullable();
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
