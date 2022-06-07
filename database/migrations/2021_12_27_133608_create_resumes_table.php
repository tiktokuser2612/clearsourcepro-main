<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('user_role')->nullable();
            $table->integer('jobvite_resume_id')->nullable();
            $table->string('resume_filepath')->nullable();
            $table->integer('resumeable_id');
            $table->integer('resumeable_type')->nullable();
            $table->integer('local_file_table_id')->nullable();
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
        Schema::dropIfExists('resumes');
    }
}
