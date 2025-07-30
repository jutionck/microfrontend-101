#!/bin/bash

echo "🛑 Stopping Microfrontend Development Environment..."

# Kill webpack dev servers
echo "📦 Stopping webpack dev servers..."
pkill -f "webpack serve" 2>/dev/null

# Kill any node processes on our ports
echo "🔌 Freeing up ports 3000, 3001, 3002..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null  
lsof -ti:3002 | xargs kill -9 2>/dev/null

# Clean up log files
echo "🧹 Cleaning up log files..."
rm -f login-app.log todo-app.log host-app.log

echo "✅ All services stopped successfully!"
echo "💡 Run ./start-dev.sh to restart the development environment."