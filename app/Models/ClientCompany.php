<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientCompany extends Model
{
    use HasFactory;

    public function getClientManager(){
        return $this->hasOne(ClientHiringManager::class, 'company_id', 'id');
    }

    public function getCompanyRecruiterName(){
        return $this->belongsTo(User::class, 'recruiter_id', 'id');
    }

    public function getCompanyAccountExecutiveName(){
        return $this->belongsTo(User::class, 'account_executive_id', 'id');
    }

    public function getCompanyManagers(){
        return $this->hasMany(ClientHiringManager::class, 'company_id', 'id');
    }
}
