<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "userId" => $this->user_id,
            "username" => $this->username,
            "photoUrl" => $this->photo_url,
            "content" => $this->content,
            "creationDate" => $this->created_at,
        ];
    }
}