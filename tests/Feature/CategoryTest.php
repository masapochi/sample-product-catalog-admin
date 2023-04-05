<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Feature;
use App\Models\Item;
use App\Models\Spec;
use App\Models\Icon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public $rootCategories;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function initializeModels()
    {
        $this->rootCategories = Category::factory()
            ->has(Category::factory()
                ->has(Item::factory()
                    ->has(Feature::factory()->count(3), 'features')
                    ->has(Spec::factory()->count(3), 'specs')
                    ->has(Icon::factory()->count(3), 'icons')
                    ->count(3), 'items')
                ->count(3), 'children')
            ->count(3)->create();
    }

    /**
     * @test
     */
    public function first_test()
    {
        $this->withoutExceptionHandling();
        $this->initializeModels();

        $this->assertTrue(true);
    }
}
