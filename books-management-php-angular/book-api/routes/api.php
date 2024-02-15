<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\FavouriteController;
use App\Http\Controllers\Api\V1\PostController;
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
Route::group(["prefix" => "v1", "namespace" => "App\Http\Controllers\Api\V1"], function () {
    Route::apiResource("register", AuthController::class);
    Route::post("login", [AuthController::class, "login"]);
    Route::get("logout", [AuthController::class, "logout"]);

    Route::apiResource("favourites", FavouriteController::class);
    Route::apiResource("books", BookController::class);
    Route::apiResource("users", AuthController::class);
    Route::apiResource("posts", PostController::class);
    Route::apiResource("comments", CommentController::class);

});


Route::group([
    "prefix" => "v1",
    "namespace" => "App\Http\Controllers\Api\V1",
    "middleware" => ["auth:sanctum"]
], function () {


    // Route::get("profile", [ApiController::class, "profile"]);
    // Route::get("refresh", [ApiController::class, "refreshToken"]);
});
