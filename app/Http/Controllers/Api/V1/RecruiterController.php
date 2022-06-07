<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Requisition;
use App\Models\ClientRequisition;
use App\Models\Notes;
use App\Services\Resumes;
use App\Models\Permission;
use App\Models\RolePermission;
use App\Models\ClientCompany;
use App\Services\Jobvite;
use App\Services\ActivityLogs;
use DB;
use App\Models\Notifications;
class RecruiterController extends Controller{

    protected $resumes;
    protected $jobvite;
    protected $logs;

    public function __construct(Resumes $resume , Jobvite $jobvite, ActivityLogs $logs) {
        $this->resume = $resume;
        $this->jobvite = $jobvite;
        $this->log = $logs;
    }

    public function postIndex(Request $request){
        // dd($request);
        DB::beginTransaction();
        try{

                $this->validate($request, [
                    'firstname' => 'required|unique:users',
                    'email' => 'required|unique:users',
                    'phone' => 'required',
                    // 'client_company_id' => 'required',
                ]);
                
                $user = new User;
                $user->firstname = $request->firstname;
                $user->lastname = $request->lastname;
                $user->username = $request->user_name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->password = bcrypt($request->password);
                $user->user_role = 'recruiter';
                $user->address = !empty($request->address) ? $request->address : '';
                $user->city = !empty($request->city) ? $request->city : ''; 
                $user->state = !empty($request->state) ? $request->state : '';
                $user->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : '';
                $user->zip = !empty($request->zip) ? $request->zip : '';
                $user->salary = !empty($request->salary) ? $request->salary : '';
                $user->client_company_id = !empty($request->client_company_id) ? $request->client_company_id : ''; 
                $user->save();

                //Create note
                $notes = new Notes;
                $notes->title = $request->note_title;
                $notes->description = $request->note_description;
                $notes->noteable_id = $user->id;
                $notes->noteable_type = "App\Models\User";
                $notes->save();

                if($request->hasFile('File')){
                // dd($request->hasFile('File'));
                    $fileTableId = $this->resume->uploadDoc($request, "App\Models\User" , $user->id); 
                }

                $permissions =[];
                if(isset($request->permissions))
                {
                    $permissions = explode(',',$request->permissions);
                }
                    

                //Set role with permission

                if(count($permissions) > 0) {
                    foreach($permissions as $value){
                    $rolePermission = new RolePermission;
                    $rolePermission->role = 'recruiter';
                    $rolePermission->permission = $value;
                    $rolePermission->user_id = $user->id;
                    $rolePermission->save();

                    }
                }
                DB::commit();

                return response()->json([
                    'msg' => 'Recruiter created successfully',
                ]);
            }catch(\Exception $e){
                DB::rollback();
                return response()->json([
                    'msg' => $e->getMessage(),
                ]);
            }
        
    }

