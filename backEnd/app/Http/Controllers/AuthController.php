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
}
