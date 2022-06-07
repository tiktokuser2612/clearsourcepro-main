<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequisitionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requisitions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('job_type')->nullable();
            $table->string('compensation')->nullable();
            $table->string('category')->nullable();
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->string('evaluation_form')->nullable();
            $table->string('pre_interview_form')->nullable();
            $table->string('recruiter_name')->nullable();
            $table->string('hiring_manager')->nullable();
            $table->string('other_recruiter')->nullable();
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
        Schema::dropIfExists('requisitions');
    }
}
