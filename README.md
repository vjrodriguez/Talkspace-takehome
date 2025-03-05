# Talkspace Engineering Assessment

Thank you for your interest in the engineering position at talkspace. We are asking our applicants to take no more than 2 hours to work on this assessment.

In this assignment you will review working, but rapidly prototyped code, providing comments and some refactors to the code.

Please keep this effort time boxed to two hours and the expectation is not that the assignment is completed or solved to perfection. Please choose one or two areas to focus on refactoring and provide whatever additional comments you like as these may be used as topics of discussion for a followup engineering interview.

## Assignment:

We threw together a prototype of a simple single page app that is technically working, but needs a lot of technical work! Please pull and run the app, and review the code. There. In this little app:

- Users can create a custom robot avatar based on some configuration options
- Users can name their avatar
- Users can store their avatars to local storage
- Users can delete stored avatars.

## How to submit

**Please fork and open a PR to YOUR FORK** with your changes and in-code comments

Send us a link - Ideally the repo should have version control and have commits that outline your progress.
If you are using a private repo please allow access to the emails our recruiter provides you.

## Running the App

pull
npm install
npm run dev

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Run tests

npm test
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

## Recent Changes

### UI/UX Improvements

- Added loading states for save operations
- Implemented Alert component for user feedback
- Improved button states and interactions

### Code Quality

- Improved type safety in components
- Added proper error handling
- Implemented loading states for async operations

### Performance Improvements

- Implemented code minification using Terser
- Optimized build configuration for better performance
- Lighthouse performance score improved from 78 to 88

### Testing Infrastructure

- Added Vitest for test running
- Integrated React Testing Library for component testing
- Set up Jest DOM for DOM assertions
- Added test coverage reporting
- Created initial test suite for SaveButton component

## Future Improvements/TODO

### Testing

- [ ] Add unit tests for all UI components
- [ ] Add integration tests for user flows
- [ ] Set up end-to-end testing with Cypress or Playwright
- [ ] Add test coverage thresholds
- [ ] Implement snapshot testing for UI components

### Performance

- [ ] Implement React.memo() for performance optimization
- [ ] Add proper code splitting
- [ ] Optimize bundle size
- [ ] Implement proper lazy loading
- [ ] Add service worker for PWA capabilities

### Code Quality

- [ ] Implement proper error boundaries
- [ ] Add comprehensive TypeScript types
- [ ] Set up proper state management solution
- [ ] Add proper documentation
- [ ] Implement stricter ESLint rules

### Features

- [ ] Implement dark mode
- [ ] Add responsive UI for different device sizes
- [ ] Create custom useLocalStorage hook
- [ ] Implement undo/redo functionality

### User Experience

- [ ] Add proper form validation
- [ ] Implement proper error messages
- [ ] Add keyboard navigation
- [ ] Improve accessibility
- [ ] Add animations for better feedback

### Security

- [ ] Implement proper input validation
- [ ] Add proper error handling
- [ ] Implement proper data sanitization
- [ ] Add security headers

### Development Experience

- [ ] Set up proper CI/CD pipeline
- [ ] Add pre-commit hooks
- [ ] Implement proper logging
- [ ] Add development documentation
- [ ] Set up proper development environment
