<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientRequisition extends Model
{
    use HasFactory, SoftDeletes;

    public function requisitions(){
        return $this->hasMany(Requisition::class, 'id', 'requisition_id');
    }
}
