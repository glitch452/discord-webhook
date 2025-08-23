import { setupServer } from 'msw/node';

export const server = setupServer();

// Start MSW before all tests
beforeAll(() => server.listen());

// Reset handlers after each test (for test isolation)
afterEach(() => server.resetHandlers());

// Clean up after all tests are finished
afterAll(() => server.close());
