<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
       $author  = Author::all();
        return response()->json($author);
    }

    public function store(Request $request)
    {
        $author = Author::create($request->all());
        return response()->json($author);
    }

    public function show($id)
    {
        $author = Author::findOrFail($id);
        return response()->json($author);
    }

    public function update(Request $request, $id)
    {
        $author = Author::findOrFail($id);
        $author->update($request->all());
        return response()->json($author);
    }

    public function destroy($id)
    {
        $author = Author::findOrFail($id);
        $author->delete();
        return response()->json('Author deleted successfully');
    }

}
