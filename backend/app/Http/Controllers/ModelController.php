<?php

namespace App\Http\Controllers;

use App\Models\Model;
use App\Traits\UploadAble;
use Illuminate\Http\Request;

class ModelController extends Controller
{
    use UploadAble;

    /**
     * Display a listing of model.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return $this->sendResponse('Retriedved Successfully.', Model::all());
    }

    /**
     * Store a newly created model in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'file' => 'required|file',
            'scale' => 'required',
            'state' => 'required',
        ]);

        $model = new Model();
        if ($request->file('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $this->uploadFile($file, 'models', 'public', $fileName);
            $model->name = $fileName;
        }
        $model->scale = $request->get('scale');
        $model->state = $request->get('state');
        $model->save();

        return $this->sendResponse('Created Successfully.', $model);
    }

    /**
     * Display the specified model.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $model = Model::find($id);
        if (is_null($model)) {
            return $this->sendErrors('Model not found.');
        }

        return $this->sendResponse('Retrieved Successfully.', $model);
    }

    /**
     * Update the model.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'scale' => 'required',
            'state' => 'required',
        ]);

        $model = Model::find($id);
        $model->scale = $request->get('scale');
        $model->state = $request->get('state');
        $model->save();

        return $this->sendResponse('Updated Successfully.', $model);
    }

    /**
     * Remove the model.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Model::destroy($id);

        return $this->sendResponse('Deleted Successfully.');
    }
}
