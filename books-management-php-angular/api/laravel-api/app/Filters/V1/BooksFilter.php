<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class BooksFilter extends ApiFilter
{
    protected $allowedParms = [
        "customerId" => ["eq"],
        "name" => ["eq"],
        "author" => ["eq", "ne"],
        "status" => ["eq"],
        "publishedDate" => ["eq", "lt", "lte", "gt", "gte"],
        "addedDate" => ["eq", "lt", "lte", "gt", "gte"],
        "lastLoanedDate" => ["eq", "lt", "lte", "gt", "gte"],
    ];

    protected $columnMap = [
        "customerId" => "customer_id",
        "publishedDate" => "published_date",
        "addedDate" => "added_date",
        "lastLoanedDate" => "lastLoanedDate"
    ];

    protected $operatorMap = [
        "eq" => "=",
        "lt" => "<",
        "lte" => "<=",
        "gt" => ">",
        "gte" => ">=",
        "ne" => "!=",
    ];
}