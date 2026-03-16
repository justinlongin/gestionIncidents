#!/bin/bash
# set -e  Arrête le script en cas d'erreur

# Exécute les migrations (force pour production, sans confirmation)
php artisan migrate:fresh --force

# Optionnel : Exécute les seeders (attention : utilisez --force pour prod, mais vérifiez que ça n'insère pas de données sensibles ou dupliquées)
php artisan db:seed --force

# Optimisations pour production
# php artisan optimize:clear
# php artisan config:cache
# php artisan event:cache
# php artisan route:cache
# php artisan view:cache