import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('4- Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex;',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/rotaQualquer');

      const pageNotFound = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });
      expect(pageNotFound).toBeInTheDocument();
    });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rotaQualquer');

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
