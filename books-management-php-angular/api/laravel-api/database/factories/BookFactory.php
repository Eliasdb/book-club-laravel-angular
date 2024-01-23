<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['loaned out', 'in stock']);

        return [
            "customer_id" => Customer::factory(),
            "name" => $this->faker->name(),
            "author" => $this->faker->name(),
            "status" => $status,
            "published_date" => $this->faker->dateTimeThisDecade(),
            "added_date" => $this->faker->dateTimeThisDecade(),
            "last_loaned_date" => $status == "loaned out" ? $this->faker->dateTimeThisDecade() : NULL,
        ];
    }
}