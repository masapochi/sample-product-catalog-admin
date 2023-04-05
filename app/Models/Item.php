<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get all of the specs for the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function specs(): HasMany
    {
        return $this->hasMany(Spec::class, 'item_id', 'id');
    }

    /**
     * Get all of the features for the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function features(): HasMany
    {
        return $this->hasMany(Feature::class, 'item_id', 'id');
    }

    /**
     * The icons that belong to the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function icons(): BelongsToMany
    {
        return $this->belongsToMany(Icon::class, 'icon_item', 'item_id', 'icon_id')
            ->using(IconItem::class)
            ->withTimestamps();
    }

    /**
     * Get the category that owns the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function getParentsAttribute()
    {
        $parentCategories = $this->category->parents;
        return $parentCategories->push($this->category);
    }

    public function path()
    {
        return url(
            $this->parents
                ->push($this)
                ->pluck('slug')
                ->implode('/')
        );
    }

    public function heroImage()
    {
        return asset("images/items/{$this->slug}/hero.jpg");
    }
}
