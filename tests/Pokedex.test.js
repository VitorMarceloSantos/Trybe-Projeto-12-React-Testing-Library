import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('5 - Teste o componente <Pokedex.js />', () => {
  function nextPokemon() {
    const buttonNext = screen.getByTestId('next-pokemon');
    return buttonNext;
  }
  function pokemonType() {
    const dataTestid = screen.getByTestId('pokemon-type');
    return dataTestid;
  }

  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const titleEncountered = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(titleEncountered).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando '
  + 'o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    data.forEach((pokemon) => {
      const namePokemonData = pokemon.name;
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon.textContent === namePokemonData).toBeTruthy();

      // const buttonNext = screen.getByTestId('next-pokemon');
      const buttonNext = nextPokemon();
      userEvent.click(buttonNext);
    });
    // const namePokemon1 = screen.getByTestId('pokemon-name');
    // expect((namePokemon1).textContent).toBe('Pikachu');

    // const buttonNext = screen.getByTestId('next-pokemon');
    // userEvent.click(buttonNext);

    // const namePokemon2 = screen.getByTestId('pokemon-name');
    // expect((namePokemon2).textContent).toBe('Charmander');
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const quantPokemon = screen.getAllByText(/More details/i);
    expect(quantPokemon).toHaveLength(1);
  });

  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  test('Teste se a Pokédex tem os botões de filtro:'
  + 'Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);

    const quantButton = screen.getAllByTestId('pokemon-type-button');
    expect(quantButton).toHaveLength(types.length);
  });
  // test('', () => {
  //   renderWithRouter(<App />);
  //   const typeButton = screen.getByRole('button', { name: 'Electric' });
  //   expect(typeButton).not.toBeDisabled();
  // });

  test('A partir da seleção de um botão de tipo,'
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    types.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);

      // let dataTestid = screen.getByTestId('pokemon-type');
      let dataTestid = pokemonType();
      expect(dataTestid.textContent === type).toBeTruthy();
      // const buttonDisabled = screen.getByTestId('next-pokemon');
      const buttonDisabled = nextPokemon();
      if (!buttonDisabled.disabled) {
        userEvent.click(buttonDisabled);
        // dataTestid = screen.getByTestId('pokemon-type');
        dataTestid = pokemonType();
        expect(dataTestid.textContent === type).toBeTruthy();
      }
    });
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).not.toBeDisabled();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll.textContent).toBe('All');
    userEvent.click(buttonAll);

    data.forEach(({ name, type }) => {
      // const dataTestid = screen.getByTestId('pokemon-type');
      const dataTestid = pokemonType();
      expect(dataTestid.textContent === type).toBeTruthy();
      const dataTestName = screen.getByTestId('pokemon-name');
      expect(dataTestName.textContent === name).toBeTruthy();

      // const buttonDisabled = screen.getByTestId('next-pokemon');
      const buttonDisabled = nextPokemon();
      if (!buttonDisabled.disabled) {
        userEvent.click(buttonDisabled);
        // dataTestid = screen.getByTestId('pokemon-type');
        // expect(dataTestid.textContent === type).toBeTruthy();
      }
    });
  });
});
