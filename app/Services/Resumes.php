<?php

namespace App\Services;

use App\Models\Resume;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use App\Models\Requisition;

class Resumes {
    
    public function upload($data , $userId , $model_id){

        $fileNameArr = [];
        if($data->hasfile('File')) {

            foreach($data->file('File') as $file) {
                
                $fileOriginalName = $file->getClientOriginalName();
                $newFileName = time().$fileOriginalName;
                $fileNameArr[] = $newFileName;
                $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
            }

            if($model_id == 1){
                $model = "App\Models\User";
            }else if($model_id == 2){
                $model = "App\Models\Requisition";
            }
            $fileIds = [];
            
            foreach($fileNameArr as $fileName){
                $file = new File;
                $file->filename = $fileName;
                $file->fileable_id = $userId;
                $file->fileable_type = $model;
                $file->created_at = time();
                $file->updated_at = time();
                $file->save();
                $fileIds[$file->id] = $fileName;
            }
    
            foreach($fileIds as $fileId => $file_name){
                
                $resume = new Resume;
                $resume->user_id = \Auth::id();
                $resume->user_role = \Auth::user()->user_role;
                $resume->jobvite_resume_id = isset($data->jobvite_resume_id) ? $data->jobvite_resume_id : null;
                $resume->resume_filepath = $file_name;
                $resume->resumeable_id = $userId;
                $resume->resumeable_type = $model;
                $resume->local_file_table_id = $fileId;
                $resume->created_at = time();
                $resume->updated_at = time();
                $resume->save();
            }
        }
        
        return;
    }

    public function editUpload($data , $userId , $model_id){
        
        $fileNameArr = [];
        if($data->hasfile('File')) {

            foreach($data->file('File') as $file) {
                
                $fileOriginalName = $file->getClientOriginalName();
                $newFileName = time().$fileOriginalName;
                $fileNameArr[] = $newFileName;
                $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
            }

            if($model_id == 1){
                $model = "App\Models\User";
            }else if($model_id == 2){
                $model = "App\Models\Requisition";
            }
    
            $fileIds = [];
            
            File::where('fileable_id',$userId)->delete();
            
            foreach($fileNameArr as $fileName){
                $file = new File;
                $file->filename = $fileName;
                $file->fileable_id = $userId;
                $file->fileable_type = $model;
                $file->created_at = time();
                $file->updated_at = time();
                $file->save();
                $fileIds[$file->id] = $fileName;
            }    
            
            Resume::where('resumeable_id',$userId)->delete();

            $ch = curl_init("http://www.example.com/");
            $fp = fopen("example_homepage.txt", "w");

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, 0);

            curl_exec($ch);
            if(curl_error($ch)) {
                fwrite($fp, curl_error($ch));
            }
            curl_close($ch);
            fclose($fp);
            
            foreach($fileIds as $fileId => $file_name){
                
                $resume = new Resume;
                $resume->user_id = \Auth::id();
                $resume->user_role = \Auth::user()->user_role;
                $resume->jobvite_resume_id = isset($data->jobvite_resume_id) ? $data->jobvite_resume_id : null;
                $resume->resume_filepath = $file_name;
                $resume->resumeable_id = $userId;
                $resume->resumeable_type = $model;
                $resume->local_file_table_id = $fileId;
                $resume->created_at = time();
                $resume->updated_at = time();
                $resume->save();
            }
        }
        
        return;
    }

    public function uploadDoc($data, $modelName , $modelId){
        
        if($data->hasfile('File')) {
                
            $file = $data->file('File');
            $fileOriginalName = $file->getClientOriginalName();
            $newFileName = time().$fileOriginalName;
            $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
        

            $fileModel = new File;        
            $fileModel->filename = $newFileName;
            $fileModel->fileable_id = $modelId;
            $fileModel->fileable_type = $modelName;
            $fileModel->created_at = time();
            $fileModel->updated_at = time();
            $fileModel->save();    
            
            return $fileModel->id;    
        } 
    }

}

?>