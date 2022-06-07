<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class candidateRequisition extends Controller {
    
    public function postCandidateRequisition(Request $request){

        $candidateRequisition = new CandidateRequisition;
        $candidateRequisition->candidate_id = $request->candidate_id;
        $candidateRequisition->client_requisition_id = $request->client_requisition_id;
        $candidateRequisition->created_at = time();
        $candidateRequisition->updated_at = time();
        $candidateRequisition->save();

    }

    public function getAllClientRequisitions(){
        return ClientRequisition::all();
    }
}
