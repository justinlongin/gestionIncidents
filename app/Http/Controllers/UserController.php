<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
class UserController extends Controller
{
    
    public function login(){

        return Inertia::render('User/Login');
    }

    public function doLogin(UserRequest $request){

        $data = $request->validated();
        
        if(Auth::attempt($data)){
            $request->session()->regenerate();

            if(Auth::user()->role->nom === 'admin'){
                
               return redirect()->route('admin.index'); 
            }
            return redirect()->route('incident.index');
        }

        return back()->withErrors([
            'email' => 'Email Incorrect'
        ])->onlyInput('email');
    }

    public function logout(){
        Auth::logout();

        return redirect()->route('login')->with('succes', 'Déconnexion éffectué avec success');
    }

    public function profil(){
        $user = Auth::user()->load(['role','service','agence']);

        return Inertia::render('User/profil', [
            'user'=> $user
        ]);
    }

    public function editPassword(){
        return Inertia::render('User/editPassword');
    }
    public function updatePassword(Request $request){
        $data = $request->validate([
            'current_password' => 'required',
            'password' =>  ['required', Password::defaults(), 'confirmed']
        ]);

        $user = Auth::user();

        if(!Hash::check($request->current_password, $user->password)){
            return back()->withErrors(['current_password' => 'Le mot de passe actuel est incorrect']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->route('user.profil');
    }

    public function edit(){
        $user = Auth::user();
        return Inertia::render('User/edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request){
        $data = $request->validate([
            'name' => 'string',
            'telephone' => 'string'
            ]);

            $user = Auth::user();

            $user->update($data);
            return redirect()->route('user.profil');
    }
}
