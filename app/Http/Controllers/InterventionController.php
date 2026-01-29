<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InterventionController extends Controller
{
    public function EnCour(Incident $incident, Request $request){

        $data = $request->validate([
            'statut' => 'string',
            'technicien_id' => 'integer'
        ]); 

        $data['technicien_id'] = Auth::user()->id;

        $data['statut'] = 'En cours';

        $incident->update($data);

        return redirect()->route('incident.index')->with('success', 'Intervention en cours');
    }

    public function viewAny(){

        $interventions = Incident::with(['categorie','priorite'])->where('technicien_id', Auth::user()->id)->where('statut','<>', 'En cours')->get();

        return Inertia::render('Intervention/view', [
            'interventions' => $interventions
        ]);
    }

    public function view(){

        $interventions = Incident::with(['categorie','priorite'])->where('technicien_id', Auth::user()->id)->get();

        return Inertia::render('Intervention/view', [
            'interventions' => $interventions,
            'user' => Auth::user()->load('role')
        ]);
    }

    public function show(Incident $incident){

        return Inertia::render('Intervention/show', [
            'intervention' => $incident->load(['categorie','priorite']),

            'user' => Auth::user()->load('role')
        ]);
    }

    public function Resolution(Incident $incident, Request $request){

        $data = $request->validate([
            'statut' => 'string',
            'ended_at' => 'string',
            'conseil' => 'string',
            'solution' => 'string'
        ]); 

        $data['ended_at'] = now();

        $data['statut'] = 'Résolu';

        $incident->update($data);

        return redirect()->route('incident.index')->with('success', 'Intervention Résolu');
    }

    public function cloture(Incident $incident){

        return Inertia::render('Intervention/cloture', [
            'intervention' => $incident->load(['categorie','priorite']),

            'user' => Auth::user()->load('role')
        ]);
    }

    public function cloturer(Incident $incident, Request $request){
        $data = $request->validate([
            'statut' => 'string',
            'ended_at' => 'string'
        ]);

        $data['ended_at'] = now();

        $data['statut'] = 'Terminé';

        $incident->update($data);

        return redirect()->route('incident.index')->with('success', 'Intervention Terminé');
    }

    public function rejeter(Incident $incident, Request $request){
        $data = $request->validate([
            'statut' => 'string',
            'ended_at' => 'string'
        ]); 

        $data['ended_at'] = NULL;

        $data['statut'] = 'En attente';

        $incident->update($data);

        return redirect()->route('incident.index')->with('success', 'Intervention en attente');
    }
}
