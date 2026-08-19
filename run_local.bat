@echo off
echo ======================================================================
echo VOCAB & ROLEPLAY LEARNING SYSTEM - LOCAL WEB SERVER LAUNCHER
echo ======================================================================
echo.

SET PYTHON_PATH=C:\Users\Admin\AppData\Local\Programs\Python\Python311\python.exe

IF EXIST "%PYTHON_PATH%" (
    echo Starting Python HTTP Server at http://localhost:8080 ...
    start "" http://localhost:8080
    "%PYTHON_PATH%" -m http.server 8080
) ELSE (
    echo Python path not found at default location. Trying system python...
    start "" http://localhost:8080
    python -m http.server 8080
)

pause
