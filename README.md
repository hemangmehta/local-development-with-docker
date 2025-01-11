# Node.js Development with Docker

A sample Node.js application demonstrating how to set up a local development environment using Docker, eliminating the need to install Node.js locally. This project showcases Docker-based development workflow with features like hot-reloading and debugging support.

## Why Docker-based Development?

This project demonstrates the "Docker-first" development approach, which offers several advantages:

- **No Local Node.js Required**: Develop Node.js applications without installing Node.js or npm on your machine
- **Consistent Environment**: Everyone on the team works with identical Node.js versions and dependencies
- **Isolated Development**: Project dependencies don't conflict with other projects or system packages
- **Easy Onboarding**: New team members can start development with just Docker installed
- **Production-Like Environment**: Development environment closely mirrors production setup

## Project Structure 
```
.
├── src/
│   └── app.js          # Main application file
├── .vscode/
│   └── launch.json     # VS Code debugging configuration
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Features

- Express.js REST API
- Health check endpoint
- Docker containerization
- Hot-reloading for development
- Debugging support
- Docker volume mounting for real-time development

## Prerequisites

- Docker
- Docker Compose
- Visual Studio Code (for debugging)

Note: Node.js installation is NOT required locally, as all Node.js operations run inside Docker containers.

## Development Methodology

This project uses a Docker-first development approach:

1. **Container-Based Development**:
   - All Node.js code runs inside Docker containers
   - Local source code is mounted into the container
   - Node modules are maintained in a Docker volume

2. **Development Workflow**:
   - Edit code locally with your preferred editor
   - Container automatically detects changes and reloads
   - Debug directly inside the container using VS Code
   - Run npm commands through Docker (e.g., `docker-compose exec app npm install`)

3. **Best Practices**:
   - Use `docker-compose run app npm install` for adding new packages
   - Keep node_modules in a named volume for performance
   - Use multi-stage builds for production images

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Build and start the container:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## Available Endpoints

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response Example**:
```json
{
  "message": "healthy",
  "name": "healthcheck",
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Development

### Running the Application

**Development mode with hot-reloading**:
```bash
docker-compose up
```

The application uses `nodemon` for automatic reloading during development. When running in Docker, the code changes in your local directory will automatically reflect in the container thanks to volume mounting.

## Debugging

### Using Visual Studio Code

1. Start the application in debug mode:
```bash
docker-compose up
```

2. In VS Code:
   - Open the Debug panel (Ctrl/Cmd + Shift + D)
   - Select "Docker: Attach to Node" from the dropdown
   - Press F5 or click the green play button

3. The debugger will attach to the running Docker container

### Debugging Features

- Set breakpoints by clicking the left margin in VS Code
- Use `debugger;` statements in your code
- Inspect variables in the Debug panel
- Use the debug console to evaluate expressions
- Step through code execution

### Alternative Debugging Methods

#### Chrome DevTools
1. Open Chrome and navigate to `chrome://inspect`
2. Click "Configure..." and add `localhost:9229`
3. Look for your application under "Remote Target"
4. Click "inspect" to open DevTools

#### Command Line Debugging
```bash
# View debug logs
docker-compose logs -f app
```

## Docker Configuration

### Development Setup
- Uses Node.js 18 Alpine base image
- Exposes ports 3000 (application) and 9229 (debugger)
- Mounts local directory to `/app` in container
- Preserves node_modules in a named volume

### Volume Mounting
- `.:/app`: Mounts your local directory
- `/app/node_modules`: Preserves container's node_modules

## Environment Variables

- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment setting (default: development)

## Common Issues & Troubleshooting

1. **Port Already in Use**
```bash
# Check for processes using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

2. **Debugger Not Connecting**
- Ensure port 9229 is not blocked by firewall
- Check if another debugger instance is running
- Restart the Docker container

3. **Hot Reload Not Working**
- Verify volume mounting in docker-compose.yml
- Check nodemon is running (docker-compose logs)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

