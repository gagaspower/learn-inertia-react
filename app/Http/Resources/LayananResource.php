<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class LayananResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                      => $this->id,
            'nama_layanan'            => $this->nama_layanan,
            'deskripsi_layanan'       => $this->deskripsi_layanan,
            'harga_layanan'           => $this->harga_layanan,
            'harga_layanan_formatter' => number_format($this->harga_layanan)
        ];
    }
}
