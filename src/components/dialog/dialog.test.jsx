import { render, screen } from '@testing-library/react';
import Dialog from './dialog';

const mockedDialogData =
{
    birth_year: "19BBY",
    eye_color: "blue",
    gender: "male",
    hair_color: "blond",
    height: "172",
    mass: "77",
    name: "Luke Skywalker"
};

test('finds character age on dialog when dialog is open', async () => {
    render(<Dialog open={true} personDetails={mockedDialogData} handleClose={() => { }} />);
    const characterAge = await screen.findAllByText(/19BBY/i)
    expect(characterAge).toHaveLength(1);
}, 1000);

test('does not find character age on dialog when dialog is closed', () => {
    render(<Dialog open={false} personDetails={mockedDialogData} handleClose={() => { }} />);
    expect(() => screen.getAllByText(/19BBY/i)).toThrow();
}, 1000);
