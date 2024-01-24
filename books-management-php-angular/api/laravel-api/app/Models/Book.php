<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

      protected $fillable = [
        "name",
        "status",
        "author",
        "published_date",
        "added_date",
    ];

     public function customer() 
    {
        return $this->belongsTo(Customer::class);
    }
}
