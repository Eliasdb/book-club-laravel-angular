<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CustomerResource;
use App\Http\Resources\V1\CustomerCollection;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\StoreCustomerRequest;
use App\Filters\V1\CustomersFilter;


class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CustomersFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $includeBooks = $request->query("includeBooks");

        $customers = Customer::where($filterItems);

        if ($includeBooks) {
            $customers = $customers->with("books");
        }

        return new CustomerCollection($customers->paginate()->appends($request->query()));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        return new CustomerResource(Customer::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $includeBooks = request()->query("includeBooks");

        if ($includeBooks)
        {
            return new CustomerResource($customer->loadMissing("books"));
        }

        return new CustomerResource($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Customer $customer)
    {
        $customer->delete($request->all());
    }
}
