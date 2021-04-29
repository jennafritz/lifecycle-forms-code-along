import React, { Component } from 'react'

export default class Form extends Component {

    state = {
        name: "",
        weight: 0,
        sprite: "",
        type: "",
        description: ""
    }

handleSubmit = (event) => {
    event.preventDefault()
    //Contains a new Pokemon (this is the hard part - getting new data at all)
    const newPokemon = {
        name: this.state.name,
        weight: this.state.weight,
        sprite: this.state.sprite,
        type: this.state.type,
        description: this.state.description
    }
    console.log(newPokemon)
    
    //Make a requestObj
    const reqObj = {}
    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newPokemon)

    console.log(reqObj)

    //POST request to /pokemon (index route) to create new pokemon
    //this fetch handles sending the new Pokemon to the server
    fetch("http://localhost:3000/pokemon", reqObj)
        .then(res => res.json())
        .then((createdPokemon) => {
            //this manipulates the DOM
            this.props.createPokemon(createdPokemon)
            //this resets the state back to what it was
            this.setState({
                name: "",
                weight: 0,
                sprite: "",
                type: "",
                description: ""
                })
        })

}

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-inline ml-4">
                <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" placeholder="Pokemon Name"/>

        
                <div className="input-group mb-2 mr-sm-2">
                    <input onChange={(e) => this.setState({sprite: e.target.value})} type="text" className="form-control" placeholder="image URL"/>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                    <select onChange={(e) => this.setState({type: e.target.value})} className="custom-select my-1 mr-sm-2">
                        <option selected>Choose Type...</option>
                        <option >Fire</option>
                        <option >Water</option>
                        <option >Psychic</option>
                        <option >Grass</option>
                        <option >Electric</option>
                    </select>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                    <input onChange={(e) => this.setState({weight: e.target.value})} type="number" className="form-control" placeholder="weight"/>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                    <input onChange={(e) => this.setState({description: e.target.value})} type="text-area" className="form-control" placeholder="description"/>
                </div>

                

                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
        )
    }
}
