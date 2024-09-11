<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|string|email|max:255',
            'password' => 'required|string|alpha_num'
        ], [
            'email.required'     => 'Anda belum mengisikan email',
            'password.required'  => 'Anda belum mengisikan password',
            'email.email'        => 'Mohon isikan email yang benar',
            'password.alpha_num' => 'Kombinasi password hanya huruf dan atau angka saja, tanpa spasi'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid credential!',
                'data'    => null
            ], 401);
        } elseif (!Auth::attempt($request->only('email', 'password'))) {
            return response()
                       ->json([
                           'status'  => false,
                           'message' => 'Invalid credential!',
                           'data'    => null
                       ], 401);
        } else {
            $user = User::where('email', $request['email'])->firstOrFail();

            $token           = $user->createToken('auth_token')->plainTextToken;
            $user['role_id'] = $user->roles->first()->name;

            return response()
                       ->json([
                           'status' => true,
                           'message' => 'Sukses',
                           'data' => [
                               'user'         => $user,
                               'access_token' => $token
                           ],
                       ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name'                  => 'required|max:255',
                'email'                 => 'required|email|max:255|unique:users',
                'password'              => 'required|min:6|max:8|alpha_num|confirmed',
                'password_confirmation' => 'required'
            ], [
                'name.required'                  => 'Anda belum mengisi nama',
                'email.required'                 => 'Anda belum mengisi email',
                'password.required'              => 'Anda belum mengisi password',
                'email.email'                    => 'Mohon isikan email yang benar',
                'email.unique'                   => 'Email sudah digunakan',
                'password.min'                   => 'Password minimal :min karakter',
                'password.max'                   => 'Password maksimal :max karakter',
                'password.alpha_num'             => 'Kombinasi password hanya huruf dan atau angka saja',
                'password.confirmed'             => 'Password dan konfirmasi password tidak cocok',
                'password_confirmation.required' => 'Anda belum mengisi konfirmasi password'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Invalid input'
                ], 500);
            }

            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $user->assignRole('Mitra');

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Registrasi berhasil'
            ], 201);
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'status'  => false,
                'message' => 'An Error Accoured'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user            = $request->user();
        $user['role_id'] = $user->roles->first()->name;

        return response()->json(['status' => true, 'message' => 'Sukses', 'data' => $user], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'password'              => 'nullable|min:6|max:8|alpha_num|confirmed',
                'password_confirmation' => 'nullable'
            ], [
                'password.min'       => 'Password minimal :min karakter',
                'password.max'       => 'Password maksimal :max karakter',
                'password.alpha_num' => 'Kombinasi password hanya huruf dan atau angka saja',
                'password.confirmed' => 'Password dan konfirmasi password tidak cocok'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Invalid input'
                ], 500);
            }

            $user = User::findOrFail(Auth::user()->id);

            $user->password = Hash::make($request->input('password'));

            $user->save();

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Password berhasil dihapus'
            ], 201);
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'status'  => false,
                'message' => 'An Error Accoured'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status'  => true,
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ]);
    }
}
