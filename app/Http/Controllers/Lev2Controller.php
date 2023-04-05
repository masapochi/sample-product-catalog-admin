<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class Lev2Controller extends Controller
{
    public function __invoke(Category $lev1, Category $lev2)
    {
        $lev2->load(['items']);
        return view('items.list', [
            'parents' => $lev2->parents,
            'current' => $lev2,
            'list'    => $lev2->items,
        ]);
    }
}
