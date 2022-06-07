<?php

namespace App\Services;

use App\Models\User;

class Jobvite {
    
    //Post Requsition on Jobvite platform

    public function postJob($data){
        
        
        $ch = curl_init("https://api.jvistg2.com/api/v2/job?api=clearsourcerpo_api_key&sc=1f3e505d84a335252880002a91bbc94c");
        
        if(\Auth::user()->user_role == "admin"){
            $requisitionEmployeeEmail = 'soheardpma@gmail.com';
        }else{
            $requisitionEmployeeEmail = \Auth::user()->email;
        }
        
        // dd($requisitionEmployeeEmail);
        $data = [
                "creatorEmail" => $requisitionEmployeeEmail,
                "briefDescription" => $data->brief_description,
                "description" => $data->description,
                "title" => $data->title        
        ];
         
        $payload = json_encode($data);
        
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            )
        );
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Submit the POST request
        $result = curl_exec($ch);
        // Close cURL session handle
        curl_close($ch);
        return $result;
    }

    //PUT Requisition API Sample API Request: 
    
    public function putJob($data, $id){
        
        $ch = curl_init("https://api.jvistg2.com/api/v2/job?api=clearsourcerpo_api_key&sc=1f3e505d84a335252880002a91bbc94c");
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

    //GET Requisition API Sample API Request: 
    
    public function getjob(){
      
        $url = 'https://api.jvistg2.com/api/v2/job?api=clearsourcerpo_api_key&sc=1f3e505d84a335252880002a91bbc94c&start=1';
        $ch = curl_init();
        
        // Attach encoded JSON string to the POST fields
        curl_setopt($ch, CURLOPT_URL, $url);

        // Set the content type to application/json
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

        // Return response instead of outputting
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute the POST request
        $result = curl_exec($ch);
        // Close cURL resource
        curl_close($ch);

        return $result;
    }


}

?>