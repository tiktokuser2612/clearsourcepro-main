<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'firstname' => 'Admin',
            'username' => 'Admin',
            'email' => 'admin@soheard.com',
            'user_role' => "admin",
            'password' => bcrypt('password'),
        ]);
    }
}
