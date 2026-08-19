@echo off
echo ======================================================================
echo VOCAB & ROLEPLAY LEARNING SYSTEM - FULLSTACK SERVER LAUNCHER
echo ======================================================================
echo.

SET PYTHON_PATH=C:\Users\Admin\AppData\Local\Programs\Python\Python311\python.exe

IF EXIST "%PYTHON_PATH%" (
    echo Starting Fullstack REST API Server with SQLite3 Database at http://localhost:8080 ...
    start "" http://localhost:8080
    "%PYTHON_PATH%" server.py
) ELSE (
    echo Python path not found at default location. Trying system python...
    start "" http://localhost:8080
    python server.py
)

pause
