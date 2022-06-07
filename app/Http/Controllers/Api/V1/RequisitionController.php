<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Requisition;
use App\Models\ClientRequisition;
use App\Models\User;
use App\Models\Notes;
use App\Models\File;
use DB;
use App\Services\Resumes;
use App\Services\Jobvite;
use App\Services\HiringManagerActivityLogs;
use App\Services\HiringManager;
use App\Services\ActivityLogs;
class RequisitionController extends Controller{

    protected $resume;
    protected $jobvite;
    protected $logs;
    protected $hiringManger;

    public function __construct(Resumes $resume , 
                                Jobvite $jobvite, 
                                ActivityLogs $logs, 
                                HiringManager $hiringManger) {
        $this->resume = $resume;
        $this->jobvite = $jobvite;
        $this->log = $logs;
        $this->hiringManger = $hiringManger;
    }

    public function postIndex(Request $request){
        
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
            // 'hiring_manager_id' => 'required',
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
        $requisition->company_id = $request->company_id;
        $requisition->evaluation_form = $request->evaluation_form;
        $requisition->pre_interview_form = !empty($request->pre_interview_form) ? $request->pre_interview_form : null;
        $requisition->recruiter_id = !empty($request->recruiter_id) ? $request->recruiter_id : null; 
        $requisition->hiring_manager_id = !empty($request->hiring_manager_id) ? $request->hiring_manager_id : null;
        $requisition->other_recruiter = !empty($request->other_recruiter) ? $request->other_recruiter : null;
        $requisition->salary = !empty($request->salary) ? $request->salary : null; 
        $requisition->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : null; 
        $requisition->description = !empty($request->description) ? $request->description : null;
        $requisition->brief_description = !empty($request->brief_description) ? $request->brief_description : null;
        //JV columns
        $requisition->jv_activation_status = false;
        $requisition->jv_response_requisition_id = !empty(json_decode($response)->eId) ? json_decode($response)->eId : null;
        //JV columns

        $requisition->created_at = time();
        $requisition->updated_at = time();  
        
        $requisition->save();

        $requisitionId = $requisition->id;

        if($request->hasFile('File') !=null ){
            $fileTableId = $this->resume->uploadDoc($request, "App\Models\Requisition" , $requisition->id); 
        }
    
        $client_requisition = new ClientRequisition;
        $client_requisition->company_id = !empty($request->company_id) ? $request->company_id : null;
        $client_requisition->client_company_name = $request->company_name == "null" ? null : $request->company_name;
        $client_requisition->client_phone = $request->company_phone;
        $client_requisition->client_email = $request->company_email;
        $client_requisition->requisition_id = !empty($requisitionId) ? $requisitionId : null ;

        $client_requisition->general_primary_address = $request->general_primary_address;
        $client_requisition->hiring_manager = $request->hiring_manager;
        
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

        $this->log->recruisitionCreateLog($requisitionId);

        return response()->json([
            'msg' => 'Requisition created successfully',
        ]);
        
    }

