<?php

use App\Image;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

function uploadOne(UploadedFile $uploadedFile, $folder = null, $disk = 'public', $filename = null) {
    $name = !is_null($filename) ? $filename : Str::random(25);

    $file = $uploadedFile->storeAs($folder, $name.'.'.$uploadedFile->getClientOriginalExtension(), $disk);

    return $file;
}

Route::get('/', function () {
    return view('welcome')->withImage(Image::find(1)->name);
});

Route::post('/image/store', function (Request $request) {
	$request->validate([
	    'uploaded-image' => 'required|image',
	]);
	$image = $request->file('uploaded-image');
    $name = Str::slug($request->input('name')).'_'.time();
    $folder = '/uploads/images/';
    $filePath = $folder . $name. '.' . $image->getClientOriginalExtension();
    uploadOne($image, $folder, 'public', $name);

    Image::create([
    	'name' => $filePath]
    )->save();

    return new JsonResponse('success', 202);
});
