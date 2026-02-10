

const Die = ({value , isHeld , HoldDie  }) => {
 const color =  isHeld ? "#59E391" : "white" ;
  return (
    <>
       <button 
       className="die-face" style={{backgroundColor: color}}
       onClick={ HoldDie}
      //  adding accessibility
       aria-label={`value of this die is ${value} , it is ${isHeld ? "held" : "not held" }` }
       arial-pressed={isHeld}
       >{value}</button>
  </>
  )
}

export default Die
