@echo off
echo ==========================================
echo   VIXLUXIA - AUTO GITHUB PUSH SCRIPT
echo ==========================================
echo.
echo Nettoyage des anciens identifiants GitHub en cache...
cmdkey /delete:LegacyGeneric:target=git:https://github.com >nul 2>&1
cmdkey /delete:git:https://github.com >nul 2>&1

echo Configuration du gestionnaire d'identifiants...
git config --global credential.helper manager

echo.
echo Envoi du code vers GitHub...
echo (Une fenetre va s'ouvrir pour te demander de te connecter a ton compte Maxthiba24)
echo.

git push -u origin main

echo.
if %errorlevel% neq 0 (
    echo [ERREUR] L'envoi a echoue. Assure-toi de te connecter avec le bon compte !
) else (
    echo [SUCCES] Le code a ete envoye avec succes sur GitHub !
)
echo.
pause
