<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Local extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'title',
        'filename',
        'image',
        'like',
        'deslike',
        'iloved',
    ];

    protected $table = 'locais';

    /**
     * Get the post that owns the comment.
     */
    public function recommendation()
    {
        return $this->belongsTo(Recommendation::class);
    }


  /*    // Rest omitted for brevity
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    } 

    public function createLocal($data) 
    {
       
        $this->title = $data['title'];
        $this->filename = '';
        $this->image = $data['image'];
        $this->like = $data['like'];
        $this->deslike = $data['deslike'];
        $this->iloved = $data['iloved'];
        $this->save();
    }
}
