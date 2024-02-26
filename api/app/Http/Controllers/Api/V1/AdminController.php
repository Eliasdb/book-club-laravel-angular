<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\V1\CustomersFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\V1\User\UserCollection;
use App\Http\Resources\V1\User\UserResource;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function admin_stats(Request $request)
    {
        $users = User::get()->all();
        $books = Book::get()->all();
        $loaned_books = Book::where('status', '=' , 'loaned')->get()->all();

        $action_books = Book::where('genre', '=', 'action')->get()->all();
        $adventure_books = Book::where('genre', '=', 'adventure')->get()->all();
        $comedy_books = Book::where('genre', '=', 'comedy')->get()->all();
        $crime_books = Book::where('genre', '=', 'crime')->get()->all();
        $drama_books = Book::where('genre', '=', 'drama')->get()->all();
        $fantasy_books = Book::where('genre', '=', 'fantasy')->get()->all();
        $history_books = Book::where('genre', '=', 'history')->get()->all();
        $horror_books = Book::where('genre', '=', 'horror')->get()->all();
        $mystery_books = Book::where('genre', '=', 'mystery')->get()->all();
        $non_fiction_books = Book::where('genre', '=', 'non fiction')->get()->all();
        $thriller_books = Book::where('genre', '=', 'thriller')->get()->all();

        $count_array = [count($action_books), count($adventure_books), count($comedy_books), count($crime_books), 
        count($drama_books), count($fantasy_books), count($history_books),count($horror_books), count($mystery_books), 
        count($non_fiction_books),count($thriller_books)
    ];

        return [
            'data' => [
                'userCount' => count($users),
                'bookCount' => count($books),
                'countArray' => $count_array
            ],

        ];
    }
}
