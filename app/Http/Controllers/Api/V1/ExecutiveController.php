<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notifications;

class ExecutiveController extends Controller {
    
    public function getCompanyAssociationExecutiveNotificationDetails(){
        $notification = Notifications::where('user_id', \Auth::user()->id)->where('seen_status' , 0)->get();

        $result = [
            'data' => $notification,
        ];
        return response()->json($result);
    }

    public function companyAssociationExecutiveNotificationStatusRead(){
        $notifications = Notifications::where('user_id', \Auth::user()->id)->where('seen_status' , 0)->get();

        foreach($notifications as $notification){
            
            $notification->seen_status = 1;
            $notification->save();
        }
        

        $result = [
            'success' => true,
        ];

        $this->getCompanyAssociationExecutiveNotificationDetails();

        return response()->json($result);
    }
}

