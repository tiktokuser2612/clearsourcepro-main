<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Zipcode;

class ZipcodeController extends Controller
{
    public function getSearch(Request $request)
    {
        $this->validate($request, [
            'zipcode' => 'required'
        ]);

        $zipcode = Zipcode::where('zip', $request->zipcode)->first();

        if (!isset($zipcode)) {
            return response()->json(['msg' => 'Not found'], 404);
        }

        return response()->json($zipcode);
    }
}
