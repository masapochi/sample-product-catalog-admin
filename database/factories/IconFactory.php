<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Icon>
 */
class IconFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->sentence(5);
        $slug = Str::slug($name, '-');
        $date = fake()->dateTimeBetween('-1year');

        return [
            'created_at'  => $date,
            'updated_at'  => $date,
            'slug'        => $slug,
            'name'        => $name,
            'priority'    => 0,
            'is_public'   => true,
        ];
    }
}
