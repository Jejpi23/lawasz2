<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Author extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'authors';
    protected $primaryKey = '_id';
    protected $guarded = [];
}
