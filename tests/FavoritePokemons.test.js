import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('3 - Caminho do componente: src/pages/FavoritePokemons.js', () => {
  test('Teste se a página contém as informações;',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoriteLink).toBeInTheDocument();

      userEvent.click(favoriteLink);
      expect(history.location.pathname).toBe('/favorites');
    });
  test('Teste se é exibida na tela a mensagem No favorite pokemon found,'
  + 'caso a pessoa não tenha pokémons favoritos;', () => {
    renderWithRouter(<App />, <FavoritePokemons />);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const empty = screen.getByText(/No favorite pokemon found/i);
    expect(empty).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />, <FavoritePokemons />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const inputFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(inputFavorite);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favorite = screen.getAllByText(/More details/i);
    expect(favorite).toHaveLength(1);
  });
});
