<?php

namespace App\Providers;

use App\Events\PosterDeleted;
use App\Listeners\DeletePosterImage;
use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        PosterDeleted::class => [
            DeletePosterImage::class
        ],
        PosterUpdating::class => [
            DeletePosterImage::class
        ]
    ];
}
