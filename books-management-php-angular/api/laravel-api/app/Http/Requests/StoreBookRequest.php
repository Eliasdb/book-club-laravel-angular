<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
            "status" =>["required", Rule::in(["loaned out", "in stock"])],
            "author" =>["required"],
            "publishedDate" =>["required"],
            "addedDate" =>["required"],
        ];
    }

     protected function prepareForValidation()
    {
        $this->merge([
            "published_date" => $this->publishedDate,
            "added_date" => $this->addedDate,
        ]);
    }
}
