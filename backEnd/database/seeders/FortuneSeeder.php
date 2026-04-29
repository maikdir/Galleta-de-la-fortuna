<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Fortune;

class FortuneSeeder extends Seeder
{
    public function run(): void
    {
        Fortune::insert([
            [
                'body' => 'A veces perderse es la única forma de encontrarse.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No todo tiene que tener sentido para ser real.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Las cosas más importantes suelen ser invisibles al principio.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Crecer también es aprender a soltar.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Hay belleza en lo que todavía no entendés.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No estás atrasado, estás en tu propio tiempo.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Lo que sentís es válido, incluso cuando no sabés explicarlo.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Todo cambia, incluso lo que hoy parece eterno.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No hace falta encajar para ser suficiente.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'A veces el silencio también dice todo.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Está bien no tener todas las respuestas.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Lo que hoy duele, mañana puede enseñarte algo.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Ser distinto también es una forma de pertenecer.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No te apures, todo llega cuando tiene que llegar.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Incluso los días grises tienen su propia luz.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No todo lo roto necesita ser arreglado.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'A veces lo que buscás también te está buscando.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'No sos lo que te pasó, sos lo que hacés con eso.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Sentir mucho no es un defecto.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
            [
                'body' => 'Lo simple también puede ser profundo.',
                'created-by' => 'admin',
                'last-modified' => now()
            ],
        ]);
    }
}
