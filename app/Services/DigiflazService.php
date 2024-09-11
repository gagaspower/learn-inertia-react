<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DigiflazService
{
    protected $mode;
    protected $user;
    protected $devKey;
    protected $prodKey;
    protected $endPoint;

    public function __construct()
    {
        $this->mode     = config('app.digiflaz.mode');
        $this->user     = config('app.digiflaz.user');
        $this->devKey   = config('app.digiflaz.development_key');
        $this->prodKey  = config('app.digiflaz.production_key');
        $this->endPoint = config('app.digiflaz.end_point');
    }

    /**
     * Generate sign hash.
     */
    protected function generateSign($cmd)
    {
        return md5($this->user . ($this->mode === 'development' ? $this->devKey : $this->prodKey) . $cmd);
    }

    /**
     * Execute API request.
     */
    public function request($url, $params = [], $cmd = null)
    {
        $sign               = $this->generateSign($cmd);
        $params['username'] = $this->user;
        $params['sign']     = $sign;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($this->endPoint . $url, $params);

        return $response->json();
    }

    public function pln_subcribe($url, $customer_no)
    {
        $params['commands']    = 'pln-subscribe';
        $params['customer_no'] = $customer_no;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($this->endPoint . $url, $params);

        return $response->json();
    }
}
