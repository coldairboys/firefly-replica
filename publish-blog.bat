@echo off
setlocal
title Blog Publish Helper

rem ================================================
rem Blog publish helper
rem 1. Show git status
rem 2. git add .
rem 3. Ask for commit message
rem 4. git commit
rem 5. git push origin main
rem 6. Write result to publish-result.txt
rem ================================================

set "ROOT_DIR=%~dp0"
set "RESULT_FILE=%ROOT_DIR%publish-result.txt"
set "DEFAULT_MSG=update blog content"

cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo           Blog Publish Helper
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

echo [1/5] Check git status
git status -sb
if errorlevel 1 (
    echo [ERROR] Failed to read git status.
    goto :write_fail
)

echo.
set /p COMMIT_MSG=Enter commit message (default: update blog content): 
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=%DEFAULT_MSG%"

echo.
echo [2/5] Stage all changes
git add .
if errorlevel 1 (
    echo [ERROR] git add failed.
    goto :write_fail
)

echo [3/5] Check staged changes
git diff --cached --quiet
set "DIFF_EXIT=%errorlevel%"
if "%DIFF_EXIT%"=="0" (
    > "%RESULT_FILE%" (
        echo Time: %date% %time%
        echo Result: no changes to commit
        echo Info: commit and push were skipped
    )
    echo [INFO] No staged changes found.
    goto :finish
)
if not "%DIFF_EXIT%"=="1" (
    echo [ERROR] Unable to inspect staged changes.
    goto :write_fail
)

echo.
echo [4/5] Create commit
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo [ERROR] git commit failed.
    goto :write_fail
)

echo.
echo [5/5] Push to GitHub
git push origin main
if errorlevel 1 (
    echo [ERROR] git push failed.
    goto :write_fail
)

for /f "delims=" %%i in ('git log -1 --pretty^=oneline') do set "LAST_COMMIT=%%i"

> "%RESULT_FILE%" (
    echo Time: %date% %time%
    echo Result: push success
    echo Last commit: %LAST_COMMIT%
    echo Info: GitHub Pages will deploy automatically
)

echo.
echo [OK] Push completed.
echo Result file:
echo %RESULT_FILE%
goto :finish

:write_fail
> "%RESULT_FILE%" (
    echo Time: %date% %time%
    echo Result: push failed
    echo Info: check the command window for details
)
echo.
echo [FAIL] Publish failed.
echo Result file:
echo %RESULT_FILE%
goto :finish

:finish
echo.
echo Press any key to close...
pause >nul
exit /b 0
