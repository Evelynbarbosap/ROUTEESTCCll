<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RecommendationController extends Controller
{
    public function similarityUsers()
    {
        $user = \auth()->user();
      

        $similarity_users = Recommendation::calculatesSimilarityOfUsers($user);
       
        return  $similarity_users;
    }
    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request) 
    {
        $email = $request->email;
        $user = DB::table('users')->where('email', $email)->first();

        $recommendations_locais = [];
        $locais = DB::table('locais')->get();
        $recomendations = Recommendation::getRecommendation($user);
        
        foreach ($locais as $local) {
            foreach ($recomendations as $local_recommendations) {
                if ($local_recommendations[1] == $local->id) {
                    $recommendations_locais[] = $local;
                }
            }
        }
   
        return response()->json([
            'recommendations' => $recommendations_locais
        ], 201);
    }
}
