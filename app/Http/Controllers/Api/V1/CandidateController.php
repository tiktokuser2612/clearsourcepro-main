<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Notes;
use App\Services\Resumes;
use App\Models\File;
use App\Models\Resume;

class CandidateController extends Controller {

    protected $resumes;

    public function __construct(Resumes $resumes) {
        $this->resumes = $resumes;
    }

    public function postIndex(Request $request){
        // dd($request);
 
        $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'username' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
            'password' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ]);
        
        $user = new User;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = bcrypt($request->password);
        $user->user_role = 'candidate';
        $user->address = !empty($request->address) ? $request->address : '';
        $user->city = !empty($request->city) ? $request->city : ''; 
        $user->state = !empty($request->state) ? $request->state : '';
        $user->hiring_dates = !empty($request->hiring_dates) ? $request->hiring_dates : '';
        $user->zip = !empty($request->zip) ? $request->zip : '';
        
        $user->save();

        $notes = new Notes;
        $notes->title = $request->note_title;
        $notes->description = $request->note_description;
        $notes->noteable_id = $user->id;
        $notes->noteable_type = "App\Models\User";
        $notes->save();
        if($request->hasFile('File') != null){
            $this->resumes->upload($request, $user->id, 1);
        }

        return response()->json([
            'msg' => 'Candidate created successfully',
        ]);
        
    }

    public function getIndex(Request $request) {
        
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);

        $users = User::where(function($q) use($filters){
            if($filters !== null && count($filters)){
                $q->where('firstname', 'like', '%'.$filters['search'].'%')->orWhere('email', 'like', '%'.$filters['search'].'%');
            } else {
                $q->where('user_role','candidate'); 
            }
        });

        if ($sorter !== null) {
            $users = $users->orderBy($sorter, $ascDirection);
        }else{
            $users = $users->orderBy('id', 'DESC');
        }
        $total_count = $users->count();

        $users = $users->limit($pageSize)->offset($current_num)->get();
        $result = [
            'data' => $users,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function get(Request $request, $id){
        $user = User::with(['notes','files'])->findOrFail($id);
        $result = [
            'data' => $user,
        ];
        return response()->json($result);
    }

    public function put(Request $request, $id) {

        // dd($request->hasFile('File'));
        
        $user = User::findOrFail($id);
        $rules = [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'unique:users,email,'.$user->id,
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ];

        if($user->firstname != $request->firstname){
            $rules['firstname'] = 'required|unique:users';
        }

        $this->validate($request, $rules);
    
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->user_role = 'candidate';
        $user->address = !empty($request->address) ? $request->address : '';
        $user->city = !empty($request->city) ? $request->city : ''; 
        $user->state = !empty($request->state) ? $request->state : ''; 
        $user->zip = !empty($request->zip) ? $request->zip : ''; 
        $user->save();

        if(isset($request->note_id) && (isset($request->note_title) || isset($request->note_description))){
            $notes = Notes::findOrFail($request->note_id);
            if(isset($request->note_title)){
                $notes->title = $request->note_title;
            }elseif(isset($request->note_description)){
                $notes->description = $request->note_description;
            }
            $notes->noteable_id = $user->id;
            $notes->noteable_type = "App\Models\User";
            $notes->save();
        }
        if($request->hasFile('File') != null){
            $this->resumes->editUpload($request, $id, 1);
        }

        $result = [
            'success' => true,
            'id' => $user->id,
        ];

        return response()->json([
            'msg' => 'Candidate Updated successfully',
        ]);
    }

    public function delete(Request $request, $id) {

        $user = User::findOrFail($id);
        $user->delete();

        $notes = Notes::where('noteable_id',$id);
        $notes->delete();

        File::where('fileable_id',$id)->delete();
        Resume::where('resumeable_id',$id)->delete();

        $result = [
            'success' => true,
        ];

        return response()->json($result);
    }
}
