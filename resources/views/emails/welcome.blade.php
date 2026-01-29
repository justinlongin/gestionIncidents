<!DOCTYPE html>
<html>
<head>
    <title>Bienvenue</title>
</head>
<body>
    <h1>Bienvenue, {{ $user->name ?? explode('@', $user->email)[0] }} !</h1>
    <p>Votre compte a été créé avec le type : {{ $user->type }}.</p>
    <p>Votre mot de passe temporaire est : <strong>{{ $password }}</strong></p>
    <p>Changez-le dès votre première connexion.</p>
</body>
</html>