<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feature>
 */
class FeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $date = fake()->dateTimeBetween('-1year');

        return [
            'created_at' => $date,
            'updated_at' => $date,
            'content'    => fake()->sentence(30),
            'priority'   => 0,
            'is_public'  => true,
        ];
    }
}
