<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductPascabayarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_sku'                 => $this->product_sku,
            'product_name'                => $this->product_name,
            'product_category'            => $this->product_category,
            'product_brand'               => $this->product_brand,
            'product_admin'               => $this->product_admin_fee,
            'product_admin_formatted'     => 'Rp. ' . number_format($this->product_admin_fee),
            'product_commision'           => $this->product_commision,
            'product_commision_formatted' => 'Rp. ' . number_format($this->product_commision),
        ];
    }
}
