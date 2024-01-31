<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\StoreUserRequest;
use App\Filters\V1\CustomersFilter;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        
        return new UserResource(User::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $customer)
    {
        $includeBooks = request()->query("includeBooks");

        if ($includeBooks)
        {
            return new UserResource($customer->loadMissing("books"));
        }

        return new UserResource($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UpdateUserRequest $request, User $customer)
    {
        $customer->delete($request->all());
    }
}
