@echo off
setlocal
cd /d "%~dp0"
title The Afterspace - Foundry
node "tools\foundry\server.mjs" --open
if errorlevel 1 (
  echo.
  echo The Foundry stopped with an error. Press any key to close.
  pause >nul
)
endlocal
