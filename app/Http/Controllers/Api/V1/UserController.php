<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\{UserPermission,ActionPermission};

use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Mail;
use App\Console\Commands\JobviteEmployeeInvitationStatusCheck;
use App\Services\JobViteEmployee;
use App\Services\Resumes;
use App\Services\ActivityLogs;
use App\Mail\LoginInviteEmail;
use URL;

class UserController extends Controller 
{

    protected $jobViteEmployee;
    protected $resume;
    protected $logs;
        
    public function __construct(JobViteEmployee $jobViteEmployee, Resumes $resume, ActivityLogs $logs) {
        $this->jobViteEmployee = $jobViteEmployee;
        $this->resume = $resume;
        $this->logs = $logs;
    }

    public function login(Request $request){

        $credentials = $request->only('email', 'password','user_role');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
           
            if($user->status == 1){
                $accessToken = $user->createToken('ApiAccess')->accessToken;
                if($accessToken != null){
                    $this->logs->loginActivity($user); 
                }
    
                return response()->json([
                    'accessToken' => $accessToken,
                    'refreshToken' => $accessToken,
                    'msg' => 'Login successful',
                    'user' => User::where('email',$request->email)->with(['getRequisitions', 'getPermissions', 
                        'files','getClientCompany', 'menuPermissions' => function ($q) { 
                            $q->with('details');
                        }, 'dashboardPermissions' => function ($q) {
                            $q->with('details');
                        }, 'recruiterPermissions' => function ($q) {
                            $q->with('details');
                        }, 'requisitionPermissions' => function ($q) {
                            $q->with('details');
                        }, 'clientPermissions' => function ($q) {
                            $q->with('details');
                        }, 'candidatePermissions' => function ($q) {
                            $q->with('details');
                        },

                    ])->first(),
                ]);
            }else{
                return response()->json([
                    'msg' => 'Your Account is not Active',
                ])->setStatusCode(401);
            }
        }

