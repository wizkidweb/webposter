<?php

namespace App\Listeners;

use App\Events\PosterDeleted;
use Illuminate\Support\Facades\File;

class DeletePosterImage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PosterDeletedf  $event
     * @return void
     */
    public function handle(PosterDeleted $event)
    {
        $name = $event->poster->image;

        if ($event->poster->getOriginal('image') === $name) {
            $path = storage_path('/app/images');
            File::delete($path . '/' . $name);
        }
    }
}
