<?php

namespace App\Services;

use App\Models\User;

class JobViteEmployee {

    public function createJobViteEmployee($data){

        
        if($data->user_role != 'candidate' && $data->user_role != 'admin'){

            try{

                $ch = curl_init("https://api.jvistg2.com/api/v2/employee?api=".env('CLEARSOURCE_API')."&sc=".env('CLEARSOURCE_SECRET_KEY')."&userEmail=".env('CLEARSOURCE_ADMIN_EMAIL'));
            
                $data = [
                    "settings" => [
                        "sendInviteEmailToEmployees" => true
                    ],   
                    "firstName"     => $data->firstname,
                    "lastName"      => $data->lastname,
                    "address2"      => "Apt A",
                    "address"       => $data->address,
                    "email"         => $data->email,
                    "role"          => "Employee",
                    "title"         => "Architect",
                    "city"          => $data->city,
                    "state"         => $data->state,
                    "postalCode"    => $data->zip,
                    "mobile"        => $data->phone
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
                
                curl_close($ch);
                
                return json_decode($result);
    
            }catch(\Exception $e){
                
                return json_decode($e->getMessage());
            
            }
            
        }
    }

    public function editJobviteEmployee($data, $jvEmployeeId){
              
        if($data->user_role != 'candidate' && $data->user_role != 'admin'){
            
            try{

                $ch = curl_init("https://api.jvistg2.com/api/v2/employee/".$jvEmployeeId."?api=".env('CLEARSOURCE_API')."&sc=".env('CLEARSOURCE_SECRET_KEY')."&userEmail=".env('CLEARSOURCE_ADMIN_EMAIL'));
            
                $data = [
                    "settings" => [
                        "sendInviteEmailToEmployees" => true,
                        "restoreDeletedUsers" => true
                    ],   
                    "firstName"     => $data->firstname,
                    "lastName"      => $data->lastname,
                    "employeeId"    => $jvEmployeeId,
                    "email"         => $data->email,
                ];
                
                $payload = json_encode($data);
               
                 // Attach encoded JSON string to the POST fields
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                
                // Set the content type to application/json
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

                curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            
                // Submit the POST request
                $result = curl_exec($ch);
                
                curl_close($ch);
                
                return json_decode($result);
    
            }catch(\Exception $e){
                return json_decode($e->getMessage());
            }
            
        }
    }

    public function getJobviteEmployeeDetails($data){

        if($data->user_role != 'candidate' && $data->user_role != 'admin'){
            $email = $data->email;
            
            try{

                $ch = curl_init(env('JOBVITE_STAGE_URL')."employee/?api=".env('CLEARSOURCE_API')."&sc=".env('CLEARSOURCE_SECRET_KEY')."&userEmail=".env('CLEARSOURCE_ADMIN_EMAIL')."&email=".$email);
                
                // https://api.jvistg2.com/api/v2/employee?api=".env('CLEARSOURCE_API')."&sc=".env('CLEARSOURCE_SECRET_KEY')."&userEmail=".CLEARSOURCE_ADMIN_EMAIL."&email=".
                
                
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            
                $result = curl_exec($ch);
                
                curl_close($ch);
        
                return json_decode($result);
    
            }catch(\Exception $e){
                return json_decode($e->getMessage());
            }
            
        }

    }
}


?>