<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::apiResource('books', BookController::class);
Route::apiResource('authors', AuthorController::class);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
