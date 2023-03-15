<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use InterventionImage;

/**
* Trait UploadAble
* @package App\Traits
*/
trait UploadAble
{
    /**
    * @param UploadedFile $file
    * @param null $folder
    * @param string $disk
    * @param null $filename
    * @return false|string
    */
    public function uploadFile(UploadedFile $file, $folder = null, $disk = 'public', $filename = null) {
        $name = !is_null($filename) ? $filename : Str::random(25) . "." . $file->getClientOriginalExtension();
        return $file->storePubliclyAs(
            $folder,
            $name,
            $disk
        );
    }

    /**
    * @param null $path
    * @param string $disk
    */
    public function deleteFile($path = null, $disk = 'public') {
        Storage::disk($disk)->delete($path);
    }

    /**
    * @param null $path
    * @param string $disk
    */
    public function fileExists($path = null, $disk = 'public') {
        return Storage::disk($disk)->exists($path);
    }
}
