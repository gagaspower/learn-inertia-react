<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepositAdminResource;
use App\Http\Resources\DepositResource;
use App\Models\AdminPayment;
use App\Models\Payment;
use App\Models\SaldoUser;
use App\Services\DigiflazService;
use App\Services\GetCode;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Nette\Schema\Elements\Structure;

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

    public function index()
    {
        $user   = Auth::user();
        $result = [];

        if ($user->hasRole('Admin')) {
            $result = Payment::with('user')
                          ->whereDate('created_at', '>=', Carbon::now()->subDays(30)->toDateString())
                          ->latest()
                          ->paginate(10);
        } else {
            $result = Payment::with('user')
                          ->whereDate('created_at', '>=', Carbon::now()->subDays(30)->toDateString())
                          ->where('user_id', $user->id)
                          ->latest()
                          ->paginate(10);
        }

        return Inertia::render('Deposit/Mitra', [
            'data' => DepositResource::collection($result)
        ]);
    }

    public function index_admin()
    {
        return Inertia::render('Deposit/Admin');
    }

    public function list_histori_admin()
    {
        $result = AdminPayment::whereDate('created_at', '>=', Carbon::now()->subDays(30)->toDateString())
                      ->latest()
                      ->paginate(10);

        return Inertia::render('Deposit/HistoriAdmin', [
            'data' => DepositAdminResource::collection($result)
        ]);
    }

    public function create()
    {
        $banks = $this->_get_bank_deposit();
        if (Auth::user()->hasRole('Admin')) {
            return Inertia::render('Deposit/Index', ['bankList' => $banks]);
        } else {
            return Inertia::render('Deposit/IndexMitra', ['bankList' => $banks]);
        }
    }

    protected function _get_bank_deposit()
    {
        if (Auth::user()->hasRole('Admin')) {
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
                ]
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

        return $banks;
    }

    public function _store_depo(Request $request)
    {
        $kode   = $this->invoice_kode->_generate();
        $user   = Auth::user();
        $result = $this->midtrans->_request($kode, $request->amount, $request->bank, $user);

        // current user saldo
        $last_saldo = SaldoUser::where('user_id', $user->id)->first();

        Payment::create([
            'order_id'           => $result['order_id'],
            'payment_type'       => $result['payment_type'],
            'bank'               => $request->bank,
            'gross_amount'       => $result['gross_amount'],
            'status_message'     => $result['status_message'],
            'transaction_status' => $result['transaction_status'],
            'transaction_time'   => $result['transaction_time'],
            'expiry_time'        => $result['expiry_time'],
            'va_number'          => isset($result['va_numbers'][0]['va_number']) ? $result['va_numbers'][0]['va_number'] : '',
            'bill_key'           => isset($result['bill_key']) ? $result['bill_key'] : '',
            'biller_code'        => isset($result['biller_code']) ? $result['biller_code'] : '',
            'user_id'            => Auth::user()->id,
            'user_last_saldo'    => $last_saldo ? $last_saldo->saldo : 0
        ]);

        $va_number = '';

        if ($result) {
            $result['expiry_time_formatter']      = Carbon::parse($result['expiry_time'])->translatedFormat('d F Y \j\a\m H:i');
            $result['transaction_time_formatter'] = Carbon::parse($result['transaction_time'])->translatedFormat('d F Y \j\a\m H:i');
            $result['gross_amount_formatter']     = 'Rp. ' . number_format((float) $result['gross_amount']);

            $result['bank_tujuan'] = $request->bank === 'mandiri_bill' ? 'MANDIRI' : Str::upper($request->bank);

            if ($request->bank === 'mandiri_bill') {
                $va_number = $result['biller_code'] . $result['bill_key'];
            } elseif ($request->bank === 'bni' || $request->bank === 'bri') {
                $va_number = $result['va_numbers'][0]['va_number'];
            } elseif ($request->bank === 'permata') {
                $va_number = $result['permata_va_number'];
            }

            $result['va_number'] = $va_number;
        }

        return response()->json($result);
    }

    public function _store_depo_admin(Request $request)
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

        return response()->json($response['data']);
    }

    public function _get_histori_depo_user() {}

    public function webhook(Request $request)
    {
        $json = file_get_contents('php://input');
        $arr  = json_decode($json, true);

        $getPembayaran    = Payment::where('order_id', $arr['order_id'])->first();
        $status_transaksi = '';
        $new_saldo        = $arr['gross_amount'] - 4500;
        if ($arr['transaction_status'] === 'settlement' || $arr['transaction_status'] === 'capture') {
            $status_transaksi = 'sukses';

            /* update saldo user */
            $cek_saldo = SaldoUser::where('user_id', $getPembayaran->user_id)->first();
            if ($cek_saldo) {
                $cek_saldo->saldo += $new_saldo;
                $cek_saldo->save();
            } else {
                // Jika cek_saldo null, insert data baru
                SaldoUser::create([
                    'user_id' => $getPembayaran->user_id,
                    'saldo'   => $new_saldo,
                ]);
            }
        } else {
            $status_transaksi = $arr['transaction_status'];
        }

        // update status transaksi pembayaran
        Payment::where('order_id', $arr['order_id'])->update(['transaction_status' => $status_transaksi]);
    }
}
