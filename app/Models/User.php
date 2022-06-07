<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Notes;
use App\Models\Resume;
use App\Models\Requisition;
use App\Models\ActionPermission;
use App\Models\RolePermission;
use App\Models\File;
use App\Models\ClientHiringManager;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_role',
        'photo_url',
        'client_company_id',
        'middlename'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function notes() {
        return $this->morphMany(Notes::class, 'noteable');
    }

    public function permissions() {
        return $this->hasMany(UserPermission::class, 'user_id');
    }

    public function menuPermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Menu Items')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();

        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }

    public function dashboardPermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Dashboard')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();
        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }

    public function recruiterPermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Recruiter Accordions')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();
        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }

    public function requisitionPermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Req Accordions')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();
        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }

    public function clientPermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Client Accordions')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();
        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }

    public function candidatePermissions() {
        $permission = ActionPermission::where('parent_id', ActionPermission::where('permission', 'Candidate Accordions')->whereNull('parent_id')->first()->id)->pluck('id')->toArray();
        return $this->hasMany(UserPermission::class, 'user_id')->where('status', 1)->whereIn('permission_id', $permission);
    }



    public function resumes() {
        return $this->morphMany(Resume::class, 'resumeable');
    }

    public function files() {
        return $this->morphMany(File::class, 'fileable');
    }

    public function getRequisitions() {
        return $this->hasMany(Requisition::class, 'recruiter_id', 'id');
    }

    public function getClientManager(){
        return $this->hasOne(ClientHiringManager::class, 'company_id', 'id');
    }
    public function getPermissions() {
        return $this->hasMany(RolePermission::class, 'user_id', 'id')->with('getPermissionDetail');
    }

    public function getClientCompany() {
        $user = \Auth::user();
        if($user){
            if($user->user_role == 'account_executive'){
            return $this->hasMany(ClientCompany::class, 'account_executive_id', 'id')->orderBy('created_at','desc');
            }elseif($user->user_role == 'recruiter'){
                return $this->hasOne(ClientCompany::class, 'recruiter_id', 'id');
            }elseif($user->user_role == 'client'){
                return $this->hasOne(ClientCompany::class, 'client_id', 'id');
            }elseif($user->user_role == 'admin'){
                return $this->hasOne(ClientCompany::class, 'client_id', 'id');
            }else{
                return $this->hasOne(ClientCompany::class, 'client_id', 'id');
            }
        }
        
        
    }


    
}
