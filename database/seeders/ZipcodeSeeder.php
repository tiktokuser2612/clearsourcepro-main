<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Zipcode;

class ZipcodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        echo "Truncating \n";
        Zipcode::truncate();

        echo "Processing codes.json";
        $this->process_file("codes.json");

        echo "Processing codesCanada.json";
        $this->process_file("codesCanada.json");
    }

    public function process_file($file)
    {
        // Read zipcode file
        $zipcode_file_content = file_get_contents(dirname(__FILE__) . "/zipcodes/" . $file);
        $zipcode_array = json_decode($zipcode_file_content, true);

        $bulk_data = [];
        $total_count = count($zipcode_array);
        $processed = 0;

        $i = 0;
        $steps = 100;

        foreach ($zipcode_array as $zip => $value) {
            $bulk_data[] = [
                'zip' => $value['zip'],
                'city' => $value['city'],
                'state' => $value['state'],
                'country' => $value['country'],
            ];
            $i ++;
            $processed ++;

            if ($i >= $steps) {
                echo 'Inserting ' . $total_count . '/' . $processed . "\n";

                Zipcode::insert($bulk_data);
                $i = 0;
                $bulk_data = [];
            }
        }

        if (count($bulk_data) > 0) {
            Zipcode::insert($bulk_data);
        }
    }
}
