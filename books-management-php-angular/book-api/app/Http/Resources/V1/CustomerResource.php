<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "email" => $this->email,
            "phoneNumber" => $this->phone_number,
            "address" => $this->address,
            "postalCode" => $this->postal_code,
            "city" => $this->city,
            "books" => BookResource::collection($this->whenLoaded("books")),
        ];
    }
}