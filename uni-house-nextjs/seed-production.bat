@echo off
echo ========================================
echo Seed Services to Production Database
echo ========================================
echo.

set /p MONGODB_URI="Nhap MONGODB_URI cua production: "

if "%MONGODB_URI%"=="" (
    echo Loi: MONGODB_URI khong duoc de trong!
    pause
    exit /b 1
)

echo.
echo Dang seed du lieu...
echo.

node scripts/seed-services.js

echo.
echo Hoan thanh!
pause
