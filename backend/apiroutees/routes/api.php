<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\RecommendationController;
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

/**
 * 
 * Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 */

/**Rota para o Login */

    /** Listagem dos usuarios cadastrados, este rota serve de teste para verificar a proteção feita pelo jwt */
  

 Route::group([
    'middleware' => 'api',
    'prefix' => 'auth' 

], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register_user');
    Route::post('/login', [AuthController::class, 'login'])->name('login_user');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout_user'); 
    Route::get('/me', [AuthController::class, 'me'])->name('loggeed_in_user'); 
    Route::get('/users', [UserController::class, 'index'])->name('index_user'); 
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh_token'); 

    Route::get('{email}/show/', [UserController::class, 'show'])->name('show_user'); 
    //Route::get('/detalhes/', [UserController::class, 'details'])->name('sh_user'); 
    Route::delete('/{id}/delete', [UserController::class, 'destroy'])->name('delete_user'); 
}); 

Route::group([
    'middleware' => 'api',
    'prefix' => 'local' 

], function ($router) {
    //LOCAIS
    Route::get('/index', [LocalController::class, 'index'])->name('list_local_preferences'); 
    Route::get('/update', [LocalController::class, 'update'])->name('list_local_preferences'); 
    Route::post('/preferences', [LocalController::class, 'preferences'])->name('preference_local');
    Route::post('/register', [LocalController::class, 'store'])->name('register_local');
    Route::delete('/{id}/delete', [LocalController::class, 'destroy'])->name('delete_local'); 
    Route::get('/recommendations', [RecommendationController::class, 'similarityUsers'])->name('recommendation_calculate');
    Route::get('/recommendations/index/{email}', [RecommendationController::class, 'index'])->name('recommendation_index');
}); 

