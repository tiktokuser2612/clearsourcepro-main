<?php

namespace App\Services;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use DB;
class ActivityLogs {
    
    public function loginActivity($user){
        DB::beginTransaction();
        try{
            $activity = new Log();
            $activity->user_id = $user->id;
            $activity->action = 'sign_in';
            $activity->user_role = $user->user_role;
            $activity->login_activity = true;
            $activity->logactivtyable_id = $user->id;
            $activity->logactivtyable_type = "App\Models\User";
            $activity->login_time = date('Y-m-d H:i:s');
            $activity->logout_time = NULL;
            $activity->save();
            DB::commit();
            return response()->json([
                'msg' => 'Log created successfully',
            ]);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json([
                'msg' => $e->getMessage(),
            ]);
        }

        
    }

    public function logoutActivity($user){
       
        
            $activity = new Log();
       
            $activity->user_id = $user->id;
            $activity->action = 'sign_out';
            $activity->user_role = $user->user_role;
            $activity->login_activity = false;
            $activity->logactivtyable_id = $user->id;
            $activity->logactivtyable_type = "App\Models\User";
            $activity->login_time = NULL;
            $activity->logout_time = date('Y-m-d H:i:s');
            $activity->save();
            
            
        
    }
    public function actionActivityLog($logactivtyable_id, $logactivtyable_type, $action){
        DB::beginTransaction();
        try{
            $user = Auth::user();
            if($user){
                $activity = new Log();
       
                $activity->user_id = $user->id;
                $activity->action = $action;
                $activity->user_role = $user->user_role;
                $activity->login_activity = true;
                $activity->logactivtyable_id = $logactivtyable_id;
                $activity->logactivtyable_type = $logactivtyable_type;
                // $activity->login_time = $activity->login_time;
                // $activity->logout_time = NULL;
                $activity->save();
            
            
                DB::commit();
                return response()->json([
                    'msg' => 'Log created successfully',
                ]);
            }
            
        }catch(\Exception $e){
            DB::rollback();
            return response()->json([
                'msg' => $e->getMessage(),
            ]);
        }
    }

    public function recruisitionCreateLog($requisitionId){
        DB::beginTransaction();
        try{
        $activity = new Log();
        $activity->user_role = 'client';
        $activity->user_id = \Auth::user()->id;
        $activity->login_activity = 1;
        // $activity->login_time = '';
        // $activity->logout_time = '';
        $activity->logactivtyable_type = "App\Models\Requisition";
        $activity->logactivtyable_id = $requisitionId;
        $activity->action = "Create Requisition";
        $activity->updated_at = time();
        $activity->created_at = time();
        $activity->save();
        DB::commit();
            return response()->json([
                'msg' => 'Log created successfully',
            ]);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json([
                'msg' => $e->getMessage(),
            ]);
        }
    }

    public function recruisitionEditLog($requisitionId){
        
        $activity = new Log();
        $activity->user_role = 'client';
        $activity->user_id = \Auth::user()->id;
        $activity->login_activity = 1;
        // $activity->login_time = '';
        // $activity->logout_time = '';
        $activity->logactivtyable_type = "App\Models\Requisition";
        $activity->logactivtyable_id = $requisitionId;
        $activity->action = "Edit Requisition";
        $activity->updated_at = time();
        $activity->created_at = time();
        $activity->save();
    }

    public function deleteRequisitionLog($id){

        $activity = new Log();
        $activity->user_role = 'client';
        $activity->user_id = \Auth::user()->id;
        $activity->login_activity = 1;
        // $activity->login_time = '';
        // $activity->logout_time = '';
        $activity->logactivtyable_type = "App\Models\Requisition";
        $activity->logactivtyable_id = $id;
        $activity->action = "Delete Requisition";
        $activity->updated_at = time();
        $activity->created_at = time();
        $activity->save();

    }


    public function addLogActivity($user, $message, $action,$logactive,$requisitionId){
        $activity = new Log();
        $activity->user_role = $user->user_role;
        $activity->user_id   = $user->id;
        $activity->login_activity = 1;
        $activity->logactivtyable_type = $logactive;
        $activity->logactivtyable_id = $requisitionId;
        $activity->message = $message;
        $activity->action = $action;
        $activity->updated_at = time();
        $activity->created_at = time();
        $activity->save();
        return; 
    }

}

?>