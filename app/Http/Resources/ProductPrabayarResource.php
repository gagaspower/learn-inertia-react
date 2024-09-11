<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductPrabayarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_sku'             => $this->product_sku,
            'product_name'            => $this->product_name,
            'product_category'        => $this->product_category,
            'product_brand'           => $this->product_brand,
            'product_price'           => $this->product_price,
            'product_price_formatted' => 'Rp. ' . number_format($this->product_price),
            'product_cost'            => $this->product_cost,
            'product_cost_formatted'  => 'Rp. ' . number_format($this->product_cost)
        ];
    }
}
