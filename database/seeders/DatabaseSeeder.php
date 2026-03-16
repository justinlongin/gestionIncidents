<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Agence;
use App\Models\Service;
use App\Models\Incident;
use App\Models\Priorite;
use App\Models\Categorie;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // User::factory(10)->create();

         Agence::create([
            'nom' => fake()->title(),
            'adresse' => fake()->address(),
            'region' => 'CENTRE'
        ]);

        Service::create([
            'nom' => fake()->title(),
            'agence_id' => 1,
        ]);

        Role::create([
            'nom' => 'user',
        ]);
        Role::create([
            'nom' => 'technicien',
        ]);
        Role::create([
            'nom' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'telephone' => '8397278',
            'password' => '0000',
            'agence_id' => 1,
            'service_id' =>1,
            'role_id' => 1
        ]);

        User::factory()->create([
            'name' => 'Fabien Bone',
            'email' => 'fabien@bone.com',
            'telephone' => '83972789',
            'password' => '0000',
            'agence_id' => 1,
            'service_id' =>1,
            'role_id' => 2
        ]);

        User::factory()->create([
            'name' => 'Romain Franck',
            'email' => 'romain@franck.com',
            'telephone' => '8546771',
            'password' => '0000',
            'agence_id' => 1,
            'service_id' =>1,
            'role_id' => 3
        ]);


        for($i=1 ; $i <= 4; $i++){
            Categorie::create([
                'nom' => "categorie $i",
  
            ]);
        }     
        for($i=1 ; $i <= 4; $i++){
            Priorite::create([
                'nom' => "priorite $i",
  
            ]);
        }  

        Incident::factory(20)->create();
    }
}
