@echo off
rem  Abre el sitio en tu computador para revisarlo antes de publicarlo.
rem  No instala nada. Para detenerlo, cierra esta ventana.
setlocal
cd /d "%~dp0"
title Veinticinco siglos de pedagogia - revision local
color 0B

echo.
echo   ===============================================================
echo     VEINTICINCO SIGLOS DE PEDAGOGIA
echo     Revision local, antes de publicar
echo   ===============================================================
echo.
echo   Arrancando el servidor. El navegador se abre solo.
echo   Deja esta ventana abierta mientras revisas el sitio.
echo.

where py >nul 2>&1
if %errorlevel%==0 goto conpy

where python >nul 2>&1
if %errorlevel%==0 goto conpython

goto conpowershell


:conpy
echo   Usando Python.
echo   El sitio esta en:       http://localhost:8080
echo   Para comprobar que no falte nada:
echo                           http://localhost:8080/revision.html
echo.
start "" http://localhost:8080
py -3 -m http.server 8080
goto fin


:conpython
echo   Usando Python.
echo   El sitio esta en:       http://localhost:8080
echo   Para comprobar que no falte nada:
echo                           http://localhost:8080/revision.html
echo.
start "" http://localhost:8080
python -m http.server 8080
goto fin


:conpowershell
echo   No encontre Python, asi que uso el servidor de Windows.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0servidor.ps1"
if %errorlevel% neq 0 goto sinservidor
goto fin


:sinservidor
echo.
echo   No pude arrancar el servidor. No pasa nada: abro el sitio directamente.
echo   Asi se ve igual; lo unico que cambia es la direccion en la barra.
echo.
start "" "%~dp0index.html"
echo   Pulsa una tecla para cerrar esta ventana.
pause >nul
goto :eof


:fin
echo.
echo   Servidor detenido.
pause >nul
