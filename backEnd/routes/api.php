<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SuggestionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FortuneController;

Route::get('/frase', [FortuneController::class, 'random']);
Route::post('/frases', [FortuneController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/frases', [FortuneController::class, 'index']);

Route::post('/suggestions', [SuggestionController::class, 'storeSuggestion']);
Route::get('/suggestions', [SuggestionController::class, 'index']);
Route::post('/suggestions/{id}/approve', [SuggestionController::class, 'approveSuggestion']);
Route::post('/suggestions/{id}/reject', [SuggestionController::class, 'rejectSuggestion']);
Route::get('/suggestions/approved', [SuggestionController::class, 'approved']);
Route::get('/suggestions/rejected', [SuggestionController::class, 'rejected']);


Route::put('/frases/{id}', [FortuneController::class, 'update']);
Route::delete('/frases/{id}', [FortuneController::class, 'destroy']);
