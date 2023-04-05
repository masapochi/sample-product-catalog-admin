<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->sentence(2);
        $slug = Str::slug($name, '-');
        $date = fake()->dateTimeBetween('-1year');
        return [
            'created_at'  => $date,
            'updated_at'  => $date,
            'parent_id'   => 0,
            'slug'        => $slug,
            'name'        => $name,
            'description' => fake()->paragraph(),
            'priority'    => 0,
            'is_public'   => true,
        ];
    }
}
