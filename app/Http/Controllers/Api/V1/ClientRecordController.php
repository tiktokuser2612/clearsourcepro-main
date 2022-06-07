<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ClientRecord;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use App\Models\Notes;
use App\Models\Activity;
use App\Services\Activities;

class ClientRecordController extends Controller
{
    protected $activity;

    public function __construct(Activities $activity) {
        $this->activity = $activity;
    }

    public function postIndex(Request $request){
        $fileNameArr = [];
        if($request->hasfile('File')) {

            foreach($request->file('File') as $file) {
                
                $fileName = $file->getClientOriginalName();
                $fileNameArr[] = $fileName;
                $extension = $file->getClientOriginalExtension();
                $path = Storage::disk('public')->put( $fileName , file_get_contents($file->getRealPath()));  
            }
        }

        $this->validate($request, [
            'current_status' => 'required',
            'location' => 'required',
            'posting_type' => 'required',
            'salary' => 'required',
            'base_pay' => 'required',
            'hour' => 'required',
            'bonus_plan' => 'required',   
        ]);

        $clientRecord = new ClientRecord;
        $clientRecord->current_status = $request->current_status;
        $clientRecord->location = $request->location;
        $clientRecord->posting_type = $request->posting_type;
        $clientRecord->role_title = $request->role_title;
        $clientRecord->salary = $request->salary;
        
        $clientRecord->base_pay = $request->base_pay;
        $clientRecord->hour = $request->hour;
        $clientRecord->role_summary_of_candidate = $request->role_summary_of_candidate;
        $clientRecord->bonus_plan = $request->bonus_plan; 
        
        $clientRecord->created_at = time();
        $clientRecord->updated_at = time();
        $clientRecord->save();
    
        foreach($fileNameArr as $fileName){
            $file = new File;
            $file->filename = $fileName;
            $file->fileable_id = $clientRecord->id;
            $file->fileable_type = "App\Models\ClientRecord";
            $file->created_at = time();
            $file->updated_at = time();
            $file->save();
        }

        $message = "create new record";
        
        $this->activity->addActivity($clientRecord->id,$message, 1);
        
        return response()->json([
            'msg' => 'Client record created successfully',
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
        
        
        $clientRecord = ClientRecord::where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('location', 'like', '%'.$filters['search'].'%')->orWhere('role_title', 'like', '%'.$filters['search'].'%');
            } else {
                $q; 
            }
        });

        if ($sorter !== null) {
            $clientRecord = $clientRecord->orderBy($sorter, $ascDirection);
        }else{
            $clientRecord = $clientRecord->orderBy('id', 'DESC');
        }
        $total_count = $clientRecord->count();

        $clientRecord = $clientRecord->limit($pageSize)->offset($current_num)->get();
        $result = [
            'data' => $clientRecord,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function get(Request $request, $id)
    {
        $clientRecord = ClientRecord::with(['files','notes','activity'])->findOrFail($id);
        $result = [
            'data' => $clientRecord,
        ];

        return response()->json($result);
    }

    public function put($id, Request $request){
        
        $fileNameArr = [];
        if($request->hasfile('File')) {

            foreach($request->file('File') as $file) {
                
                $fileOriginalName = $file->getClientOriginalName();
                $newFileName = time().$fileOriginalName;
                $fileNameArr[] = $newFileName;
                $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
            }
            
            File::where('fileable_id','=',$id)->where('fileable_type', '=','App\Models\ClientRecord')->delete();
            
            foreach($fileNameArr as $fileName){
                $file = new File;
                $file->filename = $fileName;
                $file->fileable_id = $id;
                $file->fileable_type = 'App\Models\ClientRecord';
                $file->created_at = time();
                $file->updated_at = time();
                $file->save();
                
            }
        }
        
        $this->validate($request, [
            'current_status' => 'required',
            'location' => 'required',
            'posting_type' => 'required',
            'salary' => 'required',
            'base_pay' => 'required',
            'hour' => 'required',
            'bonus_plan' => 'required',   
        ]);
        
        $clientRecord = ClientRecord::findOrFail($id);
        $clientRecord->current_status = $request->current_status;
        $clientRecord->location = $request->location;
        $clientRecord->posting_type = $request->posting_type;
        $clientRecord->role_title = $request->role_title;
        $clientRecord->salary = $request->salary;
        
        $clientRecord->base_pay = $request->base_pay;
        $clientRecord->hour = $request->hour;
        $clientRecord->role_summary_of_candidate = $request->role_summary_of_candidate;
        $clientRecord->bonus_plan = $request->bonus_plan; 
        $clientRecord->created_at = time();
        $clientRecord->updated_at = time();
        $clientRecord->save();
        
        
        $this->activity->addActivity($request->id, 'client record updated', 2);

        return response()->json([
            'msg' => 'Client record updated successfully',
        ]);
    }

    public function delete($id){
        
        $clientRecord = ClientRecord::where('id','=',$id)->delete();
        
        $result = [
            'success' => true,
        ];

        $this->activity->addActivity($id, "Delete client record" , 3);

        return response()->json($result);
    }
    
}
