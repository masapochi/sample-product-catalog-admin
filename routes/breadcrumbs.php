<?php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Home
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home'));
});

// Home > Blog
Breadcrumbs::for('list', function (BreadcrumbTrail $trail, $model = null) {
    $trail->parent('home');
    if ($model->parents && $model->parents->count()) {
        foreach ($model->parents as $i => $parent) {
            $trail->push($parent->name, $parent->path());
        }
    }
    $trail->push($model->name, $model->path());
});
Breadcrumbs::for('search', function (BreadcrumbTrail $trail) {
    $trail->parent('home');
    $trail->push('Search results for "' . request()->q . '"');
});
