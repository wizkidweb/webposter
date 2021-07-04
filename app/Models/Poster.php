<?php
namespace App\Models;

use App\Events\PosterDeleted;
use App\Events\PosterUpdating;
use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'title',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => PosterDeleted::class,
        'updating' => PosterUpdating::class
    ];

}
