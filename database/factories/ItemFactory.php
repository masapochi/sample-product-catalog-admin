<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $random_number = fake()->numberBetween(100000, 999999);
        $name          = fake()->sentence(3);
        $slug          = Str::slug($name, '-');
        $product_code  = strtoupper(fake()->bothify('??-########'));
        $material      = fake()->randomElement(['cotton', 'wool', 'leather', 'silk', 'linen', 'cashmere']);
        $date = fake()->dateTimeBetween('-1year');

        return [
            'created_at'  => $date,
            'updated_at'  => $date,
            'code'        => $random_number,
            'slug'        => $slug,
            'name'        => $name,
            'model'       => $product_code,
            'color'       => fake()->safeColorName(),
            'description' => fake()->paragraph(),
            'material'    => $material,
            'width'       => $this->makeRandomSize(),
            'height'      => $this->makeRandomSize(),
            'depth'       => $this->makeRandomSize(),
            'weight'      => $this->makeRandomSize(),
            'priority'    => 0,
            'is_public'   => true,
        ];
    }
    public function makeRandomSize()
    {
        return
            fake()->randomFloat($nbMaxDecimals = 1, $min = 10, $max = 1000);
    }
}
