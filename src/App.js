import React from 'react';

import {API_KEY} from "./constants"

import Form from "./components/Form"
import Recipes from "./components/Recipes"

import './App.css';

class App extends React.Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.reciptName.value
    e.preventDefault()
    const url = `https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`
    const api_call = await fetch(url)

    const data = await api_call.json()
    this.setState({recipes: data.recipes})
  }

  componentDidMount() {
    const json = localStorage.getItem("recipes")
    const recipes = JSON.parse(json)
    this.setState({recipes})
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes)
    localStorage.setItem("recipes", recipes)
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Receipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} />
      </div>
    )
  }
}

export default App;
