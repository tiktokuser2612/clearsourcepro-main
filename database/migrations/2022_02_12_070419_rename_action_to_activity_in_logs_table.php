<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameActionToActivityInLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('logs', function (Blueprint $table) {
            $table->renameColumn('action_type', 'logactivtyable_type');  
            $table->renameColumn('action_id', 'logactivtyable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('logs', function (Blueprint $table) {
            $table->renameColumn('user_id', 'author_ID');
            $table->renameColumn('action_id', 'logactivtyable_id');
        });
    }
}
