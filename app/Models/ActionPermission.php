<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionPermission extends Model
{
    use HasFactory;

    public function parent() {
        return $this->hasOne(ActionPermission::class, 'id', 'parent_id');
    }

}
