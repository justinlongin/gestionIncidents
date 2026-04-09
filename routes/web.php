<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use App\Models\Incident;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');


Route::resource('/incident', IncidentController::class)->middleware(['auth', 'verified']);



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('guest')->controller(UserController::class)->group(function(){

    Route::get('/login', 'login')->name('login');
    Route::post('/login', 'doLogin');
});

Route::post('/logout', [UserController::class,'logout'])->middleware('auth', 'verified')->name('logout');

Route::controller(InterventionController::class)->middleware('auth')->group(function () {
    Route::put('/incident/{incident}/Encour', 'Encour')->name('Encour');
    Route::get('/intervention/view', 'view')->name('Intervention.view');
    Route::get('/intervention/view/{incident}', 'show')->name('Intervention.show');
    Route::put('/intervention/view/{incident}', 'Resolution')->name('Resolution');
    Route::get('/intervention/cloture/{incident}', 'cloture')->name('Intervention.cloture');
    Route::put('/intervention/cloture/{incident}', 'cloturer')->name('Intervention.cloturer');
});

Route::controller(AdminController::class)->middleware('auth')->name('admin.')->group(function (){
    Route::get('/admin', 'index')->name('index');
    Route::get('/admin/utilisateur', 'utilisateur')->name('utilisateur');
    Route::get('/admin/statistique', 'statistique')->name('statistique');
    Route::get('/admin/incidents', 'incidents')->name('incidents');
});

Route::prefix('/users')->controller(AdminUserController::class)->middleware('auth')->name('users.')->group(function (){
    Route::get('/register','register')->name('register');
    Route::post('/register','signUp')->name('signup');
});

Route::get('/user/profil', [UserController::class, 'profil'])->middleware('auth')->name('user.profil');
Route::get('/user/profil/edit', [UserController::class, 'edit'])->middleware('auth')->name('user.edit');
Route::get('/user/profil/edit/password', [UserController::class, 'editPassword'])->middleware('auth')->name('user.editPassword');
Route::put('/user/profil/edit/password', [UserController::class, 'updatePassword'])->middleware('auth');
Route::put('/user/profil/edit', [UserController::class, 'update'])->middleware('auth');

Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])
->name('notifications.read');