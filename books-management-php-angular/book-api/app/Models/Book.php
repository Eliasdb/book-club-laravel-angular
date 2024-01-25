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
        "published_date"
    ];

      protected $fillable = [
        "title",
        "photo_url",
        "status",
        "genre",
        "author",
        "published_date",
        "customer_id"
    ];

     public function customer() 
    {
        return $this->belongsTo(Customer::class);
    }
}
