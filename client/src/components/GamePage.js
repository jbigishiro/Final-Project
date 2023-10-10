import React, {useEffect} from "react"
import Game from "./Game"
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import AddReview from "./AddReview";

function GamePage({onLogout }){
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then((r) => {
      if (r.ok) {
        r.json().then((user)=>onLogout(user))
        navigate("/login")
      } else {
        console.error('Logout error:', r.statusText);
      }
    });
  };

   return (
     <div className="gamePage">

      <div id="gameSection"> 
         <button style={{color:'red', fontSize:'20px', fontWeight:'bold'}} onClick={handleLogout}>Logout</button>
        <Game/> 
        </div>  
       <div id="reviewsSection">
        <Reviews/>
        <AddReview/>
         </div>
     </div>

   ) 

}

export default GamePage