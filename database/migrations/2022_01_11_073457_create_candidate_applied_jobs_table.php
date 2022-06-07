<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidateAppliedJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidate_applied_jobs', function (Blueprint $table) {
            
            $table->id();
            $table->integer('requisition_id')->nullable();
            $table->integer('candidate_id')->nullable();
            $table->string('file_table_id')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('candidate_country')->nullable();
            $table->string('email')->nullable();
            $table->string('step_2_how_did_you_hear_about_us')->nullable();
            $table->string('phone')->nullable();
            $table->string('zip')->nullable();
            $table->string('contractor')->nullable();

            $table->string('company_name')->nullable();
            $table->string('company_country')->nullable();
            $table->string('job_title')->nullable();
            $table->string('key_achievments')->nullable();
            $table->string('year_of_experience')->nullable();

            $table->string('Are_you_willing_to')->nullable();
            $table->string('When_the_earliest_')->nullable();
            $table->string('Why_did_you_apply_')->nullable();
            $table->string('Why_would_you_like')->nullable();
            $table->string('step_4_contractor')->nullable();
            $table->string('full_time_part_time')->nullable();
            $table->string('how_did_you_hear_about_us')->nullable();

            $table->string('dob')->nullable();
            $table->string('ethnic_background')->nullable();
            $table->string('sex')->nullable();
            
            $table->string('disclosure_1')->nullable();
            $table->string('disclosure_2')->nullable();
            $table->string('disclosure_3')->nullable();
            $table->string('disclosure_4')->nullable();
            
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
        Schema::dropIfExists('candidate_applied_jobs');
    }
}
