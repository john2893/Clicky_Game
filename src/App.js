//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import pics from "./pics.json";
import "./App.css";

//sets state to 0 
class App extends Component {
  state = {
    pics,
    clickedpics: [],
    score: 0
  };

  imageClick = event => {
    const currentpics = event.target.alt;
    const picsAlreadyClicked =
      this.state.clickedpics.indexOf(currentpics) > -1;

    if (picsAlreadyClicked) {
      this.setState({
        pics: this.state.pics.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedpics: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available pics, your score is increased and cards reordered
    } else {
      this.setState(
        {
          pics: this.state.pics.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedpics: this.state.clickedpics.concat(
            currentpics
          ),
          score: this.state.score + 1
        },
//if you get all 12 pics corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              pics: this.state.pics.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedpics: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.pics.map(pics => (
            <FriendCard
              imageClick={this.imageClick}
              id={pics.id}
              key={pics.id}
              image={pics.image}
            />
          ))}
        </div>
       
      </div>
    );
  }
}
export default App;