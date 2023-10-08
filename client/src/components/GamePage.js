import React, {useEffect} from "react"
import Game from "./Game"
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";

function GamePage(){
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then((r) => {
      if (r.status === 204) {
        navigate("/");
      } else {
        console.error('Logout error:', r.statusText);
      }
    });
  };

   return (
     <div className="gamePage">
       <div id="instructionsSection"> Instructions to play</div>
      <div id="gameSection"> 
         <button style={{color:'red', fontSize:'20px', fontWeight:'bold'}} onClick={handleLogout}>Logout</button>
        <Game/> 
        </div>  
       <div id="reviewsSection"><Reviews/> </div>
     </div>

   ) 

}

export default GamePage