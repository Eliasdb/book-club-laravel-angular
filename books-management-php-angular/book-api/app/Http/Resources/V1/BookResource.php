<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "photoUrl" => $this->photo_url,
            "customerId" => $this->customer_id,
            "title" => $this->title,
            "genre" => $this->genre,
            "author" => $this->author,
            "status" => $this->status,
            "publishedDate" => $this->published_date,
            "lastLoanedDate" => $this->last_loaned_date,
        ];
    }
}
