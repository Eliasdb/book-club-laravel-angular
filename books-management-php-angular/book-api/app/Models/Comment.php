<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Comment extends Model
{
    use HasFactory;
    use FilterQueryString;


    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
