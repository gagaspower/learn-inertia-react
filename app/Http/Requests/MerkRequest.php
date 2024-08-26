<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MerkRequest extends FormRequest
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
            'nama_merk'     => 'required',
            'kategori_merk' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'nama_merk.required'     => 'Nama merk kendaraan wajib disii',
            'kategori_merk.required' => 'Nama kategori merk kendaraan wajib diisi'
        ];
    }
}
