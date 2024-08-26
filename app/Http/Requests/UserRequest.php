<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name'     => 'required',
            'email'    => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|max:8|alpha_num',
            'roles'    => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'      => 'Nama wajib diisi',
            'email.required'     => 'Email wajib diisi',
            'password.required'  => 'Password wajib diisi',
            'email.email'        => 'Email tidak benar',
            'email.unique'       => 'Email sudah digunakan',
            'password.min'       => 'Password minimal :min karakter',
            'password.max'       => 'Password maksimal :max karakter',
            'password.alpha_num' => 'Kombinasi password hanya huruf dan atau angka saja (tanpa spasi)',
            'roles.required'     => 'Role user wajib dipilih'
        ];
    }
}
