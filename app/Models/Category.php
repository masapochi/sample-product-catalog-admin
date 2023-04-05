<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get all of the children for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    /**
     * Get all of the items for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'category_id', 'id');
    }

    /**
     * Get the parentCategory that owns the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parentCategory(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

    public function getParentsAttribute()
    {
        $collection = collect([]);
        $parent     = $this->parentCategory;

        while ($parent) {
            $collection->push($parent);
            $parent = $parent->parentCategory;
        }

        return $collection->reverse();
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
        return asset("images/categories/{$this->slug}/hero.jpg");
    }
}
