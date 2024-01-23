<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
    // Register API (POST, formdata)
    public function register(Request $request)
    {
        // data validation
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|confirmed"
        ]);

        // User Model
        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);

        // Response
        return response()->json([
            "status" => true,
            "message" => "User registered successfully."
        ]);
    }

     // Login API (POST, formdata)
    public function login(Request $request)
    {
        // data validation
        $request->validate([
            "name" => "required",
            "password" => "required"
        ]);

        // JWTAuth
        $token = JWTAuth::attempt([
            "name" => $request->name,
            "password" => $request->password
        ]);

        if(!empty($token)){

            return response()->json([
                "status" => true,
                "message" => "User logged in successfully.",
                "name" => $request->name,
                "token" => $token
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Invalid login details."
        ]);
    }

    // Profile API (GET)
    public function profile()
    {
        $userdata = auth()->user();

        return response()->json([
            "status" => true,
            "message" => "Profile data.",
            "data" => $userdata
        ]);
    }

    // Refresh Token API (GET)
    public function refreshToken()
    {
        $newToken = auth()->refresh();

        return response()->json([
            "status" => true,
            "message" => "New access token generated.",
            "token" => $newToken
        ]);
    }

    // Logout API (GET)
    public function logout()
    {
        auth()->logout();

        return response()->json([
            "status" => true,
            "message" => "User logged out successfully."
        ]);
    }
}
