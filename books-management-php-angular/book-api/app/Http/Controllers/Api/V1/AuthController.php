<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\V1\CustomersFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function index(Request $request)
    {
        $filter = new CustomersFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $includeBooks = $request->query("includeBooks");

        $customers = User::where($filterItems);

        if ($includeBooks) {
            $customers = $customers->with("books");
        }

        return new UserCollection($customers->paginate()->appends($request->query()));

    }


    // Register API (POST, formdata)
    public function store(StoreUserRequest $request)
    {

        $user =  new UserResource(User::create($request->all()));

        // Response
        return response()->json([
            "message" => "Registered successfully!",
            "user" => $user,
        ]);

    }

    public function bulkUpdate()
    {
        $vat = 0.20;
        $transactions = Transaction::get();
        
        foreach ($transactions->chunk(5000) as $chunk) {
           $cases = [];
           $ids = [];
           $params = [];
        
           foreach ($chunk as $transaction) {
               $cases[] = "WHEN {$transaction->id} then ?";
               $params[] = $transaction->profit * $vat;
               $ids[] = $transaction->id;
           }
        
           $ids = implode(',', $ids);
           $cases = implode(' ', $cases);
        
           if (!empty($ids)) {
               Book::update("UPDATE transactions SET `price` = CASE `id` {$cases} END WHERE `id` in ({$ids})", $params);
           }
        }
    }
    /**
     * Update the specified resource in storage.
     */

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->all());
    }


     // Login API (POST, formdata)
    public function login(Request $request)
    {
        // data validation
        $request->validate([
            "name" => "required",
            "password" => "required"
        ]);

        $credentials = request(['name', 'password']);

        if (!auth()-> attempt($credentials)) {
            return response()->json([
                "message" => "The given data was invalid.",
                "errors" => [
                    "password" => [
                        "Invalid credentials."
                    ],
                ]
                ], status: 422);
        }

        $user = User::where('name', $request->name)->first();
        $authToken = $user->createToken('auth-token')->plainTextToken;
        $userdata = auth()->user();

        return response()->json([
            "message" => "Logged in successfully!",
            "id" => $userdata->id,
            "userName" => $userdata->name,
            "accessToken" => $authToken,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $includeBooks = request()->query("includeBooks");

        if ($includeBooks)
        {
            return new UserResource($user->loadMissing("books"));
        }

        return new UserResource($user);
    }

 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UpdateUserRequest $request, User $customer)
    {
        $customer->delete($request->all());
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
