<?php

namespace App\Models;

use Mehradsadeghi\FilterQueryString\FilterQueryString;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory, FilterQueryString;

    protected $filters = [
        "sort",
        'title', 
        'status',
        "genre",
        "author",
        "like",
        "published_date",
        "q"
    ];

    public function q($query, $value) {
        // return $query->orWhere('name', '=', $value);
       return $query->orWhere('title', 'like', "%$value%");
    }

      protected $fillable = [
        "title",
        "photo_url",
        "status",
        "genre",
        "author",
        "published_date",
        "user_id"
    ];

     public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
