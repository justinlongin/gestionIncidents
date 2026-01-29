<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Incident;
use App\Policies\IncidentPolicy;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
        Gate::policy(Incident::class, IncidentPolicy::class);
        Gate::define('admin', function (User $user) {
            return $user->role_id === 3;
        });
    }
}
