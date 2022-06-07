<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\File;
use App\Models\Notes;
use App\Models\Activity;

class ClientRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function notes()
    {
        return $this->morphMany(Notes::class, 'noteable');
    }

    public function activity()
    {
        return $this->morphMany(Activity::class, 'activityable');
    }
}
