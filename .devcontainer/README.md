# Dev Container Configuration

This project includes a development container configuration for use with GitHub Codespaces and VS Code Dev Containers.

## Features

- **Node.js 22**: Latest Node.js version for optimal performance
- **pnpm**: Fast, disk space efficient package manager
- **Auto-setup**: Dependencies are automatically installed when the container starts
- **VS Code Extensions**: Pre-configured with essential extensions for Nuxt development
- **Port Forwarding**: Automatic port 3000 forwarding for the dev server

## Using with GitHub Codespaces

### Setup Nuxt UI Pro License

Before creating a codespace, set up your Nuxt UI Pro license:

1. Go to your GitHub Settings > Secrets and variables > Codespaces
2. Click "New repository secret" 
3. Name: `NUXT_UI_PRO_LICENSE`
4. Value: Your Nuxt UI Pro license key (get one at https://ui.nuxt.com/pro/purchase)
5. Select which repositories can access this secret

### Creating a Codespace

1. Click the "Code" button on the repository
2. Select "Create codespace on main"
3. Wait for the codespace to build (first time takes ~2-3 minutes)
4. The dev server will start automatically at https://localhost:3000

## Using with VS Code Dev Containers

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Clone the repository
3. Open in VS Code
4. Click "Reopen in Container" when prompted (or use Command Palette > "Dev Containers: Reopen in Container")
5. Wait for the container to build
6. The dev server will start automatically

## What's Included

### Extensions
- Vue Language Features (Volar)
- Nuxtr - Complete toolkit for Nuxt
- MDC for Nuxt Content
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- Material Icon Theme

### Configuration
- Format on save enabled
- ESLint auto-fix on save
- TypeScript import preferences configured
- pnpm as default package manager

## Commands

The following commands are available in the terminal:

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript type checking
```

## Uploading Files to Codespaces

### Method 1: Drag and Drop (Easiest)
1. Open the Explorer sidebar in VS Code (Cmd/Ctrl+Shift+E)
2. Navigate to the desired folder (e.g., `app/assets`)
3. Simply drag files from your desktop and drop them into the folder
4. Multiple files can be selected and dropped at once

### Method 2: Upload via Explorer
1. Right-click on any folder in the Explorer sidebar
2. Select "Upload..."
3. Choose files from your computer
4. They'll be uploaded to the selected folder

### Method 3: Command Line
1. Open the terminal in Codespaces
2. Use the following command:
   ```bash
   # Upload to app/assets directory
   cd app/assets
   # Then drag and drop files into the terminal, or use the upload button in the terminal toolbar
   ```

### Method 4: Git Integration
For larger sets of files or frequent updates:
1. Commit and push files to a branch from your local machine
2. Pull the changes in your Codespace

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, the dev server will automatically find the next available port. All ports opened by the application are automatically forwarded.

### Rebuilding the Container
If you need to rebuild the container:
1. Command Palette (Cmd/Ctrl+Shift+P)
2. "Dev Containers: Rebuild Container"

### Performance Issues
The pnpm store is persisted in a volume to improve performance across container rebuilds.

### Native Module Errors
If you see errors about `better-sqlite3` or other native modules:
1. Run `pnpm rebuild` in the terminal
2. Restart the dev server with `pnpm dev`