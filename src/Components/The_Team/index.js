import React, { useEffect, useState } from "react";
import PlayerCard from '../Utils/player_card';
import { Slide } from 'react-awesome-reveal';
import {Promise} from 'core-js';

import { firebase, playersCollection} from '../../firebase'
import { showToastError } from '../Utils/utils'
import { CircularProgress } from "@material-ui/core";


const TheTeam = () => {

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);

    useEffect(()=>{
        // if players list is empty, load them. NOTICE: snapshot.docs does not contain the image URL!
        // we need to add it to each player separately
        if(!players){
            playersCollection
            .get()
            .then( snapshot => {
                const players = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                // add the image URL of each players one by one
                let promises=[]

                // for each player from players we create a promise that will hold the image url of that player from firebase
                players.forEach((player, i)=>{
                    // modifying promises list (not the state!)
                    promises.push(
                        // resolve goes to the then, reject goes to the catch
                        new Promise((resolve, reject)=>{
                            firebase.storage().ref('players')
                            .child(player.image).getDownloadURL()
                            .then(url=>{
                                players[i].url = url;
                                resolve()
                            }).catch(error=>{
                                reject()
                            })
                        })
                    )
                })

                // only when all promises are resolved, the callback function will be executed
                Promise.all(promises).then(()=>{
                    // update the state
                    setPlayers(players);
                })
            }).catch( error=>{
                showToastError("Cannot load players. Try again later.")
            }).finally(()=>{
                setLoading(false);
            })
        }

    },[players])

    const showPlayerByCategory = (category) => (
        players ?
            players.map((player,i)=>{
                return player.position === category ?
                    <Slide left key={player.id} triggerOnce>
                        <div className="item">
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Slide>
                : null
            })
        : null
    )

    return(
        <div className="the_team_container">
            {
                loading ?
                <div className="progress">
                    <CircularProgress/>
                </div>
                
                :

                <div>
                    
                    <div className="team_category_wrapper">
                        <div className="title">Keepers</div>
                        <div className="team_cards">
                            { showPlayerByCategory('Keeper') } 
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Defence</div>
                        <div className="team_cards">
                            { showPlayerByCategory('Defence') } 
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Midfield</div>
                        <div className="team_cards">
                            { showPlayerByCategory('Midfield') } 
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Striker</div>
                        <div className="team_cards">
                            { showPlayerByCategory('Striker') } 
                        </div>
                    </div>


                </div>
            }
            
        </div>
    )

}

export default TheTeam;