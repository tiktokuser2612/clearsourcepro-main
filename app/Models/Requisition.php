<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Notes;
use App\Models\User;
use App\Models\CandidateAppliedJob;
use App\Models\ClientRequisition;
use App\Models\Log;

class Requisition extends Model
{
    use HasFactory , SoftDeletes;
    protected $dates = ['deleted_at'];

    public function notes()
    {
        return $this->morphMany(Notes::class, 'noteable');
    }

    public function clientRequisitions(){
        return $this->hasOne(ClientRequisition::class);
    }

    public function clientRequi() {
        return $this->hasOne(ClientRequisition::class,'requisition_id', 'id' );
    }



    public function getCandidateIdAppliedForRequisition(){
        return $this->hasMany(CandidateAppliedJob::class,'requisition_id','id')->with('getCandidateDetail');
    }

    public function RequisitionDoc(){
        return $this->hasMany(File::class,'fileable_id','id')->where('fileable_type','App\Models\Requisition');
    }

    public function getRecruiter() {
        return $this->belongsTo(User::class, 'recruiter_id', 'id');
    }

    public function getOtherRecruiter() {
        return $this->belongsTo(User::class, 'other_recruiter', 'id');
    }

    public function getCandidateJobs() {
        return $this->hasMany(CandidateAppliedJob::class, 'requisition_id', 'id')->with('getCandidate');

    }

    public function clientActivity() {
        return $this->morphMany(Log::class, 'logActivity');
    }

    public function getHringManagerName(){
        return $this->belongsTo(ClientHiringManager::class, 'hiring_manager_id', 'id');
    }
}
