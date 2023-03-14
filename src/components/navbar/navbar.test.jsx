import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

test('renders navbar text', () => {
    render(<Navbar />);
    const navText = screen.getByText('Star Wars Character Search');
    expect(navText).toBeInTheDocument();
  });
  