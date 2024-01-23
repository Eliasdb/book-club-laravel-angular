<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::factory()
        ->count(25)
        ->hasBooks(10)
        ->create();

        Customer::factory()
        ->count(100)
        ->hasBooks(5)
        ->create();

        Customer::factory()
        ->count(100)
        ->hasBooks(3)
        ->create();

        Customer::factory()
        ->count(5)
        ->create();
    }
}
