<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyRecruiter extends Model
{
    use HasFactory , SoftDeletes;

    public function companyRecruiter(){
        return $this->hasOne(user::class, 'id', 'recruiter_id');
    }
}
