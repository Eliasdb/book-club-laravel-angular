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
        $genre = $this->faker->randomElement(['non fiction', 'fantasy', 'self help']);

        return [
            "customer_id" => NULL,
            "photo_url" => $this->faker->url(),
            "title" => $this->faker->name(),
            "genre" => $genre,
            "author" => $this->faker->name(),
            "status" => "In stock",
            "published_date" => $this->faker->dateTimeThisDecade(),
            "last_loaned_date" => NULL,
        ];
    }
}