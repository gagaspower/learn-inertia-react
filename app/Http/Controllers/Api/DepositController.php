<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminPayment;
use App\Models\Payment;
use App\Models\SaldoUser;
use App\Services\DigiflazService;
use App\Services\GetCode;
use App\Services\MidtransService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DepositController extends Controller
{
    protected $digiflaz;
    protected $midtrans;
    protected $invoice_kode;

    public function __construct(DigiflazService $digiflaz, MidtransService $midtrans, GetCode $invoice_kode)
    {
        $this->digiflaz     = $digiflaz;
        $this->midtrans     = $midtrans;
        $this->invoice_kode = $invoice_kode;
    }

    public function get_saldo()
    {
        if (Auth::user()->hasRole('Admin')) {
            $params = [
                'cmd' => 'deposit'
            ];

            $result   = $this->digiflaz->request('cek-saldo', $params, 'depo');
            $response = $result['data'];
        } else {
            $response = SaldoUser::select('saldo as deposit')->where('user_id', Auth::user()->id)->first();
        }

        return response()->json($response);
    }

    public function get_bank()
    {
        if (Auth::user()->hasRole('Admin')) {
            $banks = ['BCA', 'MANDIRI', 'BRI', 'BNI'];
            $banks = [
                [
                    'nama_bank' => 'BNI',
                    'kode_bank' => 'BNI',
                ],
                [
                    'nama_bank' => 'BRI',
                    'kode_bank' => 'BRI',
                ],
                [
                    'nama_bank' => 'MANDIRI',
                    'kode_bank' => 'MANDIRI',
                ],
                [
                    'nama_bank' => 'BCA',
                    'kode_bank' => 'BCA',
                ],
            ];
        } else {
            $banks = [
                [
                    'nama_bank' => 'BNI',
                    'kode_bank' => 'bni',
                ],
                [
                    'nama_bank' => 'BRI',
                    'kode_bank' => 'bri',
                ],
                [
                    'nama_bank' => 'Mandiri',
                    'kode_bank' => 'mandiri_bill',
                ],
                [
                    'nama_bank' => 'Permata',
                    'kode_bank' => 'permata',
                ],
            ];
        }

        return response()->json($banks);
    }

    public function store_deposit(Request $request)
    {
        $kode   = $this->invoice_kode->_generate();
        $user   = Auth::user();
        $result = $this->midtrans->_request($kode, $request->amount, $request->bank, $user);

        // current user saldo
        $last_saldo = SaldoUser::where('user_id', $user->id)->first();

        $va_number = '';
        if ($request->bank === 'bni' || $request->bank === 'bri') {
            if ($result && isset($result['va_numbers'][0]['va_number'])) {
                $va_number = $result['va_numbers'][0]['va_number'];
            }
        } elseif ($request->bank === 'mandiri_bill') {
            if ($result && isset($result['bill_key']) && isset($result['biller_code'])) {
                $va_number = $result['biller_code'] . $result['bill_key'];
            }
        } elseif ($request->bank === 'permata') {
            if ($result && isset($result['permata_va_number'])) {
                $va_number = $result['permata_va_number'];
            }
        }

        Payment::create([
            'order_id'           => $result['order_id'],
            'payment_type'       => $result['payment_type'],
            'bank'               => $request->bank,
            'gross_amount'       => $result['gross_amount'],
            'status_message'     => $result['status_message'],
            'transaction_status' => $result['transaction_status'],
            'transaction_time'   => $result['transaction_time'],
            'expiry_time'        => $result['expiry_time'],
            'va_number'          => $va_number,
            'bill_key'           => isset($result['bill_key']) ? $result['bill_key'] : '',
            'biller_code'        => isset($result['biller_code']) ? $result['biller_code'] : '',
            'user_id'            => $user->id,
            'user_last_saldo'    => $last_saldo ? $last_saldo->saldo : 0
        ]);

        return response()->json($result);
    }

    public function store_deposit_admin(Request $request)
    {
        $params = [
            'amount'     => (int) $request->amount,
            'Bank'       => $request->bank,
            'owner_name' => $request->owner
        ];

        $response = $this->digiflaz->request('deposit', $params, 'deposit');
        if ($response && $response['data']['rc'] === '00') {
            $response['data']['amount_formatter'] = 'Rp. ' . number_format($response['data']['amount']);

            AdminPayment::create([
                'bank_payment'   => $request->bank,
                'amount_payment' => $request->amount,
                'notes_payment'  => $response['data']['notes']
            ]);
        }

        return response()->json($response);
    }

    public function get_history()
    {
        $query = Payment::with('user')->whereMonth('created_at', Carbon::now()->month);

        if (Auth::user()->hasRole('Mitra')) {
            $query->where('user_id', Auth::user()->id);
        }

        $data = $query->latest()->get();

        return response()->json([
            'status'  => true,
            'message' => 'Sukses',
            'data'    => $data
        ], 200);
    }
}
