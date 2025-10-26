# ESLint & Prettier Setup

## Auto-fix on Save (VS Code)

The project is configured to automatically fix ESLint issues and format code when you save files in VS Code.

### Required VS Code Extensions:
- ESLint (dbaeumer.vscode-eslint)
- Prettier - Code formatter (esbenp.prettier-vscode)

### Available Commands:

```bash
# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Run both lint fix and format
npm run fix-all

# Check for lint issues (no fix)
npm run lint
```

### Auto-fix Features:
- ✅ Fixes ESLint errors automatically on save
- ✅ Formats code with Prettier on save
- ✅ Organizes imports on save
- ✅ Removes unused variables (warnings)
- ✅ Enforces consistent code style

### Manual Fix:
Run `npm run fix-all` to fix and format all files at once.
