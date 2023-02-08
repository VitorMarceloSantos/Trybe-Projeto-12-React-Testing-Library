import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('7 - Teste o componente <PokemonDetails.js />', () => {
  function pokemonName() {
    const namePokemon = screen.getByTestId('pokemon-name');
    return namePokemon;
  }
  test('Teste se as informações detalhadas do'
  + 'pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    // const namePokemon = screen.getByTestId('pokemon-name');
    const namePokemon = pokemonName();
    expect(namePokemon.textContent).toBe('Pikachu');
    const pokemonDetail = screen.getByRole('heading', {
      name: `${namePokemon.textContent} Details`,
      level: 2,
    });
    expect(pokemonDetail).toBeInTheDocument();

    const headingDetails = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(headingDetails).toBeInTheDocument();

    const parText = screen.getByText(/Pokémon roasts hard/g);
    expect(parText).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo'
  + 'as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    // const namePokemon = screen.getByTestId('pokemon-name');
    const namePokemon = pokemonName();
    const gamePokemon = screen.getByRole('heading', {
      name: `Game Locations of ${namePokemon.textContent}`,
      level: 2,
    });
    expect(gamePokemon).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${namePokemon.textContent} location`);
    expect(maps).toHaveLength(2);
    const nameMap1 = screen.getByText(/Kanto Viridian Forest/i);
    expect(nameMap1).toBeInTheDocument();
    const nameMap2 = screen.getByText(/Kanto Power Plant/i);
    expect(nameMap2).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Teste se o usuário pode favoritar um pokémon'
  + 'através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();

    const inputFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(inputFavorite);
    // const namePokemon = screen.getByTestId('pokemon-name');
    const namePokemon = pokemonName();
    const starFavorite = screen.getByAltText(
      `${namePokemon.textContent} is marked as favorite`,
    );
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(inputFavorite);
    expect(starFavorite).not.toBeInTheDocument();

    const labelFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelFavorite).toBeInTheDocument();
  });
});
