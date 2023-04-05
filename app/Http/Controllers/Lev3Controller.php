<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;

class Lev3Controller extends Controller
{
    public function __invoke(Category $lev1, Category $lev2, Item $item)
    {
        $item->load(['category', 'specs', 'features', 'icons']);

        return view('items.show', [
            'parents' => $item->parents,
            'current' => $item,
        ]);
    }
}