    public function getIndex(Request $request){
        // dd($request->all());
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
       
        
        $requisition = Requisition::with(['getRecruiter', 'getCandidateJobs'])->where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('title', 'like', '%'.$filters['search'].'%');
            } else {
                $q; 
                
            }
        });
   
        if ($sorter !== null) {
            $requisition = $requisition->orderBy($sorter, $ascDirection);
        }else{
            $requisition = $requisition->orderBy('id', 'DESC');
        }
        $total_count = $requisition->count();

        $requisition = $requisition->limit($pageSize)->offset($current_num)->get();
        // dd($total_count);
        $result = [
            'data' => $requisition,
            'total' => $total_count,
            'current' => $current_page,
        ];
        
        return response()->json($result);
    }

    /**
     * Get Client list
     */
    public function getClientList(){

        $clients = User::where('user_role', 'client')->get();
       
        $result = [
            'data' => $clients,
            
        ];

        return response()->json($result);
    } 

    public function get(Request $request, $id) {
        
        $response = $this->jobvite->getjob();
        $requisition = Requisition::with(['notes','clientRequisitions', 'getRecruiter','getOtherRecruiter', 'getCandidateJobs', 'getCandidateIdAppliedForRequisition', 'RequisitionDoc', 'getHringManagerName'])->findOrFail($id);
        
        // dd($requisition);

        if($requisition){
            //Create log 
            $this->log->actionActivityLog($requisition->id, 'App\Models\Requisition', "View Requisition");
        }

        
        if(!empty($requisition->clientRequisitions)){
            
            $requisition->company_name = !empty($requisition->clientRequisitions->client_company_name) ? $requisition->clientRequisitions->client_company_name : '';
            $requisition->company_phone = $requisition->clientRequisitions->client_email;
            $requisition->company_email = $requisition->clientRequisitions->client_phone;

            $requisition->hiring_manager = $requisition->clientRequisitions->hiring_manager;
            $requisition->general_primary_address = !empty($requisition->clientRequisitions->general_primary_address) ? $requisition->clientRequisitions->general_primary_address : '';
            $requisition->general_type_of_insurance_licensed_needed = $requisition->clientRequisitions->general_type_of_insurance_licensed_needed;
            $requisition->general_non_residents = $requisition->clientRequisitions->general_non_residents;
            $requisition->general_need_AHIP = $requisition->clientRequisitions->general_need_AHIP;
            $requisition->general_products_carriers = $requisition->clientRequisitions->general_products_carriers;
            $requisition->general_appointment_info = $requisition->clientRequisitions->general_appointment_info;

            $requisition->general_hours_schedule = $requisition->clientRequisitions->general_hours_schedule;
            $requisition->general_base_pay = $requisition->clientRequisitions->general_base_pay;
            $requisition->general_bonus_plan = $requisition->clientRequisitions->general_bonus_plan;

            $requisition->general_minimum_experience = $requisition->clientRequisitions->general_minimum_experience;
            $requisition->general_technology = $requisition->clientRequisitions->general_technology;
            $requisition->general_training = $requisition->clientRequisitions->general_training;

            $requisition->general_inbound_outbound = $requisition->clientRequisitions->general_inbound_outbound;
            $requisition->general_schedule_phone_interview = $requisition->clientRequisitions->general_schedule_phone_interview;
            $requisition->general_openings = $requisition->clientRequisitions->general_openings;
            $requisition->general_apply_form = $requisition->clientRequisitions->general_apply_form;
            $requisition->general_time_off_requested = $requisition->clientRequisitions->general_time_off_requested;
            
        }

        $result = [
            'data'  => $requisition,
        ];
        return response()->json($result);
    }

    public function put(Request $request, $id) {

        // dd($request);
        $requisition = Requisition::findOrFail($id);

        $rules = [
            'title' => 'required',
            'job_type' => 'required',
            'compensation' => 'required',
            'category' => 'required',
            'department' => 'required',
            'location' => 'required',
            'evaluation_form' => 'required',
            'pre_interview_form' => 'required',
            'recruiter_id' => 'required',
            // 'hiring_manager_id' => 'required',
        ];

        $this->validate($request, $rules);
        
       // $response = json_decode($this->jobvite->putJob($request, $id));
        
        //$jvStatusCode = $response->status->code;
        

        $requisition->title = !empty($request->title) ? $request->title : '';
        $requisition->status = !empty($request->status) ? $request->status : '';
        $requisition->job_type = !empty($request->job_type) ? $request->job_type : '';
        $requisition->compensation = !empty($request->compensation) ? $request->compensation : '';
        $requisition->description = !empty($request->description) ? $request->description : '';
        $requisition->brief_description = !empty($request->brief_description) ? $request->brief_description : '';
        $requisition->category = !empty($request->category) ? $request->category : '';
        $requisition->department = !empty($request->department) ? $request->department : '';
        $requisition->location = !empty($request->location) ? $request->location : '';
        $requisition->evaluation_form = !empty($request->evaluation_form) ? $request->evaluation_form : '';
        $requisition->pre_interview_form = !empty($request->pre_interview_form) ? $request->pre_interview_form : '';
        $requisition->recruiter_id = !empty($request->recruiter_id) ? $request->recruiter_id : ''; 
        $requisition->hiring_manager_id = !empty($request->hiring_manager_id) ? $request->hiring_manager_id : '';
        $requisition->other_recruiter = !empty($request->other_recruiter) ? $request->other_recruiter : '';

        $requisition->salary = !empty($request->salary) ? $request->salary : '';
        $requisition->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : '';

        $requisition->created_at = time();
        $requisition->updated_at = time();
        $requisition->save();
        

        if($request->hasFile('File') != null){
            
            $fileTableId = $this->resume->uploadDoc($request, "App\Models\Requisition" , $id); 
           
        }
        // dd(!empty($request->client_requisitions));

        
        $client_requisition = ClientRequisition::where('requisition_id', $id)->first();
        if($client_requisition){
            $client_requisition->general_primary_address = !empty($request->general_primary_address) ? $request->general_primary_address: '';
            $client_requisition->hiring_manager = !empty($request->hiring_manager) ? $request->hiring_manager: '';

            $client_requisition->general_type_of_insurance_licensed_needed = !empty($request->general_type_of_insurance_licensed_needed) ? $request->general_type_of_insurance_licensed_needed: '';
            $client_requisition->general_non_residents = !empty($request->general_non_residents) ? $request->general_non_residents: '';
            $client_requisition->general_need_AHIP = !empty($request->general_need_AHIP) ? $request->general_need_AHIP: '';
            $client_requisition->general_products_carriers = !empty($request->general_products_carriers) ? $request->general_products_carriers: '';
            $client_requisition->general_appointment_info = !empty($request->general_appointment_info) ? $request->general_appointment_info: '';
            $client_requisition->general_hours_schedule = !empty($request->general_hours_schedule) ? $request->general_hours_schedule: '';
            $client_requisition->general_base_pay = !empty($request->general_base_pay) ? $request->general_base_pay: '';
            $client_requisition->general_bonus_plan = !empty($request->general_bonus_plan) ? $request->general_bonus_plan: '';
            $client_requisition->general_minimum_experience = !empty($request->general_minimum_experience) ? $request->general_minimum_experience: '';
            $client_requisition->general_technology = !empty($request->general_technology) ? $request->general_technology: '';
            $client_requisition->general_training = !empty($request->general_training) ? $request->general_training: '';
            $client_requisition->general_inbound_outbound = !empty($request->general_inbound_outbound) ? $request->general_inbound_outbound: '';
            $client_requisition->general_schedule_phone_interview = !empty($request->general_schedule_phone_interview) ? $request->general_schedule_phone_interview: '';
            $client_requisition->general_openings = !empty($request->general_openings) ? $request->general_openings: '';
            $client_requisition->general_apply_form = !empty($request->general_apply_form) ? $request->general_apply_form: '';
            $client_requisition->general_time_off_requested = !empty($request->general_time_off_requested) ? $request->general_time_off_requested: '';
            $client_requisition->updated_at = time();
            $client_requisition->save();
        }
        
            
        

        if(isset($request->note_id) && (isset($request->note_title) || isset($request->note_description))){
            $notes = Notes::findOrFail($request->note_id);
            if(isset($request->note_title)){
                $notes->title = $request->note_title;
            }elseif(isset($request->note_description)){
                $notes->description = $request->note_description;
            }
            $notes->noteable_id = $requisition->id;
            $notes->noteable_type = "App\Models\Requisition";
            $notes->save();
        }
        
        // $this->log->recruisitionEditLog($id);
        if($requisition){
            //Create log 
            $this->log->actionActivityLog($requisition->id, 'App\Models\Requisition', "Update Requisition");
           
        }

        $result = [
            'success' => true,
            'id' => $requisition->id,
        ];

        return response()->json([
            'msg' => 'Requisition Updated successfully',
        ]);
    }

    public function delete($id) {
        
        $user = Requisition::findOrFail($id);
        $result = [];

        if($user){
            $files = File::where('fileable_id',$user->id)->where('fileable_type','App\Models\Requisition')->get();
            if($files){
                foreach($files as $file){
                    $file->delete();
                }
            }
            

            

            $notes = Notes::where('noteable_id',$user->id)->get();
            if($notes){
                foreach($notes as $note){
                    $note->delete();
                }
            }
            ;

            $ClientRequisition = ClientRequisition::where('requisition_id',$id)->first();
            if($ClientRequisition){
                $ClientRequisition->delete();
            }
            
            $user->delete();
            $result = [
                'success' => true,
            ];

            // $this->log->deleteRequisitionLog($id);
         
            //Create log 
            $this->log->actionActivityLog($user->id, 'App\Models\Requisition', "Delete Requisition");
    
        }else{
            $result = [
                'success' => false,
            ];
        }
        
        

        return response()->json($result);
    }

    public function getCompanyMangers(Request $request){
        
        
        if(isset($request->company_requisition_id)){
            $requisition = Requisition::findOrFail($request->company_requisition_id);
            $recruiterId = $requisition->recruiter_id;
             
        }elseif(!isset($request->company_requisition_id)){
            $recruiterId = $request->company_recruiter_id;
        }
        $company = $this->hiringManger->getMangersBasedOnRecruiterId($recruiterId); 
        

        return response()->json([
            'msg' => 'Get Hiring Manager success',
            'hiringManager' => !empty($company->getCompanyManagers) ? $company->getCompanyManagers : [],
            'companyDetails' => $company
        ]);
    }
    
    
}
