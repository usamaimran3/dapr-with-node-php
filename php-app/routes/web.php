<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get(
    '/',
    function (\Dapr\State\StateManager $stateManager) {
        $state = new \App\Models\ExampleState();
        $stateManager->load_object($state);
        $page_views = $state->page_views;

        return view('welcome', ['page_views' => $page_views]);
    }
);
