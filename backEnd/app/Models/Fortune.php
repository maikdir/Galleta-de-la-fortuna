<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fortune extends Model
{

    protected $table = 'fortune';

    protected $fillable = ['body', 'created-by', 'last-modified'];

    public $timestamps = false;
}
