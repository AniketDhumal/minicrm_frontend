import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Configure test-utils
configure({ testIdAttribute: 'data-test' });