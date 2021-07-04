<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SetupController extends Controller
{
    public function migrate()
    {
        Artisan::call('migrate');

        return response()->json([
            'data' => array_filter(explode("\n", Artisan::output()))
        ]);
    }
}
