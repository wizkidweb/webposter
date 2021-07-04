<?php

namespace App\Http\Controllers;

use App\Http\Resources\PosterResource;
use App\Models\Poster;
use Illuminate\Http\Request;

class PosterController extends Controller
{
    public function index()
    {
        return PosterResource::collection(Poster::all());
    }

    public function get($id)
    {
        $poster = Poster::findOrFail($id);
        return new PosterResource($poster);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'string',
            'image' => 'file'
        ]);

        $poster = Poster::findOrFail($id);

        if ($request->title) {
            $poster->title = $request->title;
        }

        if ($request->image) {
            $poster->image = $this->storeFile($request->file('image'));
        }

        $poster->save();
        return new PosterResource($poster);
    }

    public function insert(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'image' => 'required|file'
        ]);

        $poster = Poster::create([
            'title' => $request->title,
            'image' => $this->storeFile($request->file('image'))
        ]);

        return (new PosterResource($poster))
            ->response()
            ->setStatusCode(201);
    }

    protected function storeFile(\Illuminate\Http\UploadedFile $file): string
    {
        $name = time() . '.' . $file->getClientOriginalExtension();
        $destinationPath = storage_path('/app/images');
        $file->move($destinationPath, $name);

        return $name;
    }

    public function delete($id)
    {
        $poster = Poster::findOrFail($id);
        $poster->delete();

        return (new PosterResource($poster))
            ->response()
            ->setStatusCode(204);
    }
}
