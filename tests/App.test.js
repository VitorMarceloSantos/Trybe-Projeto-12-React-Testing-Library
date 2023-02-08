import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegaçã',
    () => {
      renderWithRouter(<App />);
      const links = ['Home', 'About', 'Favorite Pokémons'];

      links.forEach((link) => {
        const linkAtual = screen.getByRole('link', { name: link });
        expect(linkAtual).toBeInTheDocument();
      });
    });
  test('Teste se a aplicação é redirecionada para a página inicial'
  + ',na URL / ao clicar no link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se a aplicação é redirecionada para a página de About,'
  + 'na URL /about, ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,'
  + ' na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavoritePokemons).toBeInTheDocument();

    userEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para a página'
  + 'Not Found ao entrar em uma URL desconhecida.',
  () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rotaQualquer');

    const pageNotFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(pageNotFound).toBeInTheDocument();
  });
});
