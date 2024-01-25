<?php

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Controllers\Api\V1\BookController;
use App\Http\Controllers\Api\V1\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//api/v1/
Route::group(["prefix" => "v1", "namespace" => "App\Http\Controllers\Api\V1"], function()
{
    Route::apiResource("customers", CustomerController::class);
    Route::apiResource("books", BookController::class);
    Route::post("register", [ApiController::class, "register"]);
    Route::post("login", [ApiController::class, "login"]);
});



Route::group([
    "prefix" => "v1",
    "middleware" => ["auth:api"]
], function(){

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("refresh", [ApiController::class, "refreshToken"]);
    Route::get("logout", [ApiController::class, "logout"]);
});