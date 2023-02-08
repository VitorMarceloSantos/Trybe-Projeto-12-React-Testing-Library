import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6 - Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.textContent).toBe('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    const arrayWeight = weightPokemon.textContent.split(' ');
    expect(weightPokemon.textContent).toBe(
      `Average weight: ${arrayWeight[2]} ${arrayWeight[3]}`,
    );

    const imagePokemon = screen.getByAltText(`${namePokemon.textContent} sprite`);
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se ao clicar no link de navegação do pokémon, é feito '
  + 'o redirecionamento da aplicação para a página de detalhes de pokémon;', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const idPokemon = history.location.pathname.split('/');
    expect(history.location.pathname).toBe(`/pokemons/${idPokemon[2]}`);
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const inputFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(inputFavorite);

    const namePokemon = screen.getByTestId('pokemon-name');
    const starFavorite = screen.getByAltText(
      `${namePokemon.textContent} is marked as favorite`,
    );
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
