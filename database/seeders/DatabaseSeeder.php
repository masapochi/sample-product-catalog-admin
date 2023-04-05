<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Feature;
use App\Models\Icon;
use App\Models\Item;
use App\Models\Spec;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()
            ->has(Category::factory()
                ->has(Item::factory()
                    ->has(Feature::factory()->count(random_int(2, 3)), 'features')
                    ->has(Spec::factory()->count(random_int(4, 8)), 'specs')
                    ->has(Icon::factory()->count(random_int(2, 3)), 'icons')
                    ->count(random_int(3, 8)), 'items')
                ->count(random_int(3, 8)), 'children')
            ->count(random_int(8, 8))
            ->create();
    }
}
