import React, {useState, useEffect} from "react";
import {Slide} from "react-awesome-reveal";
import {matchesCollection} from '../../../firebase';
import MatchBlock from "../../Utils/match_block";

const Blocks = () => {
    const [matches, setMatches]= useState([])


    useEffect(()=>{
        // we want to load the matches from firebase just once, so load only if it's empty
        if(matches.length === 0){
            matchesCollection.get().then( snapshot => {
                // getting the data from firebase (it's stored in an object called snapshot)
                const matches = snapshot.docs.map(doc=>({
                    // adding the id of the object
                    id: doc.id,
                    // adding the data
                    ...doc.data()
                }));
                setMatches(matches)

            }).catch(error=>{
                console.log(error);
            })

        }
    },[matches])


    const showMatches=(matches)=>(
        matches ?
            matches.map((match)=>(
                <Slide bottom key={match.id} className="item" triggerOnce>
                    <div>
                        <div className="wrapper">
                            <MatchBlock match={match}/>
                        </div>
                    </div>
                </Slide>
            ))
        :
        null
    )


    return(
        <div className="home_matches">
            {showMatches(matches)}
        </div>
    )
}

export default Blocks;