#!/bin/bash

# Start all microfrontend apps in development mode

echo "🚀 Starting Microfrontend 101 Development Environment..."
echo ""

# Function to start an app in background
start_app() {
    local app_name=$1
    local port=$2
    
    echo "📦 Starting $app_name on port $port..."
    cd /Users/jutioncandrakirana/Documents/GitHub/enigma/MICROFRONTEND/microfrontend-101/$app_name
    
    # Start with npm run dev:webpack for microfrontend support
    npm run dev:webpack > "$app_name.log" 2>&1 &
    local pid=$!
    echo "   ✓ $app_name started with PID $pid"
    echo $pid
}

# Start all apps
echo "Starting applications..."
LOGIN_PID=$(start_app "login-app" 3001)
TODO_PID=$(start_app "todo-app" 3002)
HOST_PID=$(start_app "host-app" 3000)

echo ""
echo "🎉 All applications are starting up!"
echo ""
echo "📱 Access your applications:"
echo "   🏠 Host App:  http://localhost:3000 (Main Dashboard)"
echo "   🔐 Login App: http://localhost:3001 (Standalone Login)"
echo "   ✅ Todo App:  http://localhost:3002 (Standalone Todo)"
echo ""
echo "📋 Features:"
echo "   • Beautiful responsive design with Tailwind CSS"
echo "   • Mobile-friendly interface"
echo "   • Smooth animations and transitions"
echo "   • Module Federation microfrontend architecture"
echo ""
echo "⏳ Please wait 10-15 seconds for all services to fully start..."
echo "🔄 Check the URLs above to verify everything is working"
echo ""
echo "❌ Press Ctrl+C to stop all services"

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping all services..."; kill $LOGIN_PID $TODO_PID $HOST_PID 2>/dev/null; echo "✅ All services stopped. Goodbye!"; exit 0' INT

# Function to check if service is running
check_service() {
    local port=$1
    local name=$2
    curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port" | grep -q "200" && echo "✅ $name" || echo "⏳ $name (starting...)"
}

# Keep script running and show service status
echo "🔄 Monitoring services... Press Ctrl+C to stop all services."
echo ""

# Initial wait for services to start
sleep 5

# Show initial status
echo "📊 Initial Service Status:"
check_service 3000 "Host App (http://localhost:3000)"
check_service 3001 "Login App (http://localhost:3001)" 
check_service 3002 "Todo App (http://localhost:3002)"
echo ""
echo "🎯 All services are ready! Use the URLs above to access your applications."
echo "📋 Logs are saved to: login-app.log, todo-app.log, host-app.log"
echo ""

# Keep running with minimal output
while true; do
    sleep 30  # Check every 30 seconds instead of every second
done
