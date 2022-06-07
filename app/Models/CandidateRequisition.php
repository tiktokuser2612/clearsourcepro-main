<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateRequisition extends Model
{
    use HasFactory;

    public function candidaterequisitions() {

        return $this->belongsTo(ClientRequisition::class, 'id', 'client_requisition_id');

    }
}
