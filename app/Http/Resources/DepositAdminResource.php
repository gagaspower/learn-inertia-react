<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class DepositAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'bank'                     => $this->bank_payment,
            'amount_payment_formatter' => 'Rp. ' . number_format($this->amount_payment),
            'notes'                    => $this->notes_payment
        ];
    }
}
