<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use App\Models\ClientRequisition;
use App\Services\HiringManager;
use App\Models\ClientCompany;
use Illuminate\Support\Facades\Mail;
use App\Models\Requisition;
use App\Mail\NewClientCompanyNotifyMail;
use Illuminate\Support\Facades\Auth;
use App\Models\ClientHiringManager;
use App\Models\Notifications;

class ClientController extends Controller
{
    
    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */

    protected $hiringManager;

    public function __construct(HiringManager $hiringManager) {
        $this->hiringManager = $hiringManager;
    }

    public function postIndex(Request $request){

        $this->validate($request, [

            'company_name' => 'required|unique:clients',
            'company_type' => 'required',
            'company_website' => '',
            'hours_of_operations' => '',
            'year_in_business' => '',
            'primary_contact_title' => '',
            'phone' => '',
            'email' => '',
            'Corp/Primary Address' => '',
            'Locations' => '',
        ]);
        
        $user = new User;
        $user->firstname = $request->company_name;
        $user->lastname = $request->company_type;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = 'password';
        $user->user_role = 'client';
        $user->address = !empty($request->locations) ? $request->locations : '';
        $user->company_name = !empty($request->company_name) ? $request->company_name : ''; 
        $user->company_type = !empty($request->company_type) ? $request->company_type : '';
        $user->company_website = !empty($request->company_website) ? $request->company_website : '';
        $user->hours_of_operations = !empty($request->hours_of_operations) ? $request->hours_of_operations : '';
        $user->year_in_business = !empty($request->year_in_business) ? $request->year_in_business : '';
        $user->address_type = !empty($request->address_type) ? $request->address_type : '';
        $user->primary_contact_title = !empty($request->primary_contact_title) ? $request->primary_contact_title : '';

        $user->save();

        $this->hiringManager->createManager($request , $user->id);

        return response()->json([
            'msg' => 'Client created successfully',
        ]);
        
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
                $q->where('name', 'like', '%'.$filters['search'].'%')->orWhere('email', 'like', '%'.$filters['search'].'%')->where('user_role','client');
            } else {
                $q->where('user_role','client'); 
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

    public function get(Request $request, $id)
    {
        $user = User::with(['getClientManager'])->findOrFail($id);
        
        $result = [
            'data' => $user,
        ];

        return response()->json($result);
    }

    public function getListCompanies(Request $request)
    {
        $companies=ClientCompany::whereIn('client_id',function ($query) {
            $query->select('id')->from('users');
        })->get();
        // dd(count($companies));
        $result = [
            'data' => $companies,
        ];

        return response()->json($result);
    }

    public function put(Request $request, $id) {
        
        $clientCompany = ClientCompany::findOrFail($id);

        $this->validate($request, [

            'company_name' => 'required',
            'company_type' => 'required',
            'company_website' => 'required',
            'hours_of_operations' => 'required',
            'year_in_business' => 'required',
            'primary_contact_title' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'address_type' => 'required',
            'locations' => 'required',
            'client_id' => 'required',
            'recruiter_id' => 'required',
            'account_executive_id' => 'required',
        ]);
        
        $clientName = $this->getClientCommon($request, $request->client_id);
       
        $clientCompany = ClientCompany::findOrFail($id);
        
        $clientCompany->email = $request->email;
        $clientCompany->phone = $request->phone;
        $clientCompany->client_id = $request->client_id;
        $clientCompany->recruiter_id = $request->recruiter_id;
        $clientCompany->account_executive_id = $request->account_executive_id;
        $clientCompany->company_name = !empty($request->company_name) ? $request->company_name : ''; 
        $clientCompany->company_type = !empty($request->company_type) ? $request->company_type : '';
        $clientCompany->company_website = !empty($request->company_website) ? $request->company_website : '';
        $clientCompany->hours_of_operations = !empty($request->hours_of_operations) ? $request->hours_of_operations : '';
        $clientCompany->year_in_business = !empty($request->year_in_business) ? $request->year_in_business : '';
        $clientCompany->address_type = !empty($request->address_type) ? $request->address_type : '';
        $clientCompany->primary_contact_title = !empty($request->primary_contact_title) ? $request->primary_contact_title : '';
        $clientCompany->primary_contact_name = !empty($clientName->primary_contact_name) ? $clientName->primary_contact_name : '';
        $clientCompany->locations = $request->locations;
        $clientCompany->description = $request->description;
        $clientCompany->save();

        $this->hiringManager->editManager($request , $clientCompany->id);

        
        
        $clientUser = User::find($request->client_id);
        $recruiterUser = User::find($request->recruiter_id);
        $accountExecutiveUser = User::find($request->account_executive_id);
        if($clientUser){
            Mail::to($clientUser->email)->send(new NewClientCompanyNotifyMail($clientCompany,  true, $clientUser));
        }
        if($recruiterUser){
            Mail::to($recruiterUser->email)->send(new NewClientCompanyNotifyMail($clientCompany,  true, $clientUser));
        }
        if(isset($request->hiring_manager_email) && $request->hiring_manager_email != ''){
            Mail::to($request->hiring_manager_email)->send(new NewClientCompanyNotifyMail($clientCompany,  true, $clientUser));
        }
        if($accountExecutiveUser){
            Mail::to($accountExecutiveUser->email)->send(new NewClientCompanyNotifyMail($clientCompany,  true, $clientUser));
        }



        return response()->json([
            'msg' => 'Company created successfully',
        ]);
        
    }

    public function delete(Request $request, $id) {
        
        $clientCompany = ClientCompany::findOrFail($id);
        $companyHiringManager = ClientHiringManager::where('company_id',$id)->delete();
        $clientCompany->delete();

        $result = [
            'success' => true,
        ];

        return response()->json($result);
    }


    public function clientRoleput(Request $request, $id) {
        
        $user = User::findOrFail($id);
        $rules = [
            // 'name' => 'required',
            'email' => 'unique:users,email,'.$user->id,
            'phone' => 'required',
            
        ];

        // if($user->name != $request->name){
        //     $rules['name'] = 'required|unique:users';
        // }

        $this->validate($request, $rules);
        
        if($request->hasfile('File')) {
            
            if($request->file('File') ) {
                $file = $request->file('File');
                $fileOriginalName = $file->getClientOriginalName();
                $newFileName = time().$fileOriginalName;
                $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
            }

            $fileModel = new File;        
            $fileModel->filename = $newFileName;
            $fileModel->fileable_id = $id;
            $fileModel->fileable_type = 'App\Models\User';
            $fileModel->created_at = time();
            $fileModel->updated_at = time();
            $fileModel->save();
        }
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone = $request->phone;
        
        $user->address = !empty($request->address) ? $request->address : '';
        $user->company_name = !empty($request->company_name) ? $request->company_name : ''; 
        
        $user->photo_url = $newFileName;
        $user->file_table_image_id = $fileModel->id;

        $user->save();

        $result = [
            'success' => true,
            'id' => $user->id,
        ];

        return response()->json([
            'msg' => 'Client Updated successfully',
        ]);
    }

    public function clientRequisitions(Request $request){
          
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
         
        $requisition = Requisition::with(['getRecruiter','getCandidateJobs'])->where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $companyRecruiter = ClientCompany::where('client_id',\Auth::user()->id)->first();
                $q->where('recruiter_id',$companyRecruiter->recruiter_id)->where('title', 'like', '%'.$filters['search'].'%');
            } else {

                $companyRecruiter = ClientCompany::where('client_id',\Auth::user()->id)->first();
                $q->where('recruiter_id',$companyRecruiter->recruiter_id); 
           
            }
        });

        if ($sorter !== null) {
            $requisition = $requisition->orderBy($sorter, $ascDirection);
        }
        $total_count = $requisition->count();

        $requisition = $requisition->limit($pageSize)->offset($current_num)->get();
        
        
        $requisition[0]->recruiter = $requisition[0]->getRecruiter->firstname;
        
        $result = [
            'data' => $requisition,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function postHiringManager(Request $request ){
        
        $rules = [
            'hiring_manager_name' => 'required',
            'hiring_manager_title' => 'required',
            'hiring_manager_phone' => 'required',
            'hiring_manager_email' => 'required|unique:client_hiring_managers',
            'contact_info_name' => 'required',
            'contact_info_email' => 'required',
            'contact_info_phone' => 'required',
            'contact_info_address' => 'required',
            'contact_info_city' => 'required',
            'contact_info_state' => 'required',
            'contact_info_zip' => 'required',
            
        ];

        $this->validate($request, $rules);

        $this->hiringManager->createManager($request , $request->client_id);
                

        return response()->json([
            'msg' => 'Client Hiring Manager created successfully',
        ]);
    }

    public function getHiringManagers(Request $request ){
        
        $result = $this->hiringManager->getHiringManagers($request);
          
        return response()->json($result);
    }

    public function getHiringManager($id){
        
        $hiringManager = $this->hiringManager->getHiringManager($id);
        
        $result = [
            'data' => $hiringManager,
        ];

        return response()->json($result);
    }

    public function putHiringManager(Request $request , $id){
        
        $hiringManager = $this->hiringManager->putHiringManager($request , $id);

        $result = [
            'success' => true,
            'id' => $hiringManager->id,
        ];

        return response()->json([
            'msg' => 'Client Hiring Manager updated successfully',
        ]);
    }

    public function deleteHiringManager($id){

        $hiringManager = $this->hiringManager->deleteHiringManager($id);
        
        $result = [
            'success' => true,
        ];

        return response()->json($result);        
    }

    public function postClient(Request $request){
        
        $this->validate($request, [

            'company_name' => 'required|unique:client_companies',
            'company_type' => 'required',
            'company_website' => 'required',
            'hours_of_operations' => 'required',
            'year_in_business' => 'required',
            'primary_contact_title' => 'required',
            
            'location' => 'required',
            'recruiter_id' => 'required',
            // 'client_id' => 'required',
            'account_executive_id' => 'required'
        ]);

        
        $clientName = $this->getClientCommon($request, $request->client_id = '');
        

        $clientCompany = new ClientCompany;

        $clientCompany->client_id = !empty($request->client_id) ? $request->client_id : 0 ;
        $clientCompany->recruiter_id = $request->recruiter_id;
        $clientCompany->account_executive_id = $request->account_executive_id;
        $clientCompany->company_name = !empty($request->company_name) ? $request->company_name : ''; 
        $clientCompany->company_type = !empty($request->company_type) ? $request->company_type : '';
        $clientCompany->company_website = !empty($request->company_website) ? $request->company_website : '';
        $clientCompany->hours_of_operations = !empty($request->hours_of_operations) ? $request->hours_of_operations : '';
        $clientCompany->year_in_business = !empty($request->year_in_business) ? $request->year_in_business : '';
        $clientCompany->address_type = !empty($request->address_type) ? $request->address_type : '';
        $clientCompany->primary_contact_title = !empty($request->primary_contact_title) ? $request->primary_contact_title : '';
        $clientCompany->primary_contact_name = !empty($clientName->firstname) ? $clientName->firstname : '';
        $clientCompany->location = $request->location;
        $clientCompany->description = $request->description;
        $clientCompany->email = $request->email;
        $clientCompany->phone = $request->phone;
        $clientCompany->save();
        $companyId = $clientCompany->id;
        
        $this->hiringManager->createManager($request , $companyId = 0);
        // if(!empty($clientCompany)){
        //     $receivers = [];
        //     $clientUser = User::find($request->client_id);
        //     $recruiterUser = User::find($request->recruiter_id);
        //     $accountExecutiveUser = User::find($request->account_executive_id);

        //     $receivers = [$request->client_id , $request->recruiter_id , $request->account_executive_id];
        //     Mail::to($request->email)->send(new NewClientCompanyNotifyMail($clientCompany, true , $clientUser));
        //     if($clientUser){
        //         Mail::to($clientUser->email)->send(new NewClientCompanyNotifyMail($clientCompany, true, $clientUser));
        //     }
        //     if($recruiterUser){
        //         Mail::to($recruiterUser->email)->send(new NewClientCompanyNotifyMail($clientCompany, true , $clientUser));
        //     }
        //     if(isset($request->hiring_manager_email) && $request->hiring_manager_email != ''){
        //         Mail::to($request->hiring_manager_email)->send(new NewClientCompanyNotifyMail($clientCompany,true , $clientUser));
        //     }
        //     if($accountExecutiveUser){
        //         Mail::to($accountExecutiveUser->email)->send(new NewClientCompanyNotifyMail($clientCompany, true , $clientUser));
        //     }
        // }

        

        // foreach($receivers as $receiver){

        //     $notifications = new Notifications;

        //     $notifications->sender_id = \Auth::user()->id;
        //     $notifications->user_id = $receiver;
        //     $notifications->seen_status = 0;
        //     $notifications->message = "Admin Associate you with ".$request->company_name;
        //     $notifications->created_at = time();
        //     $notifications->updated_at = time();
        //     $notifications->save();
        // }

        return response()->json([
            'msg' => 'Company created successfully',
        ]);
        
    }

    public function getClients(Request $request) {
        // dd($request);
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        
        $clientCompany = ClientCompany::where(function($q) use($filters){
            if($filters !== null && count($filters)){

                $q->where('company_name', 'like', '%'.$filters['search'].'%')->orWhere('email', 'like', '%'.$filters['search'].'%');

            } else {
                $q; 
            }
        })->latest();

        if ($sorter !== null) {
            $clientCompany = $clientCompany->orderBy($sorter, $ascDirection);
        }
        $total_count = $clientCompany->count();

        $clientCompany = $clientCompany->limit($pageSize)->offset($current_num)->get();
        
        $result = [
            'data' => $clientCompany,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function getCompany(Request $request, $id) {
        
        $user = ClientCompany::with(['getClientManager','getCompanyRecruiterName','getCompanyAccountExecutiveName'])->findOrFail($id);
        $user->hiring_manager_name = $user->getClientManager->hiring_manager_name;
        $user->hiring_manager_title = $user->getClientManager->hiring_manager_title;
        $user->hiring_manager_phone = $user->getClientManager->hiring_manager_phone;
        $user->hiring_manager_email = $user->getClientManager->hiring_manager_email;
        $user->contact_info_name = $user->getClientManager->contact_info_name;
        $user->contact_info_email = $user->getClientManager->contact_info_email;
        $user->contact_info_phone = $user->getClientManager->contact_info_phone;
        $user->contact_info_address = $user->getClientManager->contact_info_address;
        $user->contact_info_city = $user->getClientManager->contact_info_city;
        $user->contact_info_state = $user->getClientManager->contact_info_state;
        $user->contact_info_zip = $user->getClientManager->contact_info_zip;
        $user->recruiter_name = $user->getCompanyRecruiterName->firstname;

        $user->firstname = $user->getCompanyAccountExecutiveName->firstname;
        
        $result = [
            'data' => $user,
        ];

        return response()->json($result);
    }

    public function getClientCommon(Request $request, $id) {
        if($id != ''){
            $client = User::findOrFail($id);
        }else{
            $client = '';
        }
        
        return $client;
    }

    public function getClientRecruiters(){
        $recruiters = User::where('user_role','recruiter')->get();
        return $recruiters;
    }

    public function getRecruiter($id){
        
        try{
            $companyRecruiter = ClientCompany::with(['getCompanyRecruiterName'])->where('client_id',$id)->first();
            
            if($companyRecruiter == null){
                
                return response()->json([
                    'success' => false,
                    'msg' => "Company is not assigned to you from Admin",
                ],500);    
            }
            
            $companyRecruiter->recruiter_firstname = $companyRecruiter->getCompanyRecruiterName->firstname;
            
            return $companyRecruiter;
        
        } catch(Exception $ex){
            return response()->json([
                'success' => false,
                'msg' => $ex,
            ],$ex->getCode());
        }
        
    }

    public function getExecuitve(){

        $executives = User::where('user_role','account_executive')->get();
        return $executives;
    }

}
