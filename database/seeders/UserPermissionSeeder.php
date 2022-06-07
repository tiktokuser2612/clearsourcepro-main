<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserPermission;

class UserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where("user_role", "admin")->first();

        if($user){
            for($i = 2; $i <= 9; $i++){
                UserPermission::create([
                    'user_id' => $user->id,	
                    'permission_id' => $i,	
                    'permission' => 'Display',
                    'status' => 1,
                ]);
            }
        }
    }
}
