<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
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
            'brand_name' => 'required',
            'brand_type' => 'required',
            'brand_logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'brand_name.required' => 'Nama brand wajib diisi',
            'brand_type.required' => 'Kategori brand wajib diisi',
            'brand_logo.image'    => 'Logo hanya berupa gambar',
            'brand_logo.mimes'    => 'File yang diizinkan hanya jpg atau png',
            'brand_logo.max'      => 'Ukuran file maksimal 2MB',
        ];
    }
}
