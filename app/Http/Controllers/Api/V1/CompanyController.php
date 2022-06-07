<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\HiringManager;
use App\Models\User;
use App\Services\Files;
use App\Services\Resumes;
use App\Models\ClientCompany;
use App\Models\CompanyRecruiter;
use App\Models\ClientHiringManager;
use App\Models\Requisition;

class CompanyController extends Controller {
    
    protected $file;
    public function __construct(HiringManager $hiringManger , Files $file, Resumes $resumes) {
        $this->hiringManger = $hiringManger;
        $this->file = $file;
        $this->resumes = $resumes;
    }

    public function getCompanyManagers(Request $request){
        
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

    public function getCompanyClientAccountDetails($id){
        
        $companyClient = User::with(['files'])->where('id', $id)->first();
        
        if(!empty($companyClient->files)){
            $companyClient->user_image = $companyClient->files[0]->filename;
        }
        
        return response()->json([
            'msg' => 'Get Client user Data Success',
            'data' => $companyClient
        ]);
    }

    public function putCompanyClientAccountDetails(Request $request){
        
        $companyClient = User::where('id',$request->user_id)->first();

        $validation_rules = [
            'email' => 'required|email',
            'firstname' => 'required',
            'lastname' => 'required',
            'username' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ];

        $this->validate($request, $validation_rules);

        $fileModelId = $this->file->uploadUserImage($request, "App\Models\User");

        $companyClient->firstname = $request->firstname;
        $companyClient->lastname = $request->lastname;
        $companyClient->username = $request->username;
        // $companyClient->photo_url = $request->
        $companyClient->file_table_image_id = $fileModelId; 
        $companyClient->email = $request->email;

        $companyClient->password = bcrypt($request->password);
        $companyClient->phone = $request->phone;
        $companyClient->address = $request->address;
        $companyClient->zip = $request->zip;
        $companyClient->city = $request->city;
        $companyClient->state = $request->state;
        $companyClient->save();
    }

    public function getCompanyRecruiterListing(Request $request){

        
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        
        $companyRecruiters = CompanyRecruiter::where('company_id',$request->filters['company_id'])->get();
        
        if(!empty($companyRecruiters)){
            $recriterIds = [];
            foreach($companyRecruiters as $companyRecruiters){
                $recriterIds[] = $companyRecruiters->recruiter_id;
            }
        }else{
            return response()->json([
                'success' => false,
                'msg' => 'No recruiter found',
            ],404);
        }
        
        $filters = $recriterIds;
        
        $users = User::where(function($q) use($filters){
            if($filters !== null && count($filters)){
                
                $q->whereIn('id', $filters)->where('user_role','recruiter');
            } else {
                $q->where('user_role','recruiter'); 
            }
        });

        if ($sorter !== null) {
            $users = $users->orderBy($sorter, $ascDirection);
        }else{
            $users = $users->orderBy('id', 'DESC');
        }

        
        $total_count = $users->count();

        $users = $users->limit($pageSize)->offset($current_num)->get();

        $result = [
            'data' => $users,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function getCompanyRecruiter($id){
        
        $companyRecruiters = CompanyRecruiter::with('companyRecruiter')->where('company_id',$id)->get();
        
        $recruiters = [];
        if(empty($companyRecruiters)){
            $recruiters = []; 
            $msg = "No Data found";
        }else{
            $msg = "Get Client user Data Success";
            foreach($companyRecruiters as $companyRecruiters){
                $recruiters[] = $companyRecruiters->companyRecruiter;
            }
        }

        return response()->json([
            'msg' => $msg,
            'recruiters' => $recruiters
        ]);
    }

    public function postCompanyRecruiterDetails(Request $request){
        
        // dd($request);
        $validation_rules = [
            'email' => 'required|email',
            'firstname' => 'required',
            'lastname' => 'required',
            'user_name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ];

        $this->validate($request, $validation_rules);

        $user = new User;
        $user->firstname = isset($request->firstname) ? $request->firstname : '';
        $user->lastname = isset($request->lastname) ? $request->lastname : '';        
        $user->user_role = 'recruiter';
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
        $user->save();

        $companyRecruiter = new CompanyRecruiter;

        $companyRecruiter->company_id = $request->company_id;
        $companyRecruiter->recruiter_id = $user->id;
        $companyRecruiter->save();

        if($request->hasfile('File')){
            $this->resumes->uploadDoc( $request, 'App\Models\User' , $user->id);
        }
        return response()->json([
            'msg' => 'Recruiter created successfully',
        ]);
    }

    public function editCompanyRecruiterDetails(Request $request , $id){
        
        $user = User::findOrFail($id);

        $rules = [
            'firstname' => 'required',
            'lastname' => 'required',
            // 'user_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ];
        // if($user->username != $request->user_name){
        //     $rules['user_name'] = 'required|unique:users';
        // }

        $this->validate($request, $rules);
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->username = $request->user_name;
        
        $user->email = $request->email;
        if (!empty($request->password)) {
            $user->password = bcrypt($request->password);
        }
        $user->phone = $request->phone;
        $user->user_role = 'recruiter';
        $user->address = $request->address;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;
        $user->save();
        
        if($request->hasfile('File')){
            $this->resumes->uploadDoc( $request, 'App\Models\User' , $id);
        }
        
        $result = [
            'success' => true,
            'id' => $user->id,
        ];
        return response()->json($result);
    }

    public function deleteCompanyRecruiterDetails($id){
        
        $companyRecruiter = CompanyRecruiter::where('recruiter_id',$id)->first();
        $companyRecruiter->delete();

        $result = [
            'success' => true,
        ];

        return response()->json($result);
    }

    public function getMangersForRequisitions($id){
        
        $managers = ClientHiringManager::where('company_id',$id)->get();
        if(!empty($managers)){
            $msg = "Get Manager success";
        }else{
            $managers = [];
            $msg = "Managers is not assigned to company";
        }

        $result = [
            'success' => true,
            'managers' => $managers,
            'msg' => $msg
        ];

        return response()->json($result);
    }

    public function getCompanyRequisitions(Request $request){

        // dd($request);
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
       
        $requisition = Requisition::with(['getRecruiter' , 'getOtherRecruiter'])->where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('company_id',$filters['company_id']);
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

        if(empty($requisition)){
            $requisition = [];
            $total_count = 0;
            $current_page = 1;
        }
        $result = [
            'data' => $requisition,
            'total' => $total_count,
            'current' => $current_page,
        ];
        
        return response()->json($result);
    }
}