        return response()->json([
            'msg' => 'Email or password is incorrect.',
        ])->setStatusCode(401);
    }

    public function getMe(Request $request)
    {   
        $userData = User::with(['getRequisitions', 'files','getClientCompany',
        'menuPermissions' => function ($q) { 
            $q->with('details');
        }, 'dashboardPermissions' => function ($q) {
            $q->with('details');
        }, 'recruiterPermissions' => function ($q) {
            $q->with('details');
        }, 'requisitionPermissions' => function ($q) {
            $q->with('details');
        }, 'clientPermissions' => function ($q) {
            $q->with('details');
        }, 'candidatePermissions' => function ($q) {
            $q->with('details');
        },

        //
        ])->find(Auth::id());
        
        return response()->json($userData);
    }

    public function putMe(Request $request)
    {
        $user = Auth::user();

        $validation_rules = [
            'email' => 'required|email',
            'username' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ];

        $this->validate($request, $validation_rules);

        $user->firstname = isset($request->firstname) ? $request->firstname : '';
        $user->lastname = isset($request->lastname) ? $request->lastname : '';
        $user->photo_url = isset($request->photo_url) ? $request->photo_url : '';
        $user->user_role = isset($request->user_role) ? $request->user_role : $user->user_role;
        if (!empty($request->password)) {
            $user->password = bcrypt($request->password);
        }
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;
        $user->salary = $request->salary;
        $user->hiring_dates = $request->hiring_dates;
        $user->client_company_id = $request->client_company_id != "null" ? $request->client_company_id : NULL;

        $user->save();
        if($request->hasFile('File') != null){
            
            $fileTableId = $this->resume->uploadDoc($request, "App\Models\User" , $user->id); 
           
        }
        if($user){
            //Create log 
            $this->logs->actionActivityLog($user->id, 'App\Models\User', "Update User profile");
           
        }

        $userData = User::find($user['id']);

        return response()->json(['msg' => 'success', 'user' => $userData]);
    }

    public function logout(Request $request) {
        $this->logs->logoutActivity(Auth::user());
        $user = Auth::user()->token();
        $user->revoke(); 
        // Auth::logout();
        return response()->json([
            'msg' => "success!!",
        ]);
    }

    public function postIndex(Request $request){   

        // dd($request);
        $this->validate($request, [
            'firstname' => 'required',
            'username' => 'required',
            'lastname' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
        ]);

        try{
            $jobviteData = $this->jobViteEmployee->createJobViteEmployee($request);    

            if(!empty($jobviteData)){
                
                $jobviteEmployeeId = isset($jobviteData->eId) ? $jobviteData->eId : null;    
                
                if(empty($jobviteEmployeeId)){        
                    return response()->json([
                        'success' => false,
                        'msg' => $jobviteData->status->messages[0],
                    ],$jobviteData->status->code);
                }

            }
            $user = new User;
            $user->jv_employee_id = !empty($jobviteEmployeeId) ? $jobviteEmployeeId : null;

            $this->roleBasedFields($request , $user );

            return response()->json([
                'msg' => 'User created successfully',
                'status' => true,
            ]);
            
        }catch (\Exception $ex){
            return response()->json([
                'status' => false,
                'msg' => $ex->getMessage(),
                'error' => $ex,
            ]);
        }
    }

    public function roleBasedFields($request, $user){
        $user->password = bcrypt($request->password);
        $user->user_role = $request->user_role;
        $user->address = !empty($request->address) ? $request->address : null;
        $user->city = !empty($request->city) ? $request->city : null; 
        $user->state = !empty($request->state) ? $request->state : null;
        $user->middlename = isset($request->middlename) ? $request->middlename : null;
        
        $user->zip = !empty($request->zip) ? $request->zip : null;
        
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->username = $request->username;
        $user->photo_url = isset($request->photo_url) ? $request->photo_url : null;
        $user->email = $request->email;
        if (!empty($request->password)) {
            $user->password = bcrypt($request->password);
        }
        $user->phone = $request->phone;
        $user->user_role = $request->user_role;
        $user->address = $request->address;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;

        $user->start_date = isset($request->start_date) ? $request->start_date : null;
        $user->mobile_number = isset($request->mobile_number) ? $request->mobile_number : null;
        $user->location = isset($request->location) ? $request->location : null;
        $user->manager = isset($request->manager) ? $request->manager : null;
        $user->title = isset($request->title) ? $request->title : null;
        $user->evaluation_date = isset($request->evaluation_date) ? $request->evaluation_date : null;
        $user->termination_date = isset($request->termination_date) ? $request->termination_date : null;
        
        $user->secondary_address = isset($request->secondary_address) ? $request->secondary_address : null;
        $user->country = isset($request->country) ? $request->country : null;
        $user->name = isset($request->name) ? $request->name : null;

       
        $user->contact_number = isset($request->contact_number) ? $request->contact_number : null;
        $user->relationship = isset($request->relationship) ? $request->relationship : null;
        // $user->schedule = isset($request->schedule) ? $request->schedule : null;
        $user->time_zone = isset($request->time_zone) ? $request->time_zone : null;
        $user->dob = $request->dob ?? null;
        
        $user->middle_initial = isset($request->middlename) ? $request->middlename : null;
        $user->evaluation_form = isset($request->evaluation_form) ? $request->evaluation_form : null;
        $user->home_phone_number = isset($request->home_phone_number) ? $request->home_phone_number : null;
        $user->mailing_address = isset($request->mailing_address) ? $request->mailing_address : null;
        $user->language = isset($request->language) ? $request->language : null;
        $user->desired_compensation = isset($request->desired_compensation) ? $request->desired_compensation : null;
        $user->emergency_contact = isset($request->emergency_contact) ? $request->emergency_contact : null;
        $user->active = isset($request->active) ? $request->active : null;
        $user->contract_sent = isset($request->contract_sent) ? $request->contract_sent : null;
        $user->years_in_business = isset($request->years_in_business) ? $request->years_in_business : null;
        $user->contacted = isset($request->contacted) ? $request->contacted : null;
        $user->client_status = isset($request->client_status) ? $request->client_status : null;

        $user->primary_contact_title = isset($request->primary_contact_title) ? $request->primary_contact_title : null;
        $user->primary_contact_name = isset($request->primary_contact_name) ? $request->primary_contact_name : null;
        $user->years_in_business = isset($request->years_in_business) ? $request->years_in_business : null;

        $user->active = isset($request->active) ? 1 : 0;

        $user->save();

        foreach($request['permission'] as $level1_key => $level1){
            foreach($level1 as $level2_key => $level2){
                $p = ActionPermission::where('permission',$level2_key)->where('parent_id', ActionPermission::where('permission',$level1_key)->whereNull('parent_id')->first()->id)->first();
                foreach($level2 as $perm_key => $value){
                    UserPermission::updateOrCreate(
                        [
                            'user_id' => $user->id,
                            'permission_id' => $p->id,
                            "permission" => $perm_key
                        ],
                        [
                            "status" => $value
                        ]
                    );
                }
            }
        }
    
        return;
    }

    public function put(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $rules = [
            'firstname' => 'required',
            'username' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ];
        
        // $jobviteData = $this->jobViteEmployee->editJobviteEmployee($request,$user->jv_employee_id );    
        
        // if(!empty($jobviteData) && isset($jobviteData->status->messages[0])){
            
        //     return response()->json([
        //         'success' => false,
        //         'msg' => $jobviteData->status->messages[0],
        //     ],$jobviteData->status->code);
        // }

        if($request->email != $user->email){
            $rules['email'] = 'required|unique:users';
        }

        $this->validate($request, $rules);
        $this->roleBasedFields($request , $user);

        $result = [
            'success' => true,
            'id' => $user->id,
        ];
        return response()->json($result);
    }

    public function getIndex(Request $request)  {
        
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->filters;//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);

        // dd($filters);
        $users = User::where(function($q) use($filters){
            if(isset($filters) &&  !empty($filters) ){
                $q->where('firstname', 'like', '%'.$filters['search'].'%')->orWhere('email', 'like', '%'.$filters['search'].'%');
            } else {
                $q; 
            }
        });

        if ($sorter !== null) {
            $users = $users->orderBy($sorter, $ascDirection);
        }else{
            $users = $users->orderBy('id', 'DESC');
        }
        $total_count = $users->count();
        if($total_count > 0 ){
            $users = $users->limit($pageSize)->offset($current_num)->get();
            
                $result = [
                    'data' => $users,
                    'total' => $total_count,
                    'current' => $current_page,
                ];
        }else{
                $result = [
                    'data' => [],
                    'total' => $total_count,
                    'current' => $current_page,
                    'msg' => 'No recors found'

                ];
        }
        return response()->json($result);
    }

    public function get(Request $request, $id) {
        $user = User::with(['permissions' => function ($q) {
            $q->with(['details' => function ($s) {
                $s->with('parent');
            }]);
        }])->findOrFail($id);
        
        $jobviteEmployeeDetails = $this->jobViteEmployee->getJobviteEmployeeDetails($user);
        
        $result = [
            'data' => $user,
            'jobviteEmployeeDetail' => !empty($jobviteEmployeeDetails) ? $jobviteEmployeeDetails : null
        ];

        return response()->json($result);
    }

    public function changePassword(Request $request) {
        // dd($request->all());
        $this->validate($request, [
            'password' => 'required|min:6',
        ]);

        $user = Auth::user();
        $user->password = bcrypt($request->password);
        $user->save();

        // Mail::to($user->email)->send(new PasswordResetMail($request->password, true));

        return response()->json(['msg' => 'success']);
    }

    public function changeUserStatus(Request $request,$id) {
        $status = $request->all()[0];
        $data = User::findOrFail($id);   
        $data->status = $status;
        $data->save();
        return response()->json(['msg' => 'Status change success']);
    }

    /**
     * Get all recruiters list
     */
    public function getRecruitersList(Request $request) {
        $recruitersList = User::whereIn('user_role',['recruiter','account_executive'])->get();
        
        $result = [
            'recruitersList'  => $recruitersList,
        ];
        return response()->json($result);
    }

    public function putEmployee(){
        $ch = curl_init("https://api.jvistg2.com/api/v2/employee/<employeeUserId>?api=clearsourcerpo_api_key&sc=1f3e505d84a335252880002a91bbc94c&userEmail=soheardpma@gmail.com");
            $data= [
                // "eId" => "o8Ejifw7",
                "eId" => $data->jv_response_requisition_id,
                // "requisitionId" => $id,
                "title" => $data->title,
                "briefDescription" => $data->brief_description,
                "description" => $data->description,
            ];
            $formatedData=json_encode($data);

            // Attach encoded JSON string to the POST fields
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            // Set the content type to application/json
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

            curl_setopt($ch, CURLOPT_POSTFIELDS, $formatedData);
            // Return response instead of outputting
            

            // Execute the POST request
            $result = curl_exec($ch);
            // Close cURL resource
            curl_close($ch);
            return $result;

    }

    public function sendMail(Request $request){
        try{
            $user = User::findOrFail($request->user_id);    
            $email = $user->email;
        
            $msg = "Hello ". $user['username']." <br>  
                    Clearsource Login Page Link :" .URL::to('/login')."<br>".
                    "Your Login Details of clearsource :
                    <br> Email = ".$email."<br>".
                    "<br> Password = ".$user->city."<br>";

            Mail::html($msg, function($message) use ($email){
            
                $message->from(env('MAIL_USERNAME'), 'Laravel');
                $message->to($email);
                $message->subject('Login Details of Clearsource');
            });

            $user->send_mail = 1;
            $user->save();
        }catch(Exception $ex){
            return $ex;
        }
        
    }

    public function getClientRoleUsers(Request $request){
        $clients = User::where('user_role','client')->get();
        return $clients;
    }

    public function logActivity(Request $request){
       echo "testtttt"; print_r('srtgretret');die('testtt');
        
        $this->logs->logoutActivity(Auth::user()); 
    }
}
