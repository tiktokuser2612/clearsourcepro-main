<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permission;

class RolePermission extends Model
{
    use HasFactory;


    public function getPermissionDetail() {
        return $this->hasOne(Permission::class, 'id', 'permission');

    }
}
