<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\WelcomeMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\registerRequest;

class AdminUserController extends Controller
{
    //

    public function register(){
        $regions = ['ADAMAOUA','CENTRE', 'LITTORAL', 'OUEST', 'NORD', 'EXTREME-NORD', 'SUD', 'NORD-OUEST', 'SUD-OUEST', 'EST'];
        $roles = Role::all();
        return Inertia::render("admin/register", [
            'user' => Auth::user()->load('role'),
            'regions'=> $regions,
            'roles'=> $roles
        ]);
    }

    public function signUp(registerRequest $request){

        $generatePassword = Str::random(12);
        $user = Auth::user();
        $data = $request->validated();
        $data['password'] = Hash::make($generatePassword);
        $data['agence_id'] = $user->agence_id;
        $data['service_id'] = $user->service_id;
        if($data['region'] == null){
            $data['region'] = $user->region;
        }
        // Extraire le nom de l'email si le champ name n'est pas fourni
        if(empty($data['name']) && !empty($data['email'])){
            $data['name'] = explode('@', $data['email'])[0];
        }

        $utilissateur = User::create($data);
        Mail::to($utilissateur->email)->send(new WelcomeMail($utilissateur, $generatePassword));

        return redirect()->route('admin.utilisateur')->with('success', 'Utilisateur créé et email envoyé.');
    }
}
