import React, { useState } from 'react';
import axios from "axios"; 

function Maestria(playerData) {

    const API_KEY = "RGAPI-c8efd549-5a34-47ff-941a-5b8394cab809";

    const [maestriaData, setMaestriaData] = useState({});
    
    const puuID = {playerData};
    
    function maestriaTop(event) {
        var APIMaestriaTop = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + puuID.playerData.playerData + "/top" + "?api_key=" + API_KEY;
        axios.get(APIMaestriaTop).then(function (dadosMaestria) {
        setMaestriaData(dadosMaestria.data)
          // console.log(maestria)
        }
          ).catch(function (error) {
            console.log(error)
          })
    }
    
      const maestria = Array.prototype.slice.call(maestriaData)

      console.log(maestria)

      return (
        <div>
            <button onClick={e => maestriaTop(e)}>Maestria</button>
            {
                maestria.map(item => <p>{item.championId}</p>)
            }
            
        </div>
      );

    }

export default Maestria