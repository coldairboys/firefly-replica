@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Blog Push Only

set "ROOT_DIR=%~dp0"
set "RESULT_FILE=%ROOT_DIR%publish-result.txt"
set "AHEAD_COUNT=0"
set "NOW_TEXT="

cd /d "%ROOT_DIR%"
call :set_time

echo.
echo ==========================================
echo             Blog Push Only
echo ==========================================
echo.
echo Project folder:
echo %ROOT_DIR%
echo.

where git >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Git was not found.
    goto :write_fail
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Current folder is not a git repository.
    goto :write_fail
)

echo [1/3] Check git status
git status -sb
if errorlevel 1 (
    echo [ERROR] Failed to read git status.
    goto :write_fail
)

for /f %%i in ('git rev-list --count origin/main..HEAD 2^>nul') do set "AHEAD_COUNT=%%i"
if not defined AHEAD_COUNT set "AHEAD_COUNT=0"

if "%AHEAD_COUNT%"=="0" (
    > "%RESULT_FILE%" (
        echo Time: %NOW_TEXT%
        echo Result: no push needed
        echo Info: local branch is already in sync with origin/main
    )
    echo.
    echo [INFO] No local commits waiting to be pushed.
    goto :finish
)

echo.
echo [2/3] Push to GitHub
echo Local commits waiting to push: %AHEAD_COUNT%
git push origin main
if errorlevel 1 (
    echo [ERROR] git push failed.
    echo [TIP] Check whether GitHub can be opened in your browser.
    echo [TIP] If port 443 failed, retry later or check proxy/VPN.
    goto :write_fail
)

> "%RESULT_FILE%" (
    echo Time: %NOW_TEXT%
    echo Result: push success
    echo Local commits pushed: %AHEAD_COUNT%
    echo Info: GitHub Pages will deploy automatically
)

echo.
echo [3/3] Push completed.
echo Result file:
echo %RESULT_FILE%
goto :finish

:write_fail
> "%RESULT_FILE%" (
    echo Time: %NOW_TEXT%
    echo Result: push failed
    echo Info: check the command window for details
)
echo.
echo [FAIL] Push failed.
echo Result file:
echo %RESULT_FILE%
goto :finish

:finish
echo.
echo Press any key to close...
pause >nul
exit /b 0

:set_time
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH:mm:ss"') do set "NOW_TEXT=%%i"
if not defined NOW_TEXT set "NOW_TEXT=%date%_%time%"
exit /b 0
