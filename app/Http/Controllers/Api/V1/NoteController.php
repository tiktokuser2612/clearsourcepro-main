<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notes;

class NoteController extends Controller
{
    public function postIndex(Request $request){

        $this->validate($request, [
            'title' => 'required',
        ]);
        
        $modals = [
            '1' => "App\Models\Requisition",
            '2' => "App\Models\User",
            '3' => "App\Models\ClientRecord",
        ];
        
        $model = '';
        
        if(array_key_exists($request->model_id, $modals )){
            $model = $modals[$request->model_id];
        }

        $note = new Notes;
        $note->title = $request->title;
        $note->description = $request->description;
        $note->noteable_id = $request->note_type_id;
        $note->noteable_type = $model;
        $note->created_at = time();
        $note->updated_at = time();
        $note->save();

        return response()->json([
            'msg' => 'Note created successfully',
        ]);
        
    }

    public function getIndex(Request $request)
    {
        $current_page = $request->input('current');
        $pageSize = $request->input('pageSize');//pagenate
        $filters = $request->input('filters');//where
        $sorter = $request->input('sorter');//orderBy
        $asc = $request->input('asc');//orderBy
        $ascDirection = $asc ? 'asc' : 'desc';
        $current_num = $pageSize * ($current_page - 1);
        
       
        
        $notes = Notes::where(function($q) use($filters){
            $modals = [
                '1' => "App\Models\Requisition",
                '2' => "App\Models\User",
                '3' => "App\Models\ClientRecord",
            ];
            $model = '';
            if(array_key_exists($filters['model'], $modals )){
                $model = $modals[$filters['model']];
            }

            if($filters !== null && count($filters)){
                $q->where('noteable_id','=', $filters['id'])
                    ->where('noteable_type','=', $model);
            } else {
                $q; 
            }
        });

        if ($sorter !== null) {
            $notes = $notes->orderBy($sorter, $ascDirection);
        }else{
            $notes = $notes->orderBy('id', 'DESC');
        }
        $total_count = $notes->count();

        $notes = $notes->limit($pageSize)->offset($current_num)->get();
        $result = [
            'data' => $notes,
            'total' => $total_count,
            'current' => $current_page,
        ];

        return response()->json($result);
    }

    public function get(Request $request, $id){
        $note = Notes::findOrFail($id);
        $result = [
            'data' => $note,
        ];
        return response()->json($result);
    }

    public function put(Request $request, $id){

        $note = Notes::findOrFail($id);

        $this->validate($request, [
            'title' => 'required',
        ]);
        
        $modals = [
            '1' => "App\Models\Requisition",
            '2' => "App\Models\User",
            '3' => "App\Models\ClientRecord",
        ];
        
        $model = '';
        
        if(array_key_exists($request->model_id, $modals )){
            $model = $modals[$request->model_id];
        }

        $note->title = $request->title;
        $note->description = $request->description;
        $note->noteable_id = $request->note_type_id;
        $note->noteable_type = $model;
        $note->created_at = time();
        $note->updated_at = time();
        $note->save();

        return response()->json([
            'msg' => 'Note updated successfully',
        ]);
        
    }
}
