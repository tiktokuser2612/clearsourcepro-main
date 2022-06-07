<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\V1\UserController;


class JobviteEmployeeInvitationStatusCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'JobviteEmployeeInvitationStatusCheck:cron';
    

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check activation status on Jobvite ';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        // dd($user);
        
        parent::__construct();
       
    }  

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::whereIn('user_role',['client','recruiter'])->whereNotIn('jv_invitation_status',['Accepted'])->get();
        
        // dd($users);

        foreach($users as $user){
            // dd($user);
            $email = $user->email;
            
            $url = 'https://api.jvistg2.com/api/v2/employee?api=clearsourcerpo_api_key&sc=1f3e505d84a335252880002a91bbc94c&userEmail=soheardpma@gmail.com&email='.$email;
            $ch = curl_init();
            
            // Attach encoded JSON string to the POST fields
            curl_setopt($ch, CURLOPT_URL, $url);

            // Set the content type to application/json
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

            // Return response instead of outputting
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // Execute the POST request
            $result = curl_exec($ch);
            
            $resultData = json_decode($result);
            // dd($resultData->employees[0]->invitationStatus);
            // Close cURL resource
            curl_close($ch);
            
            $dbUser = User::where('email',$email)->first();
            
            $dbUser->jv_invitation_status = $result->employees[0]->invitationStatus;
            $dbUser->save();    
            
        }
    }
}