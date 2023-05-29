<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    public function store(Request $request)
    {
            $validatedData = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'price' => 'required|numeric',
        ]);

        $book = Book::create($request->all());
        return response()->json($book);
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
            $validatedData = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'price' => 'required|numeric',
        ]);

        $book = Book::findOrFail($id);
        $book->update($request->all());
        return response()->json($book);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json('Book deleted successfully');
    }
}
