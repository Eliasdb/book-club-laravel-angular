<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genre = $this->faker->randomElement(['Drama', 'History', 'Adventure', 'Action', 'Non fiction', 'Comedy', 'Crime', 'Fantasy', 'Mystery', 'Horror', 'Thriller']);
        $year = $this->faker->randomElement(['2001', '1999', '1927', '1997', '1967', '1985', '1963', '1977', '1998', '1989']);

        return [
            "first_name" =>  $this->faker->firstName(),
            "last_name" => $this->faker->lastName(),
            "email" => $this->faker->email(),
            "phone_number" => $this->faker->phoneNumber(),
            "address" => $this->faker->streetAddress(),
            "postal_code" => $this->faker->postCode(),
            "city" => $this->faker->city(),
        ];
    }
}
