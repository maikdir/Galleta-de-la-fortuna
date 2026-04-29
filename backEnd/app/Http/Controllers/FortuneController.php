<?php

namespace App\Http\Controllers;

use App\Models\Fortune;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FortuneController extends Controller
{
    public function random()
    {
        $frase = Fortune::inRandomOrder()->first();

        if (!$frase) {
            return response()->json(['frase' => null]);
        }
        return response()->json([
            'tabla' => (new Fortune)->getTable(),
            'frase' => $frase
        ]);
    }

    public function store(Request $req)
    {
        if (Fortune::where('body', $req->body)->exists()) {
            return response()->json(['error' => 'La frase ya existe'], 400);
        }

        $frase = Fortune::create([
            'body' => $req->body,
            'created-by' => $req->created_by,
            'last-modified' => now()
        ]);

        return response()->json($frase);
    }

    public function index()
    {
        return response()->json(Fortune::all());
    }

    public function update(Request $req, $id)
    {
        if (!$req->body || trim($req->body) === '') {
            return response()->json(['error' => 'La frase no puede estar vacía'], 400);
        }

        $updated = DB::table('fortune')
            ->where('id', $id)
            ->update([
                'body' => $req->body,
                'last-modified' => now()
            ]);

        return response()->json([
            'message' => 'Frase actualizada',
            'updated' => $updated
        ]);
    }

    public function destroy($id)
    {
        $frase = Fortune::findOrFail($id);
        $frase->delete();

        return response()->json(['message' => 'Frase eliminada']);
    }

}
