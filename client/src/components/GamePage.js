import React from "react"
import Game from "./Game"

function GamePage(){
   return (
     <div className="gamePage">
       <div id="instructionsSection"> Instructions to play</div>
      <div id="gameSection">  <Game/>  </div>  
       <div id="reviewsSection">Reviews </div>

     </div>

   ) 

}

export default GamePage