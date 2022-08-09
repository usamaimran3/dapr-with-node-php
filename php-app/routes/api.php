<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post(
    '/set-page-view',
    function (
        \Dapr\Client\DaprClient $client,
        Request $request) {

        $page_views = $request->page_views;

        return $client->invokeMethod(
            'POST',
            new \Dapr\Client\AppId('nodeapp'),
            "set-page-views",
            ["pageViews" => $page_views])
            ->getBody();
    }
);
