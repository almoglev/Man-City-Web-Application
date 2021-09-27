import React, { useEffect, useReducer, useState } from 'react';
import { showToastError, showToastSuccess } from '../Utils/utils';

import { CircularProgress } from '@material-ui/core';
import { matchesCollection } from '../../firebase';

import LeagueTable from './league_table';
import MatchesList from './matches_list';


const TheMatches = () => {
    const [matches, setMatches] = useState(null);

    useEffect(()=>{
        // if matches is empty, load it
        if(!matches){
            matchesCollection.get().then(snapshot=>{
                const matches = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));
                setMatches(matches)
            }).catch(error=>{
                showToastError(error);
            })
        }
    },[matches])

    return(
        <>
            {/* if matches is not empty, show it. otherwise show loading sign */}
            { matches ?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                            <MatchesList/>
                        </div>

                        <div className="right">
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
            : 
                <div className="progress">
                    <CircularProgress/>
                </div>
            }
        </>
    )
}

export default TheMatches;