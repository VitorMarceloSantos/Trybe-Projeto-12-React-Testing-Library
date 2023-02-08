import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('2 - Caminho do componente: src/pages/About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex;',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();

      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleHeading = screen.getByRole('heading',
      { level: 2, name: /About Pokédex/i });
    expect(titleHeading).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    // const containParag = ['This application simulates a Pokédex, '
    // + 'a digital encyclopedia containing all Pokémons', 'One can filter Pokémons by '
    // + 'type, and see more details for each one of them'];

    const quantParag = screen.getAllByText(/Pokémons/i);
    expect(quantParag).toHaveLength(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
