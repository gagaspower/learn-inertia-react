<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
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
            'nama_customer' => 'required|unique:customers',
            'telp_customer' => 'nullable|numeric|digits_between:10,13'
        ];
    }

    public function messages(): array
    {
        return [
            'nama_customer.required'       => 'Nama wajib diisi',
            'nama_customer.unique'         => 'Customer sudah terdaftar',
            'telp_customer.digits_between' => 'Nomor Telp harus terdiri dari minimal 10 hingga 13 angka',
            'telp_customer.numeric'        => 'Nomor Telp hanya berupa angka'
        ];
    }
}
