<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function ($router) {
    $router->get('', function() {
        return [
            'version' => '1.0.0'
        ];
    });

    $router->post('setup/migrate', 'SetupController@migrate');

    $router->group(['prefix' => 'posters'], function ($router) {
        $router->get('/', 'PosterController@index');
        $router->get('{id}', 'PosterController@get');
        $router->patch('{id}', 'PosterController@update');
        $router->post('/', 'PosterController@insert');
        $router->delete('{id}', 'PosterController@delete');
    });

    $router->group(['prefix' => 'settings'], function ($router) {
        $router->get('/', 'SettingsController@index');
        $router->get('{key}', 'SettingsController@get');
        $router->put('{key}', 'SettingsController@set');
    });
});

$router->get('/{route:.*}/', function() {
    return view('app');
});
