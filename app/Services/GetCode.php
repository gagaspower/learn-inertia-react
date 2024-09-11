<?php

namespace App\Services;

use App\Models\TransactionCode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class GetCode
{
    public function _generate()
    {
        $q   = TransactionCode::select(DB::raw('MAX(RIGHT(transaction_code,9)) as kd_max'));
        $prx = 'INV-WP-' . date('y') . '-' . date('m') . '-';
        if ($q->count() > 0) {
            foreach ($q->get() as $k) {
                $tmp = ((int) $k->kd_max) + 1;
                $kd  = $prx . sprintf('%09s', $tmp);
            }
        } else {
            $kd = $prx . '000000001';
        };

        TransactionCode::create([
            'transaction_code'   => $kd,
            'transaction_date'   => Carbon::now(),
            'transaction_number' => 0
        ]);

        return $kd;
    }
}
