<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as DBModel;

class Model extends DBModel
{
    protected $fillable = [
        'name', 'scale', 'state'
    ];

    protected $appends = [
        'file_url',
    ];

    protected $casts = [
        'state' => 'boolean',
    ];

    public function getFileUrlAttribute() {
        return url('storage/models/' . $this->name);
    }
}
