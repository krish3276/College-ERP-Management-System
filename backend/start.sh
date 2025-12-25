#!/bin/bash

echo "========================================"
echo "College ERP Backend - Quick Start"
echo "========================================"
echo ""

echo "[1/5] Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi
echo "✓ Dependencies installed successfully"
echo ""

echo "[2/5] Checking for .env file..."
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file and set:"
    echo "   - DB_PASSWORD (your PostgreSQL password)"
    echo "   - JWT_SECRET (a strong random secret)"
    echo ""
    echo "After editing .env, run this script again."
    exit 0
fi
echo "✓ .env file exists"
echo ""

echo "[3/5] Creating uploads directory..."
mkdir -p uploads
echo "✓ Uploads directory created"
echo ""

echo "[4/5] Database setup instructions:"
echo ""
echo "Please run these commands in PostgreSQL (psql):"
echo "  1. CREATE DATABASE college_erp;"
echo "  2. \\c college_erp"
echo "  3. \\i database/schema.sql"
echo "  4. \\i database/seed.sql"
echo ""
echo "Or run: psql -U postgres -d college_erp -f database/schema.sql"
echo "        psql -U postgres -d college_erp -f database/seed.sql"
echo ""
read -p "Have you set up the database? (y/n): " ready
if [ "$ready" != "y" ] && [ "$ready" != "Y" ]; then
    echo ""
    echo "Please set up the database first, then run this script again."
    exit 0
fi
echo ""

echo "[5/5] Starting server in development mode..."
echo ""
echo "Server will start on http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo ""
echo "========================================"
echo ""
npm run dev
