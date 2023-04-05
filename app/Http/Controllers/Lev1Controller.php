<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class Lev1Controller extends Controller
{
    public function __invoke(Category $lev1)
    {
        $lev1->load(['children']);

        return view('categories.list', [
            'parents' => $lev1->parents,
            'current' => $lev1,
            'list'    => $lev1->children,
        ]);
    }
}
