<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Requisition;
use App\Models\ClientRequisition;
use App\Models\User;
use DB;
use App\Models\CandidateAppliedJob;
use Illuminate\Support\Facades\Storage;
use App\Models\File;

class SearchJobController extends Controller
{
    public function search(Request $request){
      
    } 

    public function getIndex(Request $request){
        
        
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
       
        
        $requisition = Requisition::where(function($q) use($filters){
            
            if($filters !== null && count($filters)){   
                if($filters['category'] != null)
                    $q->where('category', 'like', '%'.$filters['category'].'%');
                if($filters['type'] != null)
                    $q->Where('job_type', 'like', '%'.$filters['type'].'%');
                if(trim($filters['search']) != ""){
                    $q->Where('title', 'like', '%'.$filters['search'].'%');
                }
            } else {
                $q; 
            }
        });

        //Get Category
        $query = DB::table('requisitions')->distinct()->get(['category']);
        $categoryArr = [];
        foreach($query as $queryKey){
            $categoryArr[] = $queryKey->category;
        }

        //Get JobType
        $jobTypequery = DB::table('requisitions')->distinct()->get(['job_type']);
        $jobTypeArr = [];
        foreach($jobTypequery as $jobType){
            $jobTypeArr[] = $jobType->job_type;
        }

        if ($sorter !== null) {
            $requisition = $requisition->orderBy($sorter, $ascDirection);
        }
        $total_count = $requisition->count();

        $requisition = $requisition->limit($pageSize)->offset($current_num)->get();
        
        $result = [
            'data' => $requisition,
            'total' => $total_count,
            'current' => $current_page,
            'category' => $categoryArr,
            'jobType' => $jobTypeArr
        ];
        
        return response()->json($result);
    }

    public function getJobDetails(Request $request){
        
        $requisition = Requisition::with(['clientRequi'])->where('id', '=', $request->id)->first();
        $requisitionCatgoryData = Requisition::where('category', '=', $requisition->category)->get();

        $requisition['requisition_category'] = $requisitionCatgoryData;
        
        $result = [
            'data' => $requisition,
        ];
        return response()->json($result);
        
    }

    public function postJob(Request $request){
        
        $candidateAppliedJob = new CandidateAppliedJob;        
        $candidateAppliedJob->requisition_id = $request->requisition_id;
        $candidateAppliedJob->candidate_id = isset($request->candidate_id) ? $request->candidate_id : null;

        $candidateAppliedJob->file_table_id = $request->id;

        //Step Second Data
        $candidateAppliedJob->city = $request->city;
        $candidateAppliedJob->state = $request->state;
        $candidateAppliedJob->candidate_country = $request->country;
        $candidateAppliedJob->email = $request->email;
        $candidateAppliedJob->step_2_how_did_you_hear_about_us = $request->how_did_you_hear_about_us;
        $candidateAppliedJob->phone = $request->phone;
        $candidateAppliedJob->zip = $request->zip;
        $candidateAppliedJob->contractor = $request->contractor;
        
        //Step Third Data
        $candidateAppliedJob->company_name = $request->company_name;
        // $candidateAppliedJob->company_country = $request->job_title;
        $candidateAppliedJob->job_title = $request->job_title;
        $candidateAppliedJob->key_achievments = $request->key_achievments;
        $candidateAppliedJob->year_of_experience = $request->year_of_experience;

        //Step Four Data
        $candidateAppliedJob->Are_you_willing_to = $request->how_did_you_hear_about_us;
        $candidateAppliedJob->When_the_earliest_ = $request->When_the_earliest_you_can_start_working_with_us;
        $candidateAppliedJob->Why_did_you_apply_ = $request->Why_did_you_apply_for_this_position;
        $candidateAppliedJob->Why_would_you_like = $request->Why_would_you_like_to_work_with_our_company;
        $candidateAppliedJob->step_4_contractor = $request->contractor_four;
        $candidateAppliedJob->full_time_part_time = $request->full_time_part_time;
        $candidateAppliedJob->how_did_you_hear_about_us = $request->how_did_you_hear_about_us_four;

        //Step Five Data
        $candidateAppliedJob->disclosure_1 = $request->disclosure;
        
        //Step Six Data
        $candidateAppliedJob->dob = $request->dob;
        $candidateAppliedJob->ethnic_background = $request->ethnic_background;
        $candidateAppliedJob->sex = $request->gender;

        $candidateAppliedJob->created_at = time();
        $candidateAppliedJob->updated_at = time();
        $candidateAppliedJob->save();

        //cANDIDATE FILE UPLOAD IN APPLY POST
        if($request->hasfile('resume')) {
            if($request->file('resume') ) {
                $file = $request->file('resume');
                $fileOriginalName = $file->getClientOriginalName();
                $newFileName = time().$fileOriginalName;
                $path = Storage::disk('public')->put( $newFileName , file_get_contents($file->getRealPath()));  
            }

            $fileModel = new File;        
            $fileModel->filename = $newFileName;
            $fileModel->fileable_id = $candidateAppliedJob->id;
            $fileModel->fileable_type = 'App\Models\CandidateAppliedJob';
            $fileModel->created_at = time();
            $fileModel->updated_at = time();
            $fileModel->save();


            $candidateAppliedJobUpdate = CandidateAppliedJob::findOrFail($candidateAppliedJob->id);
            $candidateAppliedJobUpdate->file_table_id = $fileModel->id;
            $candidateAppliedJobUpdate->save();
        }

    }
}
