<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Activities;
use App\Services\File;
class ActivityServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Activities::class, function ($app) {
            return new Activities(config('riak'));
        });

        $this->app->singleton(Jobvite::class, function ($app) {
            return new Jobvite(config('riak'));
        });

        $this->app->singleton(JobViteEmployee::class, function ($app) {
            return new JobViteEmployee(config('riak'));
        });

        $this->app->singleton(Files::class, function ($app) {
            return new Files(config('riak'));
        });
        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
