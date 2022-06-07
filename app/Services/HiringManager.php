<?php

namespace App\Services;

use App\Models\ClientHiringManager;
use Illuminate\Support\Facades\Auth;
use App\Models\ClientCompany;
class HiringManager {

    public function createManager($data , $companyId){

        $clientHiringManager = new ClientHiringManager;
        
        $clientHiringManager->hiring_manager_name = $data->hiring_manager_name ;
        $clientHiringManager->hiring_manager_title = $data->hiring_manager_title ;
        $clientHiringManager->hiring_manager_phone = $data->hiring_manager_phone ;
        $clientHiringManager->hiring_manager_email = $data->hiring_manager_email ;
        $clientHiringManager->contact_info_name = $data->contact_info_name ;
        $clientHiringManager->contact_info_email = $data->contact_info_email ;
        $clientHiringManager->contact_info_phone = $data->contact_info_phone ;
        $clientHiringManager->contact_info_address = $data->contact_info_address ;
        $clientHiringManager->contact_info_city = $data->contact_info_city ;
        $clientHiringManager->contact_info_state = $data->contact_info_state ;
        $clientHiringManager->contact_info_zip = $data->contact_info_zip ;
        // $clientHiringManager->description = $data->description ;
        $clientHiringManager->company_id = $companyId;
        $clientHiringManager->created_at = time();
        $clientHiringManager->updated_at = time();
        $clientHiringManager->save();
        return;
    }
    
    public function editManager($data , $companyId){
        
        
        $clientHiringManager = ClientHiringManager::where('company_id',$companyId)->first();
        $clientHiringManager->hiring_manager_name = $data->hiring_manager_name ;
        $clientHiringManager->hiring_manager_title = $data->hiring_manager_title ;
        $clientHiringManager->hiring_manager_phone = $data->hiring_manager_phone ;
        $clientHiringManager->hiring_manager_email = $data->hiring_manager_email ;
        $clientHiringManager->contact_info_name = $data->contact_info_name ;
        $clientHiringManager->contact_info_email = $data->contact_info_email ;
        $clientHiringManager->contact_info_phone = $data->contact_info_phone ;
        $clientHiringManager->contact_info_address = $data->contact_info_address ;
        $clientHiringManager->contact_info_city = $data->contact_info_city ;
        $clientHiringManager->contact_info_state = $data->contact_info_state ;
        $clientHiringManager->contact_info_zip = $data->contact_info_zip ;
       
        $clientHiringManager->company_id = $companyId;
        // $clientHiringManager->created_at = time();
        $clientHiringManager->updated_at = time();
        $clientHiringManager->save();
        return;
    }


    public function getHiringManagers($request){

        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        
        
        $clientHiringManagers = ClientHiringManager::where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('company_id',$filters['id']);
            } else {
                $q->where('company_id', Auth::id()); 
            }
        });

    
        if ($sorter !== null) {
            $clientHiringManagers = $clientHiringManagers->orderBy($sorter, $ascDirection);
        }
        
        $total_count = $clientHiringManagers->count();

        $clientHiringManagers = $clientHiringManagers->limit($pageSize)->offset($current_num)->get();
        
        $result = [
            'data' => $clientHiringManagers,
            'total' => $total_count,
            'current' => $current_page,
        ];
        
        return $result;
        
    }

    public function getHiringManager($id){
        $clientHiringManagers = ClientHiringManager::where('id',$id)->first();
        return $clientHiringManagers;
    }

    public function putHiringManager($data , $id){
        
        $clientHiringManager = ClientHiringManager::where('id',$data->id)->first();

        $clientHiringManager->hiring_manager_name = $data->hiring_manager_name ;
        $clientHiringManager->hiring_manager_title = $data->hiring_manager_title ;
        $clientHiringManager->hiring_manager_phone = $data->hiring_manager_phone ;
        $clientHiringManager->hiring_manager_email = $data->hiring_manager_email ;
        $clientHiringManager->contact_info_name = $data->contact_info_name ;
        $clientHiringManager->contact_info_email = $data->contact_info_email ;
        $clientHiringManager->contact_info_phone = $data->contact_info_phone ;
        $clientHiringManager->contact_info_address = $data->contact_info_address ;
        $clientHiringManager->contact_info_city = $data->contact_info_city ;
        $clientHiringManager->contact_info_state = $data->contact_info_state ;
        $clientHiringManager->contact_info_zip = $data->contact_info_zip ;
        
        $clientHiringManager->updated_at = time();
        $clientHiringManager->save();
        return $clientHiringManager;
    }

    public function deleteHiringManager( $id){
        
        $clientHiringManager = ClientHiringManager::where('id',$id)->delete();        
        return;
    }

    public function getMangersBasedOnRecruiterId($recruiterId){
        
        $companyMangers = ClientCompany::with(['getCompanyManagers'])->where('recruiter_id', $recruiterId)->first();        
        
        return !empty($companyMangers) ? $companyMangers : null;
    }
}

?>