<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingsResource;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return SettingsResource::collection(Setting::all());
    }

    public function get($key)
    {
        return new SettingsResource(Setting::findOrFail($key));
    }

    public function set(Request $request, $key)
    {
        $this->validate($request, [
            'value' => 'required'
        ]);

        $setting = Setting::updateOrCreate(
            ['key' => $key],
            ['key' => $key, 'value' => $request->value]
        );

        return new SettingsResource($setting);
    }
}
