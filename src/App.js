import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Maestria from './Maestria';

function App() {

  const [playerData, setPlayerData ] = useState({});

  const [championData, setChampionData] = useState({});

  const [searchTextChampions, setSearchTextChampions ] = useState("");

  const [searchText, setSearchText] = useState("");

  const API_KEY = "RGAPI-c8efd549-5a34-47ff-941a-5b8394cab809";

  function searchForPlayer(event) {
    
    var APICallString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    axios.get(APICallString).then(function (response) {
      //Sucess
      setPlayerData(response.data);
      console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })

  }

  function searchForChampions(event) {
    var APICallChampions = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + searchTextChampions + "_0.jpg";
    axios.get(APICallChampions).then(function (champion) {
      setChampionData(champion)
      // console.log(champion)
    }
      ).catch(function (error) {
        console.log(error)
      })
    }

  
  return (
    <div className="App">
      <h2>
        League of Legends - Procurar Perfil
      </h2>
      <input className='btn_player' type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={e => searchForPlayer(e)}>Procurar Perfil</button>
      <Maestria playerData={playerData.puuid}/>

      <input type="text" onChange={e => setSearchTextChampions(e.target.value)}></input>
      <button onClick={e => searchForChampions(e)}>Procurar Campeão</button>

      {JSON.stringify(playerData) != '{}' ? 
        <>
          <p>{playerData.name}</p>
          <img width="100" height="100" src={ "http://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/" + playerData.profileIconId + ".png" } />
          
          <p>Level do invocador: {playerData.summonerLevel}</p>

        </>
        : <><p>Sem dados de invocador</p></>
      }

      {JSON.stringify(championData) != '{}' ? 
            <>
              <p><img width="600" height="400" src={championData.config.url}></img> </p>
            </>
            : <><p>Sem dados de campeão</p></>
        }

    </div>
    
     
    )
}

export default App;
