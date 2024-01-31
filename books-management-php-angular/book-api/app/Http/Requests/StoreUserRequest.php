<?php

namespace App\Http\Requests;

use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" =>["required"],
            // "firstName" =>["required"],
            // "lastName" =>["required"],
            "email" =>["required", "email"],
            "password" => ["required"],
            // "phoneNumber" => ["required"],
            // "address" =>["required"],
            // "postalCode" =>["required"],
            // "city" =>["required"],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->postalCode)
        {
            $this->merge([
            "postal_code" => $this->postalCode
        ]);
        }

        if ($this->firstName)
        {
            $this->merge([
            "first_name" => $this->firstName
        ]);
        }

        if ($this->lastName)
        {
            $this->merge([
            "last_name" => $this->lastName
        ]);
        }

        if ($this->phoneNumber)
        {
            $this->merge([
            "phone_number" => $this->phoneNumber
        ]);
        }
      
    }
}
