<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
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
        $method = $this->method();

        if ($method == "PUT") 
        {
            return [
                    "firstName" =>["required"],
                    "lastName" =>["required"],
                    "email" =>["required", "email"],
                    "phoneNumber" => ["required"],
                    "address" =>["required"],
                    "postalCode" =>["required"],
                    "city" =>["required"],
                    ];
        } else {
             return [
                    "firstName" =>["sometimes", "required"],
                    "lastName" =>["sometimes", "required"],
                    "email" =>["sometimes", "required", "email"],
                    "phoneNumber" =>["sometimes", "required"],
                    "address" =>["sometimes", "required"],
                    "postalCode" =>["sometimes", "required"],
                    "city" =>["sometimes", "required"],
                    ];
        }
       
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
