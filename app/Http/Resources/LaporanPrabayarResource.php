<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LaporanPrabayarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'transaction_code'                    => $this->transaction_code,
            'transaction_customer_no'             => $this->transaction_customer_no,
            'transaction_product_sku'             => $this->transaction_sku,
            'transaction_product_name'            => $this->productPrepaid->product_name,
            'transaction_product_category'        => $this->transaction_product_category,
            'transaction_product_brand'           => $this->transaction_product_brand,
            'transaction_product_price'           => $this->productPrepaid->product_price,
            'transaction_product_price_formatted' => 'Rp. ' . number_format($this->productPrepaid->product_price),
            'transaction_product_cost'            => $this->productPrepaid->product_cost,
            'transaction_product_cost_formatted'  => 'Rp. ' . number_format($this->productPrepaid->product_cost),
            'transaction_sn'                      => $this->transaction_sn,
            'transaction_source'                  => $this->transaction_source,
            'transaction_user'                    => $this->user->name,
            'transaction_status'                  => $this->transaction_status
        ];
    }
}
