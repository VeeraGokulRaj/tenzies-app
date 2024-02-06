import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

import React from "react";
import "./App.css"
import Die from "./Components/Die";

function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
        
  }, [dice])

  
  function allNewDice(){
    var newValue=[]
    for(let i=0;i<=9;i++)
      newValue[i] ={
        value: Math.floor(Math.random()*6) +1,
        isHeld: false,
        id: nanoid()
      }
     
    return newValue
  }

  const diceElements = dice.map((data) => 
      <Die 
        key = {data.id}
        value = {data.value}
        isHeld = {data.isHeld}
        holdDice = {() => holdDice(data.id)}
      />
    )

  function rollUp(){
    if(!tenzies){
      setDice(oldDie => oldDie.map(value => {
        return value.isHeld ? value
         : {...value, value: Math.floor(Math.random()*6) +1}
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }


  function holdDice(id){
    setDice(oldDie => oldDie.map(value => {
      return value.id === id ?
        {...value, isHeld: !value.isHeld} : value
    }))
  }

  const endResult = tenzies ? "You Won" : "Roll"
  const highScore = 5
  return (
    <>
      {tenzies && <Confetti/>}
      <section className="highScore--section">
        <h2 className="highScore">High-Score:&nbsp;</h2>
        <p className="score">{highScore}</p>
        <p className="icone">&nbsp;<i className="bi bi-trophy-fill"></i></p>
      </section>
      
      <main>
        <section>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>

        <div className="dice-container">
        {diceElements}
        </div>

        <button onClick={rollUp}>{endResult}</button>
      </main>
    </>
    
  );
}

export default App;
