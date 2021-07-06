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

        $setting = $this->setValue($key, $request->value);

        return new SettingsResource($setting);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'settings' => 'array'
        ]);

        foreach ($request->settings as $key => $value) {
            $this->setValue($key, $value);
        }
    }

    protected function setValue($key, $value): Setting
    {
        return Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
