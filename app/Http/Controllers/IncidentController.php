<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncidentRequest;
use App\Models\Categorie;
use App\Models\Incident;
use App\Models\Priorite;
use App\Models\User;
use App\Notifications\NewIncidentNotification;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        
        $incident = new Incident;
        $user = Auth::user();
        if($user->can('viewAny', $incident)){
            $incidents = $incident
                                ->with('categorie', 'priorite')
                                ->where('statut','=', 'En attente')
                                ->orderBy('created_at','desc')
                                ->get();
        }else {
            $incidents = $incident
                                ->with('categorie', 'priorite')
                                 ->where('user_id', $user->id)
                                 ->get();
        }

        
        return Inertia::render('Incident/Index', [
            'incidents' => $incidents,
            'user' => $user,
        ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
 
    if(Auth::user()->can('create', Incident::class)){
        $categories = Categorie::all();
        $priorites = Priorite::all();

        $incidents = Incident::where('statut', 'En cours')->where('user_id', Auth::user()->id)->count();
        // dd($incidents);

        $user = Auth::user();

        return Inertia::render('Incident/Create',[
            'categories' => $categories,
            'priorites' => $priorites,
            'user' => $user
        ]);
    } 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncidentRequest $request, Incident $incident)
    {
        $incident = new Incident;

        $data = $request->validated();
        
        $data['slug'] = Str::slug($data['titre']);


        if($request->hasFile('image')){

            $path =  $request->file('image')->store("images", "public");

            $data["image"] = $path;

            $data['user_id'] = Auth::user()->id;

            $incident->create($data);

            return redirect(route('incident.index'))->with('success','Incident enregistrer avec success');

        }

        $data['user_id'] = Auth::user()->id;

        $incident = $incident->create($data);

        $techniciens = User::where('role_id', '2')->get();

        // Envoyer la notification à tous les techniciens
        foreach ($techniciens as $technicien) {
            $technicien->notify(new NewIncidentNotification($incident));
        }

        return redirect(route('incident.index'))->with('success','Incident enregistrer avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Incident $incident)
    {
        
    if(Auth::user()->can('view', $incident)){
        $incident->load(['categorie', 'priorite']); 
        
        return Inertia::render('Incident/Show', [
            'incident' => $incident,

            'user' => Auth::user(),

        ]);
    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incident $incident)
    {    
 
        if(Auth::user()->can('update', $incident)){
            $categories = Categorie::all();

            $priorites = Priorite::all();
            $incident->load(['categorie', 'priorite']); 
            
           return Inertia::render('Incident/Edit', [
               'incident' => $incident,
               'categories' => $categories,
               'priorites' => $priorites,
                'user' => Auth::user()->load('role'),

           ]);
        };

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(IncidentRequest $request, Incident $incident)
    {

        $data = $request->validated();

  
        $data['slug'] = Str::slug($data['titre']);


    
        if($request->hasFile('image')){
           
            if($incident->image){
                Storage::disk('public')->delete($incident->image);
            }

            
            $path = $request->file('image')->store('images', 'public');

            $data['image'] = $path;

        }else{
            unset($data['image']);
            }


        $incident->update($data);
 
        return redirect()->route('incident.index')->with('success','Incident Mise à jour avec success');
  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incident $incident )
    {
        $incident->delete();
        return redirect()->back()->with('success','Incident supprimé avec success');
    }
}
