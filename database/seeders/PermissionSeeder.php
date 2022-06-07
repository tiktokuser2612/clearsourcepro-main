<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = ['View Only', 'Limited Access', 'Read', 'Contribute', 'Edit'];
        foreach($data as $value){

            Permission::create(
                ['name' => $value]
            );
        }
        
    }
}
