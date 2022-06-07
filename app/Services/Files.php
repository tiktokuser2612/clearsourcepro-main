<?php

namespace App\Services;

use App\Models\ClientCompany;
use Illuminate\Support\Facades\Storage;
use App\Models\File;


class Files {

    public function uploadUserImage($data , $modelName){

        if ($data->hasfile('File')) {
            
            
            $fileObj = File::where('fileable_id',$data->user_id)->where('fileable_type',$modelName)->first();
            
            if(!empty($fileObj)){
                $fileObj->delete();
            }
            
            $file = $data->file('File');
            $fileOriginalName = $file->getClientOriginalName();
            $newFileName = time().$fileOriginalName;
            $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
        
        
            $fileModel = new File;        
            $fileModel->filename = $newFileName;
            $fileModel->fileable_id = $data->user_id;
            $fileModel->fileable_type = $modelName;
            $fileModel->created_at = time();
            $fileModel->updated_at = time();
            $fileModel->save();    
            return $fileModel->id;    
        }
    }

}


?>