<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class Recommendation extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'user',
        'fk_local',
        'like',
        'deslike',
        'iloved',
    ];

    protected $table = 'recommendations';

    public function users() 
    {
        return $this->hasMany(User::class, 'foreign_key', 'user');
    }

    public function locais() 
    {
        return $this->hasMany(Local::class, 'foreign_key', 'fk_local');
    }

    public function createRecomendation($data, $user)
    {
        $like = random_int(0,1);

        $this->fk_local = $data;
        $this->user = $user;
        $this->like = $like;
        $this->deslike = 0;
        if ($like == 1) {
            $this->iloved = 0;
        }
        if($like == 0) {
            $this->iloved = 1;
        }
       
        $this->save();
    }

    //calcula a distancia de similaridade entre o usu logado e todos usuarios
    public static function euclidian($user1, $user2)
    {
        $similarity = [];
        $assessments_user1 = DB::table('recommendations')
        ->where('user', $user1)
        ->get();

        $assessments_user2 = DB::table('recommendations')
        ->where('user', $user2)
        ->get();
        //dd($assessments_user2);
        foreach ($assessments_user1 as $local_user1) {
            foreach($assessments_user2 as $local_user2) {
                if ($local_user1->fk_local == $local_user2->fk_local) {
                    $similarity[] = 1;
                }
            }
        }
        
        if (count($similarity) == 0) {return 0;}

        foreach ($assessments_user1 as $local_user1) {
            if (($local_user1->like == true) && ($local_user1->iloved == false)) {
                $user1_ratings_on_an_item = 3;
            }

            if (($local_user1->like == false) && ($local_user1->iloved == true)) {
                $user1_ratings_on_an_item = 5;
            }

            if ($local_user1->deslike == true) {
                $user1_ratings_on_an_item = 0;
            }
        }

        foreach ($assessments_user2 as $local_user2) {
            //$i = $local_user2->fk_local;
            if (($local_user2->like == true) && ($local_user2->iloved == false) ) {
                $user2_ratings_on_an_item = 3;
            }

            if (($local_user2->like == false) && ($local_user2->iloved == true) ) {
                $user2_ratings_on_an_item = 5;
            }

            if ($local_user2->deslike == true) {
                $user2_ratings_on_an_item = 0;
            }
        }
        
        foreach ($assessments_user1 as $local_user1) {
            foreach($assessments_user2 as $local_user2) {
                if ($local_user1->fk_local == $local_user2->fk_local) {
                    $sum = array_sum([pow($user1_ratings_on_an_item - $user2_ratings_on_an_item, 2)]);
                }
            }
        }
 
        return 1/(1 + sqrt($sum));
    }

    public static function calculatesSimilarityOfUsers($user) 
    {
        //verifico se outro usuario está dentro de recomendações e que não é o que está logado
        $outher_users =  DB::table('recommendations')
        ->where('user', '!=', $user->id)
        ->get()
        ->groupBy('user');  
    
        foreach ($outher_users as $outher) {
            foreach($outher as $_outher) {
                $similarity[] = Recommendation::euclidian($user->id, $_outher->user);
            }
        }
  
        //ordena crescente
        asort($similarity);
        //ordena decrescente
        arsort($similarity);

        return $similarity;
    }

    public static function getRecommendation($user)
    {
        $totais = [];
        $sum_similaridade = [];
        $aux=[];
        $local = [];
        $rankings = [];

        $outher_users =  DB::table('recommendations')
        ->where('user', '!=', $user->id)
        ->get();
        //->groupBy('user');

        $user_logado =  DB::table('recommendations')
        ->where('user', $user->id)
        ->get();
     
        foreach ($outher_users as $outher) {
            foreach ($user_logado as $user_log) {
             
                $similaridade = Recommendation::euclidian($user_log->user, $outher->user);
                //se n houver similaridade entrer os users
                if ($similaridade <= 0) {continue;}
                
                if (($outher->like == true) && ($outher->iloved == false) ) {
                    $outher_user_ratings_on_an_item = 3;
                }

                if (($outher->like == false) && ($outher->iloved == true) ) {
                    $outher_user_ratings_on_an_item = 5;
                }

                if ($outher->deslike == true) {
                    $outher_user_ratings_on_an_item = 0;
                }
               
            
                if (!in_array($outher->fk_local, $aux)) {
                    if ($user_log->fk_local != $outher->fk_local) {
                        $totais[] += ($outher_user_ratings_on_an_item * $similaridade);
                        $local[] = $outher->fk_local;
                        $sum_similaridade[] += $similaridade;
                    
                    } else if($user_log->fk_local == $outher->fk_local){
                            $aux[] = $outher->fk_local;
                    }
                }
            }
        }
   
        $i = 0;
        foreach ($totais as $total) {
            $rankings[] = [($total/ $sum_similaridade[$i]), $local[$i]];
            ++$i;     
        }
       
        foreach ($rankings as $ranking) {
            //se gostou é >= 3.0
            if (($ranking[0] > 3.0)) {
                $rank[] = $ranking;
            }
        }
      
        $r = array_map("unserialize", array_unique(array_map("serialize", $rank)));
     
        asort($r);
        arsort($r);

        return  $r;   
    }
}
