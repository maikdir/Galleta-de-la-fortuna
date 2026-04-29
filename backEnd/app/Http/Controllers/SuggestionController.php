<?php

namespace App\Http\Controllers;

use App\Models\Suggestion;
use Illuminate\Http\Request;
use App\Models\Fortune;

class SuggestionController extends Controller
{
    public function storeSuggestion(Request $req){
        if (!$req->body){
            return response()->json(['error' => 'Sugerencia inválida'], 400);
        }

        $suggestion = Suggestion::create(['body' => $req->body, 'created_by' => $req->created_by, 'status' => 'pending']);

        return response()->json($suggestion);
    }

    public function index(){
        return response()->json(Suggestion::where('status', 'pending')->get());
    }

    public function approveSuggestion($id)
    {

        $suggestion = Suggestion::findOrFail($id);

        if (Fortune::where('body', $suggestion->body)->exists()) {
            return response()->json(['error' => 'Sugerencia ya existe'], 400);
        }

        Fortune::create(['body' => $suggestion->body, 'created-by' => $suggestion->created_by, 'last-modified' => now()]);

        $suggestion->status = 'approved';
        $suggestion->save();

        return response()->json(['message' => 'Sugerencia aprobada']);


    }


    public function rejectSuggestion($id)
    {
        $suggestion = Suggestion::findOrFail($id);
        $suggestion->status = 'rejected';
        $suggestion->save();

        return response()->json(['message' => 'Sugerencia rechazada']);
    }

    public function approved()
    {
        return response()->json(Suggestion::where('status', 'approved')->get());
    }

    public function rejected()
    {
        return response()->json(Suggestion::where('status', 'rejected')->get());
    }

}
