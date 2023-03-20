import { render, screen } from '@testing-library/react';
import Cards from './cards';

const mockedCardsData = [
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
];

test('renders result counter with 3 results', () => {
    render(<Cards characters={mockedCardsData}/>);
    const characterCards = screen.getAllByTestId('test-character-card');
    expect(characterCards).toHaveLength(3);
});


test('finds name on card', async () => {
    render(<Cards characters={mockedCardsData} />);
    const resultCount = await screen.findByText(/Skywalker/i)
    expect(resultCount).toBeInTheDocument();
});
