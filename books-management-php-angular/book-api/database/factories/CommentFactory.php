<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "post_id" =>  32,
            "poster" => 'Elias De Bock',
            "photo_url" => 'https://material.angular.io/assets/img/examples/shiba1.jpg',
            "content" => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, deserunt quir. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, deserunt quir.',
        ];
    }
}
