<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
           ->withRouting(
               web: __DIR__ . '/../routes/web.php',
               api: __DIR__ . '/../routes/api.php',
               commands: __DIR__ . '/../routes/console.php',
               health: '/up',
           )
           ->withMiddleware(function (Middleware $middleware) {
               $middleware->web(append: [
                   HandleInertiaRequests::class,
               ]);

               $middleware->validateCsrfTokens(except: [
                   '/deposit/webhook',
                   '/digiflaz/webhook',
                   '/digiflaz/get-product-prabayar',
                   '/digiflaz/get-product-pascabayar'
               ]);

               //    $middleware->redirectGuestsTo('/');
               $middleware->redirectGuestsTo(function (Request $request) {
                   if ($request->is('api/*')) {
                       return null;
                   } else {
                       return route('login');
                   }
               });
           })
           ->withExceptions(function (Exceptions $exceptions) {
               $exceptions->render(function (AuthenticationException $e, Request $request) {
                   if ($request->is('api/*')) {
                       return response()->json([
                           'message' => $e->getMessage(),
                       ], 401);
                   }
               });
           })
           ->create();
