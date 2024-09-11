<?php

namespace App\Services;

use App\Models\SaldoUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class GetSaldoService
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

    public function _get_saldo()
    {
        if (Auth::check()) {
            $currentAuth = Auth::user();

            if ($currentAuth->hasRole('Admin')) {
                $params = [
                    'cmd' => 'deposit'
                ];

                $result   = $this->request('cek-saldo', $params, 'depo');
                $response = $result['data'];
            } else {
                $response = SaldoUser::select('saldo as deposit')
                                ->where('user_id', $currentAuth->id)
                                ->first();
            }

            return $response['deposit'] ?? 0;
        }

        return 0;
    }

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
}
