<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $req){


        $user = User::where('email', $req->email)->first();

        if(!$user || !Hash::check($req->password, $user->password)){
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }


        return response()->json(['user'=>$user]);
    }

    public function register(Request $req)
    {
        if (!$req->name || !$req->email || !$req->password) {
            return response()->json(['error' => 'Faltan datos'], 400);
        }

        if (User::where('email', $req->email)->exists()) {
            return response()->json(['error' => 'El email ya está registrado'], 400);
        }

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'role' => 'user'
        ]);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user
        ]);
    }

}