    public function getIndex(Request $request)
    {        
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        
        
        $users = User::where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('firstname', 'like', '%'.$filters['search'].'%')->orWhere('email', 'like', '%'.$filters['search'].'%');
            } else {
                $q->where('user_role','recruiter')->where('status',1); 
                
            }
        });
       
        if ($sorter !== null) {
            $users = $users->orderBy($sorter, $ascDirection);
        }else{
            $users = $users->orderBy('id', 'DESC');
            
        }
        $total_count = $users->count();
        // dd($total_count);
        $users = $users->limit($pageSize)->offset($current_num)->get();
        // dd($users);
        $result = [
            'data' => $users,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function get(Request $request, $id)
    {
        $user = User::with(['notes','files','getRequisitions', 'getPermissions','getClientCompany'])->findOrFail($id);
        
        $result = [
            'data' => $user,
        ];
        
        return response()->json($result);
    }

    public function put(Request $request, $id) {
        DB::beginTransaction();
        try{
                $user = User::findOrFail($id);
                $rules = [
                    'firstname' => 'required',
                    'email' => 'unique:users,email,'.$user->id,
                    'phone' => 'required',
                    'client_company_id' => 'required',
                ];

                if($user->firstname != $request->firstname){
                    $rules['firstname'] = 'required|unique:users';
                }

                $this->validate($request, $rules);
            
                $user->firstname = $request->firstname;
                $user->lastname = $request->lastname;
                $user->username = $request->user_name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->password = bcrypt($request->password);
                $user->user_role = 'recruiter';
                $user->address = !empty($request->address) ? $request->address : '';
                $user->address_type = !empty($request->address_type) ? $request->address_type : '';
                $user->city = !empty($request->city) ? $request->city : ''; 
                $user->state = !empty($request->state) ? $request->state : ''; 
                $user->zip = !empty($request->zip) ? $request->zip : ''; 
                $user->salary = !empty($request->salary) ? $request->salary : ''; 
                $user->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : ''; 
                $user->client_company_id = !empty($request->client_company_id) ? $request->client_company_id : null; 
                $user->save();

                if(isset($request->note_id) && (isset($request->note_title) || isset($request->note_description))){
                    $notes = Notes::findOrFail($request->note_id);
                    if(isset($request->note_title)){
                        $notes->title = $request->note_title;
                    }elseif(isset($request->note_description)){
                        $notes->description = $request->note_description;
                    }
                    $notes->noteable_id = $user->id;
                    $notes->noteable_type = "App\Models\User";
                    $notes->save();
                }

                if($request->hasFile('File')){
                    // dd($request->hasFile('File'));
                        $fileTableId = $this->resume->uploadDoc($request, "App\Models\User" , $user->id); 
                       
                    }
    
                $permissions =[];
                if(isset($request->permissions))
                {
                    $permissions = explode(',',$request->permissions);
                }

                //Update  permissions

                if( count($permissions) > 0) {
                    $rolePermissionIds = RolePermission::where('user_id',$id)->get();
                    if(count($rolePermissionIds) > 0){
                        foreach($rolePermissionIds as $permis){
                            $permis->delete();
                        }
                        foreach($permissions as $value){
                            $rolePermission = new RolePermission;
                            $rolePermission->role = 'recruiter';
                            $rolePermission->permission = $value;
                            $rolePermission->user_id = $user->id;
                            $rolePermission->save();
                        }
                    }else{
                        foreach($permissions as $value){
                            $rolePermission = new RolePermission;
                            $rolePermission->role = 'recruiter';
                            $rolePermission->permission = $value;
                            $rolePermission->user_id = $user->id;
                            $rolePermission->save();
                        }
                    }
                    
                   
                }
                DB::commit();
                $result = [
                    'success' => true,
                    'id' => $user->id,
                ];

                return response()->json([
                    'msg' => 'Recruiter Updated successfully',
                ]);
            }catch(\Exception $e){
                DB::rollback();
                return response()->json([
                    'msg' => $e->getMessage(),
                ]);
            }
    }

    public function delete(Request $request, $id) {
        
        $user = User::findOrFail($id);

        $user->delete();

        $notes = Notes::where('noteable_id',$id);
        $notes->delete();

        $result = [
            'success' => true,
        ];

        return response()->json($result);
    }

    //get Requisitions list

    public function getRequisitions(Request $request){

        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        $user_id = Auth::user()->id;
        
        $requisition = Requisition::with(['getRecruiter','getCandidateJobs'])->where('recruiter_id',$user_id)->where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('title', 'like', '%'.$filters['search'].'%');
            } else {
                $q; 
            }
        });
       
        if ($sorter !== null) {
            $getrequisition = $requisition->orderBy($sorter, $ascDirection);
            
        }else{
            $getrequisition = $requisition->orderBy('id', 'DESC');
        }
        $total_count = $requisition->count();
        $requisitions = $getrequisition->limit($pageSize)->offset($current_num)->get();
        
        $result = [
            'data' => $requisitions,
            'total' => $total_count,
            'current' => $current_page,
        ];
        
        return response()->json($result);
    }

   //Create Requisitions from recruiter
    public function postRequisition(Request $request){
        DB::beginTransaction();
        try{
            $this->validate($request, [
                'title' => 'required',
                'job_type' => 'required',
                'compensation' => 'required',
                'category' => 'required',
                'department' => 'required',
                'location' => 'required',
                'evaluation_form' => 'required',
                'pre_interview_form' => 'required',
                'recruiter_id' => 'required',
                'hiring_manager' => 'required',
            ]);
            
            $response = $this->jobvite->postJob($request);
            

            $requisition = new Requisition;
            
            $requisition->title = $request->title;
            $requisition->status = $request->status;
            $requisition->job_type = $request->job_type;
            $requisition->compensation = $request->compensation;
            $requisition->category = $request->category;
            $requisition->department = $request->department;
            $requisition->location = $request->location;
            $requisition->evaluation_form = $request->evaluation_form;
            $requisition->pre_interview_form = !empty($request->pre_interview_form) ? $request->pre_interview_form : '';
            $requisition->recruiter_id = !empty($request->recruiter_id) ? $request->recruiter_id : ''; 
            $requisition->hiring_manager = !empty($request->hiring_manager) ? $request->hiring_manager : '';
            $requisition->other_recruiter = !empty($request->other_recruiter) ? $request->other_recruiter : '';
            $requisition->description = !empty($request->description) ? $request->description : '';
            $requisition->brief_description = !empty($request->brief_description) ? $request->brief_description : '';
            //JV columns
            $requisition->jv_activation_status = false;
            $requisition->jv_response_requisition_id = !empty(json_decode($response)->eId) ? json_decode($response)->eId : null;
            //JV columns

            $requisition->salary = !empty($request->salary) ? $request->salary : '';
            $requisition->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : '';
            
            $requisition->created_at = time();
            $requisition->updated_at = time();
            $requisition->save();

            $requisitionId = $requisition->id;

            $fileTableId = $this->resume->uploadDoc($request, "App\Models\Requisition" , $requisition->id); 
            
            $requisitionFile = Requisition::findOrFail($requisitionId);
            $requisitionFile->file_table_id = $requisitionId;
            $requisitionFile->save();

            

            $client_requisition = new ClientRequisition;
            $client_requisition->company_id = !empty($request->company_id) ? $request->company_id : \Auth::user()->id;
            $client_requisition->client_company_name = $request->client_company_name == "null" ? null : $request->client_company_name;
            $client_requisition->client_phone = $request->client_phone;
            $client_requisition->client_email = $request->client_email;
            $client_requisition->requisition_id = !empty($requisitionId) ? $requisitionId : null ;

            $client_requisition->general_primary_address = $request->general_primary_address;
            $client_requisition->general_hiring_manager = $request->general_hiring_manager;
            
            $client_requisition->general_type_of_insurance_licensed_needed = $request->general_type_of_insurance_licensed_needed;
            $client_requisition->general_non_residents = $request->general_non_residents;
            $client_requisition->general_need_AHIP = $request->general_need_AHIP;
            $client_requisition->general_products_carriers = $request->general_products_carriers;
            $client_requisition->general_appointment_info = $request->general_appointment_info;
            $client_requisition->general_hours_schedule = $request->general_hours_schedule;
            $client_requisition->general_base_pay = $request->general_base_pay;
            $client_requisition->general_bonus_plan = $request->general_bonus_plan;
            $client_requisition->general_minimum_experience = $request->general_minimum_experience;
            $client_requisition->general_technology = $request->general_technology;
            $client_requisition->general_training = $request->general_training;
            $client_requisition->general_inbound_outbound = $request->general_inbound_outbound;
            $client_requisition->general_schedule_phone_interview = $request->general_schedule_phone_interview;
            $client_requisition->general_openings = $request->general_openings;
            $client_requisition->general_apply_form = $request->general_apply_form;
            $client_requisition->general_time_off_requested = $request->general_time_off_requested;
            $client_requisition->save();

            $notes = new Notes;
            $notes->title = $request->note_title;
            $notes->description = $request->note_description;
            $notes->noteable_id = !empty($requisitionId) ? $requisitionId : null ;
            $notes->noteable_type = "App\Models\Requisition";
            $notes->save();

            //Create log 
            $this->log->actionActivityLog($requisition->id, 'App\Models\Requisition', "Create Requisition");
            
            DB::commit();
            return response()->json([
                'msg' => 'Requisition created successfully',
            ]);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json([
                'msg' => $e->getMessage(),
            ]);
        }
        
    }

    public function getPermissionList(Request $request){
        $permissions = Permission::all();
        // dd($permissions);

        $result = [
            'permissionList' => $permissions,
        ];

        return response()->json($result);


    }
    public function getCompanyDetail(Request $request){

        $user_id = Auth::user()->id;
        $company = ClientCompany::with('getCompanyRecruiterName')
        ->where('recruiter_id',$user_id)->first();
        $result = [
            'data' => $company,
        ];

        return response()->json($result);

    }

    public function getNotificationDetails(){
        $notificationsData = Notifications::where('user_id',Auth::user()->id)->where('seen_status' , 0)->get();

        $result = [
            'data' => $notificationsData,
        ];

        return response()->json($result);
    }

    public function disableNotificationDetails($id){
        $notificationsData = Notifications::where('id',$id)->where('seen_status' , 0)->first();
        $notificationsData->seen_status = 1;

        $notificationsData->save();

        $result = [
            'success' => true,
        ];

        return response()->json($result);
    }

}
