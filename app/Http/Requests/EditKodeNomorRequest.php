<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditKodeNomorRequest extends FormRequest
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
            'number'   => 'required|numeric|digits:4|unique:number_codes,number,' . $this->route('id'),
            'operator' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'number.required'   => 'Nomor wajib diisi',
            'number.numeric'    => 'Nomor hanya berupa angka',
            'number.digits'     => 'Nomor harus 4 digit',
            'number.unique'     => 'Nomor sudah terdaftar',
            'operator.required' => 'Provider wajib dipilih'
        ];
    }
}
