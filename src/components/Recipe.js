import React, { Component } from 'react'

import {API_KEY} from "../constants"
import {Link} from "react-router-dom"

export default class Recipe extends Component {
  state = {
    activeRecipe: []
  }

  async componentWillMount() {
    const title = this.props.location.state.recipe
    const url = `https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`
    const req = await fetch(url)

    const res = await req.json()
    this.setState({activeRecipe: res.recipes[0]})
  }

  render() {
    const recipe = this.state.activeRecipe

    return (
      <div className="container">
        {
          this.state.activeRecipe.length !==0 &&
          <div className="active-recipe">
            <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title} />
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <h4 className="active-recipe__publisher">Publisher: <span>{recipe.publisher}</span></h4>
            <p className="active-recipe__website">Website: <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span></p>
            <button className="active-recipe__button"><Link to="/">Go Home</Link></button>
          </div>
        }
      </div>
    )
  }
}
