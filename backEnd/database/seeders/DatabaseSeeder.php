<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'usuario',
            'email' => 'user@gmail.com',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);

        $this->call([
            FortuneSeeder::class,
        ]);
    }
}
