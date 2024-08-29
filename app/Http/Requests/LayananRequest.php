<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LayananRequest extends FormRequest
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
            'nama_layanan'      => 'required',
            'deskripsi_layanan' => 'nullable',
            'harga_layanan'     => 'required|numeric|min:1000'
        ];
    }

    public function messages(): array
    {
        return [
            'nama_layanan.required'  => 'Nama layanan wajib diisi',
            'harga_layanan.required' => 'Harga layanan wajib diisi',
            'harga_layanan.min'      => 'Minimal harga layanan yang diizinkan :min',
            'harga_layanan.numeric'  => 'Harga layanan hanya berupa angka'
        ];
    }
}
