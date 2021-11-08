<?php

namespace App\Http\Controllers;

use App\Models\Local;
use App\Models\Recommendation;
use App\Models\User;
use AWS\CRT\HTTP\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locais = Local::inRandomOrder()->limit(5)->get();
     
        return response()->json(['locais' => $locais], 201);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function preferences(Request $request)
    {
        $locais = $request->get('fk_local');
        $email = $request->get('email');
       
        $user_exist = DB::table('users')->where('email', $email)->first();
    
        if ($user_exist) { 
            foreach ($locais as $local) {
                $recommendation = New Recommendation();
                $recommendation->createRecomendation($local, $user_exist->id);
            }           
        } 

        return response()->json(['recomendations' => 'Preferences saved in recommendations.'], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,25',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'like' => 'required|boolean',
            'deslike' => 'required|boolean',
            'iloved' => 'required|boolean',
        ]);
   
        if($validator->fails() ) {
            return response()->json([
                $validator->errors()->toJson()
            ], 400);
        }
 
        $local = new Local();
        $local->createLocal(array_merge($validator->validated()));

        if ($request->hasFile('image')) {
            $fileName = time().'_'.$request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('imageslocal', $fileName, 'public');
            Storage::disk('local')->setVisibility($path, 'public');

            $local->update([
                'filename' => $fileName,
                'image' => Storage::disk('local')->url($path),
            ]);
        }

        return response()->json([
            'message' => 'Local successfully registered',
            'local' => $local
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $local = Local::findOrfail($id);
        $local->delete();

        return response()->json([
            'local' => 'Local deleted successfully.'
        ], 201);
    }
}
