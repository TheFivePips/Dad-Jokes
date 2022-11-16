import React from "react"
import axios from 'axios'
import './JokeList.css'
import Joke from "./Joke"
import { v4 as uuidv4 } from 'uuid';

class JokeList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            jokes: []
        }
    }
    static defaultProps = {
        numJokesToGet : 10
    }

    async componentDidMount() {
        let jokes = []

        while(jokes.length < this.props.numJokesToGet){

            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            })
            jokes.push({ text: res.data.joke, votes: 0, id: uuidv4() })
        }
        this.setState({ jokes: jokes })
    }

handleVote(id, delta){

}

    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span>Jokes</h1>
                    <img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="emoji-laugh"
					/>
                    <button className="JokeList-getmore">
                        New Jokes
                    </button>

                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => {
                        return <Joke votes={j.votes} text={j.text}/>
                    })}
                </div>
            </div>

        )
    }
}

export default JokeList