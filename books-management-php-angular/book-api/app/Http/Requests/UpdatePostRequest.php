<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if ($method == "PUT") {
            return [
                "userId" => ["required"],
                "username" => ["required"],
                "photoUrl" => ["required"],
                "content" => ["required"],
            ];
        }

        if ($method == "PATCH") {
            return [
                "userId" => ["sometimes", "required"],
                "username" => ["sometimes", "required"],
                "photoUrl" => ["sometimes", "required"],
                "content" => ["sometimes", "required"],
                ];
        }
    }
}