import { render, screen } from '@testing-library/react';
import App from './App';

let windowFetchSpy;

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

const mockSWResponse = {
  "count": 82,
  "next": "https://swapi.dev/api/people/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Luke Skywalker",
      "gender": "male",
    },
    {
      "name": "C-3PO",
      "gender": "n/a",
    },
    {
      "name": "R2-D2",
      "gender": "n/a"
    }
  ]
};

let mockFetch = async (url) => {
  if (url.startsWith('https://swapi.dev/api/people')) {
    await wait(70);
    return {
      ok: true,
      status: 200,
      json: async () => mockSWResponse,
    };
  }
}

beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders root component', () => {
  render(<App />);
  const rootComponent = screen.getByTestId('test-root-component');
  expect(rootComponent).toBeInTheDocument();
});

test('calls API mock upon initialization', async () => {
  render(<App />);
  expect(windowFetchSpy).toHaveBeenCalled();
}, 5000);

test('renders result counter with 3 results', async () => {
  render(<App />);
  const resultCount = await screen.findByText(/Showing 3 results/i)
  expect(resultCount).toBeInTheDocument();
}, 5000);

test('renders 3 cards', async () => {
  render(<App />);
  const characterCards = await screen.findAllByTestId('test-character-card')
  expect(characterCards).toHaveLength(3);
}, 5000); 
