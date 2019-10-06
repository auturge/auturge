@echo off

rem ====================================================================================
rem Get variables, absolute paths, etc

call :GET_ABS_PATH PROJECT_ROOT "%~dp0\..\..\"
rem echo PROJECT_ROOT is "%PROJECT_ROOT%"


rem ====================================================================================
rem Set aliases

doskey cddev=cd /d %PROJECT_ROOT%



goto :eof
rem ====================================================================================

:GET_ABS_PATH
    rem call :GET_ABS_PATH PROJECT_ROOT "..\..\"
    setlocal 
    set REL_PATH=%2
    set ABS_PATH=
    pushd %REL_PATH%
    set ABS_PATH=%CD%
    popd
    endlocal & set "%1=%ABS_PATH%"
