<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Models\User;

class CandidateAppliedJob extends Model
{
    use HasFactory;

    public function getCandidateDetail(){
        return $this->hasOne(User::class,'id','candidate_id');
    }

    public function getCandidate() {
        return $this->hasOne(User::class, 'id', 'candidate_id');

    }
}
