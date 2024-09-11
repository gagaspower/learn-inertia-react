<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'password'              => 'required|min:6|max:8|alpha_num|confirmed',
            'password_confirmation' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'password.required'              => 'Password Wajib diisi',
            'password_confirmation.required' => 'Password Wajib diisi',
            'password.min'                   => 'Password minimal :min karakter',
            'password.max'                   => 'Password maksimal :max karakter',
            'password.alpha_num'             => 'Kombinasi password hanya huruf dan atau angka saja',
            'password.confirmed'             => 'Password dan konfirmasi password tidak cocok'
        ];
    }
}
