<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Resumes;

class CommonServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->bind(Resumes::class, function ($app) {
        //     return new Resumes();
        // });

        $this->app->singleton(Resumes::class, function ($app) {
            return new Resumes(config('riak'));
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
