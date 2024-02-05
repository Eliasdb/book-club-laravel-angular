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
        $genre = $this->faker->randomElement(['non fiction', 'fantasy', 'self help', 'action', 'adventure', 'romance']);
        $year = $this->faker->randomElement(['2001', '1999', '1927', '1997', '1967', '1985', '1963', '1977']);


        return [
            "user_id" => NULL,
            "photo_url" => "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
            "title" => $this->faker->name(),
            "genre" => $genre,
            "author" => $this->faker->name(),
            "status" => "Available",
            "published_date" => $year,
        ];
    }
}