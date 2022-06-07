<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\ActionPermission;

class MenuPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('action_permissions')->insert([
            [
                'permission' => "Menu Items",
                'parent_id' => null,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Dashboard",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Users Controller",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Requisitions",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Recruiters",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Clients",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Client Records",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Candidates",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Reports",
                'parent_id' => ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id,
            ]
        ]);

        //Dashboard Permission

        DB::table('action_permissions')->insert([
            [
                'permission' => "Dashboard",
                'parent_id' => null,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Analytics Summary",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Metrics",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Req Calendar & Candidates",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "My Open Reqs",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "All Open Reqs",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Billboard",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "My Tasks",
                'parent_id' => ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id,
            ]
        ]);

         //User Controller Permission

        DB::table('action_permissions')->insert([
            [
                'permission' => "Users Controller",
                'parent_id' => null,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Actions",
                'parent_id' => ActionPermission::where('permission', 'Users Controller')->whereNull('parent_id')->first()->id,
            ]
        ]);

        //Req Accordion
        DB::table('action_permissions')->insert([
            [
                'permission' => "Req Accordions",
                'parent_id' => null,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Details",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        
        DB::table('action_permissions')->insert([
            [
                'permission' => "Analytics Summary",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Candidates by Workflow",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Description",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "General Details",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Posting Option",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Notes",
                'parent_id' => ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);


        //Recruiter Accordions

        DB::table('action_permissions')->insert([
            [
                'permission' => "Recruiter Accordions",
                'parent_id' => null,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Details",
                'parent_id' => ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Analytics Summary",
                'parent_id' => ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Resume",
                'parent_id' => ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Permissions",
                'parent_id' => ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Notes",
                'parent_id' => ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        // Client Accordions

        DB::table('action_permissions')->insert([
            [
                'permission' => "Client Accordions",
                'parent_id' => null,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Details",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Reqs",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Hiring Managers",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Accounting/Billing Contact Info",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Description of Business",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Contacts",
                'parent_id' => ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        // Candidate Accordions

        DB::table('action_permissions')->insert([
            [
                'permission' => "Candidate Accordions",
                'parent_id' => null,
            ]
        ]);
        

        DB::table('action_permissions')->insert([
            [
                'permission' => "Details",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Details",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Resume",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Reqs",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

        DB::table('action_permissions')->insert([
            [
                'permission' => "Classes",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);
        DB::table('action_permissions')->insert([
            [
                'permission' => "Notes",
                'parent_id' => ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id,
            ]
        ]);

    }
}
