// for generating unique ids
import { nanoid } from "nanoid";
import { useState , useEffect  } from "react";
import Dice from "./Die.jsx";
// for toast notifications
  import { ToastContainer, toast } from 'react-toastify';
const Body = () => {
    const allNewDice = () => {
        //   let random= [] ; 
        //     for (let i = 0; i < 10; i++) {
            
        //         const randomNumber = Math.floor(Math.random() * 6) + 1;
        //        random.push(randomNumber);
        //     }

        // another functional approach return array of objects 
    return new Array(10).fill(0).map(() => ({
    value: Math.floor(Math.random() * 6) + 1,
    isHeld: false ,
    id: nanoid(),
  }));
    }

    // state to hold dice numbers
    // everytime diceNumbers changes , allnewDice function is recalled (thatis not optimal)
    // const [diceNumbers, setDiceNumbers] = useState(allNewDice());
    // runs only once (on initial render)
    const [diceNumbers, setDiceNumbers] = useState( () => allNewDice());

    
   
    // clicking a die 
    const HoldDie =(id) => 
    {
        setDiceNumbers ( prevDice => prevDice.map ( prevdie => {
            return prevdie.id === id ? {...prevdie , isHeld : !prevdie.isHeld} : prevdie
        }
        ))
    }
    // rolling dice 
 const rollDice = () => {
  // not a best practice in react 

  // let counter = 0 ;
  // diceNumbers.forEach ( die => {
  //   if (die.isHeld) {
  //       counter +=1 ;
  //   }
  //   })
  //   if (counter >=10) {
  //       console.log("all dice are unheld , generating new dice");
  //       toast(" Congratulations , You Won 🥳" , {position : "top-right" , autoClose : 2000});
  //       setDiceNumbers ( allNewDice() )
  //       return ;
  //   }


  setDiceNumbers(prevDice =>
    prevDice.map(prevdie =>
      prevdie.isHeld
        ? prevdie
        : { ...prevdie, value: Math.floor(Math.random() * 6) + 1 }
    )
  );
};

// checking win condition
useEffect ( () => {
  const win = diceNumbers.every(die => die.isHeld)&& diceNumbers.every ( die => die.value === diceNumbers[0].value) ;
  if (win)
  {
    toast(" Congratulations , You Won 🥳" , {
      position : "top-right" , 
      autoClose : 2000,
      onClose: () => setDiceNumbers ( allNewDice() )
    });
    
    
  }
} ,[diceNumbers]
)
   

  return (
    <>
    <main className="flex gap-[3em] md:gap-[5em]">

        <ToastContainer />
        {/* instructions  */}
        <h1 className="title text-6xl font-bold">Tenzies</h1>
            <p className="instructions text-3xl">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {/* die */}
                <div className="dice-container">
             {
                diceNumbers.map((num, index) => (
                   <Dice key={index}  value={num.value} isHeld={num.isHeld} HoldDie={() => HoldDie(num.id)} />
                ))
            }
        </div>
        {/* roll button */}
        <button 
        onClick={rollDice}
        disabled={diceNumbers.every(die => die.isHeld)}
        aria-disabled={diceNumbers.every(die => die.isHeld)}
        className="roll-dice" >Roll</button>
    </main>
    </>
  )
}

export default Body
