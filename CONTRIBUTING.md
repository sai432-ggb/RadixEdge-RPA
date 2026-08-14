# Contributing to RadixEdge RPA

Thank you for your interest in contributing to RadixEdge RPA! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Report issues responsibly
- Focus on constructive feedback

## Getting Started

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub
```

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/radixedge-rpa.git
cd radixedge-rpa
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Make Your Changes
- Follow existing code style
- Keep commits atomic and descriptive
- Test your changes locally

### 6. Run Tests & Linting
```bash
npm test
npm run lint
```

### 7. Commit & Push
```bash
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature-name
```

### 8. Create a Pull Request
- Go to GitHub
- Click "New Pull Request"
- Describe your changes
- Link related issues

## Commit Message Guidelines

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add new automation workflow template
fix: resolve health check endpoint timeout
docs: update deployment guide for GCP
```

## Pull Request Guidelines

1. **Clear title** - What does your PR do?
2. **Detailed description** - Why and how?
3. **Linked issues** - Reference related issues
4. **Tested** - Local testing completed?
5. **Documentation** - Updated docs if needed?

## Development Workflow

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Deploy locally with Docker
docker-compose up
```

## Reporting Issues

Use GitHub Issues with:
- Clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

## Questions?

- Open a Discussion on GitHub
- Email: support@radixedge.io
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making RadixEdge RPA better!** 🚀
