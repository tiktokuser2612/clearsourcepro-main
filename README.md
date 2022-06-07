# ClearSourcePro project

## Install local env
1. Clone the repo
2. Install composer dependencies with
    ```shell script
    composer install
    ```
3. Configure Laravel by running
    ```shell script
    php artisan key:generate
    php artisan storage:link
    php artisan migrate
    php artisan passport:install
    php artisan passport:keys
    php artisan passport:client --password
    ```
4. Copy .env.example to .env file and put values including database server information
