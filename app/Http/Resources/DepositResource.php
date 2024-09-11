<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class DepositResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id'                   => $this->order_id,
            'bank'                       => $this->bank === 'mandiri_bill' ? 'MANDIRI' : Str::upper($this->bank),
            'gross_amount_formatter'     => 'Rp. ' . number_format($this->gross_amount),
            'status'                     => $this->transaction_status,
            'expiry_time_formatter'      => Carbon::parse($this->expiry_time)->translatedFormat('d F Y \j\a\m H:i'),
            'transaction_time_formatter' => Carbon::parse($this->transaction_time)->translatedFormat('d F Y \j\a\m H:i'),
            'va_number'                  => $this->bank === 'mandiri_bill' ? $this->biller_code . $this->bill_key : $this->va_number,
            'user'                       => $this->user ? $this->user->name : 'Unknown User'
        ];
    }
}
