import React, { Component } from 'react'
//no longer using this, but good to test with static data first, get it working, then replace with API data:
// import pokeData from '../data/pokemon'

//Components
import Navbar  from './Navbar'
import PokeContainer from './PokeContainer'
import Home from './Home'

export default class App extends Component {

  constructor(){
    super()
    console.warn("running constructor...")
  }

  state = {
    display: "Home",
    searchText: "",
    pokemons: []
  }

  componentDidMount() {
    console.warn("running didMount...")
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokeData => this.setState({pokemons: pokeData}))
  }

  changeToPokemon = () => {
    this.setState({display: "Pokemon"})
  }

  changeToHome = () => {
    this.setState({display: "Home"})
  }

  handleSearchText = (data) => {
    this.setState({
      searchText: data
    })
  }

  //this returns an array with all pokemon objects except the one with an id equal to the id of the passed-in pokemon object
  //it is passed down to PokeContainer as a prop from App (PokeContainer is the parent of Card)
  //then passed down to Card as a prop from parent PokeContainer
  //this function is then called on onClick in the Card component from its props
  deletePokemon = (pokemonObj) => {
    const newPokemon= this.state.pokemons.filter(pokemon=> pokemon.id !== pokemonObj.id)
    console.log("hey");
    this.setState({
      pokemons: newPokemon
    })

  }

  //best to define this in App because the state we want to change (the pokemons array) is in this component
  //pass down as prop to PokeContainer
  //then pass down as another prop from PokeContainer to Form and invoke in the POST request within Form
  createPokemon = (pokemonObj) => {
    this.setState({
      pokemons: [pokemonObj, ...this.state.pokemons]
    })
  }

  render(){
    console.warn("running render...")
   const filteredPokemon = this.state.pokemons.filter(poke => poke.name.includes(this.state.searchText))
    return (
      <div className="bg-dark">
        <Navbar handleSearchText={this.handleSearchText} display={this.state.display} changeToHome={this.changeToHome} />
        { this.state.display === "Home" ? <Home changeToPokemon={this.changeToPokemon}/> : null }
        { this.state.display === "Pokemon" ? <PokeContainer createPokemon={this.createPokemon} deletePokemon={this.deletePokemon} pokemons={filteredPokemon}  /> : null}
      </div>
    )
  }
}



