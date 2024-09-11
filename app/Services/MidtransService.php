<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MidtransService
{
    protected $mode;
    protected $clientKey;
    protected $serverKey;
    protected $sandboxUrl;
    protected $prodUrl;

    public function __construct()
    {
        $this->mode       = config('app.midtrans.mode');
        $this->clientKey  = config('app.midtrans.client_key');
        $this->serverKey  = config('app.midtrans.server_key');
        $this->sandboxUrl = config('app.midtrans.sandbox_url');
        $this->prodUrl    = config('app.midtrans.production_url');
    }

    /**
     * Generate sign hash.
     */
    protected function generateSign()
    {
        return 'Basic ' . base64_encode($this->serverKey . ':');
    }

    /**
     * Execute API request.
     */
    public function _request($orderId, $amount, $bank, $user = null)
    {
        $transaction_details = array(
            'order_id'     => $orderId,
            'gross_amount' => (int) $amount + 4500
        );

        $bank_transfer = array(
            'bank' => $bank
        );

        if ($user) {
            $customer_details = array(
                'first_name' => $user->name,
                'email'      => $user->email
            );
        }

        /* seting waktu expired va number ke 1 hari */
        $custom_expiry = array(
            'order_time'      => date('Y-m-d H:m:s O'),
            'expiry_duration' => 1,
            'unit'            => 'day'  // minute, hour, day
        );

        $transaction_data = array(
            'payment_type'        => $bank == 'mandiri_bill' ? 'echannel' : 'bank_transfer',
            'transaction_details' => $transaction_details,
            'custom_expiry'       => $custom_expiry,
        );

        if ($user) {
            $transaction_data['customer_details'] = $customer_details;
        }

        if ($bank == 'mandiri_bill') {
            $transaction_data['echannel'] = array(
                'bill_info1' => 'Pembayaran untuk : deposit saldo cashpay',
                'bill_info2' => 'Online payment',
            );
        } else {
            $transaction_data['bank_transfer'] = $bank_transfer;
        }

        $sign = $this->generateSign();
        $url  = $this->mode === 'sandbox' ? $this->sandboxUrl : $this->prodUrl;

        $response = Http::withHeaders([
            'Content-type'  => 'application/json',
            'Accept'        => 'application/json',
            'Authorization' => $sign,
        ])->post($url, $transaction_data);

        return $response->json();
    }
}
