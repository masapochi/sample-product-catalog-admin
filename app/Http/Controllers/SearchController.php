<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke()
    {
        $q = request()->q;

        if (!$q) return redirect()->route('home');

        $items = Item::where('name', 'like', "%{$q}%")
            ->paginate()
            ->withQueryString();

        return view('search', [
            'items' => $items,
        ]);
    }
}
