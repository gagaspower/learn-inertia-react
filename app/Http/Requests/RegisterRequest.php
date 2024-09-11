<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name'                  => 'required|max:255',
            'email'                 => 'required|email|max:255|unique:users',
            'password'              => 'required|min:6|max:8|alpha_num|confirmed',
            'password_confirmation' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'                  => 'Anda belum mengisi nama',
            'email.required'                 => 'Anda belum mengisi email',
            'password.required'              => 'Anda belum mengisi password',
            'email.email'                    => 'Mohon isikan email yang benar',
            'email.unique'                   => 'Email sudah digunakan',
            'password.min'                   => 'Password minimal :min karakter',
            'password.max'                   => 'Password maksimal :max karakter',
            'password.alpha_num'             => 'Kombinasi password hanya huruf dan atau angka saja',
            'password.confirmed'             => 'Password dan konfirmasi password tidak cocok',
            'password_confirmation.required' => 'Anda belum mengisi konfirmasi password'
        ];
    }
}
