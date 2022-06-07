<?php

namespace App\Services;

use App\Models\Activity;

class Activities {
    
    public function addActivity($clientRecordId, $message, $action){
        $activityData = [];

        $activity = new Activity();
        $activity->client_record_id = $clientRecordId;
        $activity->action = $action;
        $activity->	user_role = \Auth::user()->user_role;
        $activity->user_id = \Auth::id();
        $activity->message = $message.' by '.\Auth::user()->user_role;
        $activity->activityable_id = $clientRecordId;
        $activity->activityable_type = "App\Models\ClientRecord";
        $activity->save();
        return; 
    }

    

}

?>