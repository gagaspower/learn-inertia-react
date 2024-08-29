<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'kode_customer'   => $this->kode_customer,
            'nama_customer'   => $this->nama_customer,
            'alamat_customer' => $this->alamat_customer,
            'telp_customer'   => $this->telp_customer
        ];
    }
}
