<?php

namespace App\Events;

use App\Models\Poster;

class PosterDeleted extends Event
{
    /**
     * @var Poster
     */
    public $poster;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Poster $poster)
    {
        $this->poster = $poster;
    }
}
