# Contributing to GeoAnalyzer

Thank you for your interest in contributing to GeoAnalyzer! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Architecture Guidelines](#architecture-guidelines)

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the Repository**
```bash
git clone https://github.com/your-username/geo-chatbot.git
cd geo-chatbot
```

2. **Install Dependencies**
```bash
npm install
cd geojson-backend
npm install
cd ..
```

3. **Set Up Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start Development Servers**
```bash
# Terminal 1: Backend
cd geojson-backend
npm run dev

# Terminal 2: Frontend
npm start
```

### Project Structure

```
geo-chatbot/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── styles/            # CSS and styling
├── geojson-backend/       # Backend Express server
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── utils/             # Backend utilities
│   └── public/            # Static file serving
├── public/                # Frontend public assets
├── docs/                  # Documentation
└── tests/                 # Test files
```

## Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring

### Commit Message Format

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(chat): add multilingual support for Arabic queries
fix(map): resolve leaflet marker positioning issue
docs(api): update endpoint documentation
```

### Development Process

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
   - Write code following our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Changes**
```bash
npm test
npm run lint
npm run build
```

4. **Commit Changes**
```bash
git add .
git commit -m "feat(component): add new functionality"
```

5. **Push and Create PR**
```bash
git push origin feature/your-feature-name
```

## Coding Standards

### JavaScript/React Standards

#### Code Style

- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions

#### Example Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onAction - Action callback
 */
const MyComponent = ({ title, onAction }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  const handleClick = () => {
    // Handler logic
    onAction?.();
  };

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={handleClick}>
        Action
      </button>
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func
};

export default MyComponent;
```

#### Hooks Guidelines

```javascript
// Custom hook example
export const useGeoData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getData();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};
```

### Backend Standards

#### Express.js Best Practices

```javascript
// Route handler example
const getFiles = async (req, res) => {
  try {
    const files = await fileService.getAllFiles();
    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    logger.error('Failed to get files:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Middleware example
const validateGeoJSON = (req, res, next) => {
  const { data } = req.body;
  
  if (!data || !data.type) {
    return res.status(400).json({
      success: false,
      error: 'Invalid GeoJSON format'
    });
  }
  
  next();
};
```

### CSS/Styling Standards

- Use Tailwind CSS classes when possible
- Follow BEM methodology for custom CSS
- Use CSS modules for component-specific styles
- Maintain responsive design principles

```css
/* BEM example */
.chat-panel {
  @apply flex flex-col bg-white shadow-lg;
}

.chat-panel__header {
  @apply bg-blue-600 text-white p-4;
}

.chat-panel__message {
  @apply p-3 border-b;
}

.chat-panel__message--user {
  @apply bg-blue-50;
}
```

## Testing Guidelines

### Frontend Testing

#### Component Testing with React Testing Library

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatPanel from '../ChatPanel';

describe('ChatPanel', () => {
  const mockProps = {
    messages: [],
    onSendMessage: jest.fn(),
    loading: false
  };

  test('renders chat panel correctly', () => {
    render(<ChatPanel {...mockProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('calls onSendMessage when form is submitted', () => {
    render(<ChatPanel {...mockProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(mockProps.onSendMessage).toHaveBeenCalledWith('Test message');
  });
});
```

#### Hook Testing

```javascript
import { renderHook, act } from '@testing-library/react';
import { useGeoData } from '../hooks/useGeoData';

describe('useGeoData', () => {
  test('should fetch data successfully', async () => {
    const { result } = renderHook(() => useGeoData());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.data).toBeDefined();
  });
});
```

### Backend Testing

#### API Testing with Jest and Supertest

```javascript
const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        message: 'GeoJSON Backend Service is running'
      });
    });
  });

  describe('POST /api/upload', () => {
    test('should upload valid GeoJSON file', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('geojson', 'test/fixtures/valid.geojson')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.file).toBeDefined();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ChatPanel
```

## Pull Request Process

### Before Submitting

1. **Code Quality Checks**
```bash
npm run lint
npm run test
npm run build
```

2. **Documentation Updates**
   - Update README if needed
   - Add/update API documentation
   - Update component documentation

3. **Self Review**
   - Review your own changes
   - Ensure code follows standards
   - Check for console.log statements
   - Verify responsive design

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Code quality checks
   - Security scans

2. **Code Review**
   - At least one reviewer approval required
   - Address reviewer feedback
   - Resolve all conversations

3. **Merge Requirements**
   - All checks passing
   - No merge conflicts
   - Up-to-date with main branch

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.
```

## Architecture Guidelines

### Frontend Architecture

#### Component Organization

```
components/
├── common/          # Reusable components
│   ├── Button/
│   ├── Modal/
│   └── Input/
├── layout/          # Layout components
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
└── features/        # Feature-specific components
    ├── Chat/
    ├── Map/
    └── FileManager/
```

#### State Management

- Use React hooks for local state
- Consider Context API for shared state
- Implement custom hooks for complex logic

#### Performance Considerations

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize bundle size with code splitting

### Backend Architecture

#### API Design

- Follow RESTful principles
- Use consistent response formats
- Implement proper error handling
- Add request validation

#### Security Best Practices

- Validate all inputs
- Implement rate limiting
- Use HTTPS in production
- Sanitize file uploads

#### Database Design

- Normalize data structure
- Add proper indexing
- Implement data validation
- Plan for scalability

## Release Process

### Version Numbering

Follow Semantic Versioning (SemVer):
- MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Checklist

1. **Pre-release**
   - Update version numbers
   - Update CHANGELOG.md
   - Run full test suite
   - Update documentation

2. **Release**
   - Create release branch
   - Tag release version
   - Deploy to staging
   - Deploy to production

3. **Post-release**
   - Monitor for issues
   - Update project boards
   - Communicate changes

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Documentation**: Check existing documentation first

### Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

Thank you for contributing to GeoAnalyzer! Your contributions help make this project better for everyone.
