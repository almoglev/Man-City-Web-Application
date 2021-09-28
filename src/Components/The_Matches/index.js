import React, { useEffect, useReducer, useState } from 'react';
import { showToastError, showToastSuccess } from '../Utils/utils';

import { CircularProgress } from '@material-ui/core';
import { matchesCollection } from '../../firebase';

import LeagueTable from './league_table';
import MatchesList from './matches_list';


const TheMatches = () => {
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useReducer((prevState, nextState)=>{
        return {...prevState,...nextState}
    },{
        filterMatches: null,
        playedFilter: 'All',
        resultFilter: 'All'
    })

    useEffect(()=>{
        // if matches is empty, load it
        if(!matches){
            matchesCollection.get().then(snapshot=>{
                const matches = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));
                setMatches(matches);
                dispatch({...state, filterMatches: matches});

            }).catch(error=>{
                showToastError(error);
            })
        }
    },[matches,state])

    // isPlayed- all / yes (played) / no (not played)
    const showFilteredMatches = (isPlayed) =>{
        // list is the filtered matches list
        const list = matches.filter((match)=>{
            return match.final === isPlayed
        });

        dispatch({
            ...state,
            filterMatches: isPlayed === 'All' ? matches : list,
            playedFilter: isPlayed,
            resultFilter: 'All'
        })

    }

    const showFilteredResult = (resultType) =>{
        // list is the filtered matches list
        const list = matches.filter((match)=>{
            return match.result === resultType
        });

        dispatch({
            ...state,
            filterMatches: resultType === 'All' ? matches : list,
            playedFilter: 'All',
            resultFilter: resultType
        })
    }

    console.log(state.filterMatches)

    return(
        <>
            {/* if matches is not empty, show it. otherwise show loading sign */}
            { matches ?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                            <div className= "match_filters">
                                <div className="match_filters_box">
                                    <div align="center" className="tag">
                                        Show Matches
                                    </div>
                                    <div className="cont">
                                        <div className={`option ${state.playedFilter === 'All' ? 'active': ''}`}
                                            onClick={()=> showFilteredMatches('All') }
                                        >
                                            All
                                        </div>

                                        <div className={`option ${state.playedFilter === 'Yes' ? 'active': ''}`}
                                            onClick={()=>showFilteredMatches('Yes')}
                                        >
                                            Played
                                        </div>

                                        <div className={`option ${state.playedFilter === 'No' ? 'active': ''}`}
                                            onClick={()=>showFilteredMatches('No')}
                                        >
                                            Not Played
                                        </div>
                                    </div>
                                </div>

                                <div className="match_filters_box">
                                <div align="center" className="tag">
                                        Results
                                    </div>
                                    <div className="cont">
                                        <div className={`option ${state.resultFilter === 'All' ? 'active': ''}`}
                                            onClick={()=>showFilteredResult('All')}
                                        >
                                            All
                                        </div>

                                        <div className={`option ${state.resultFilter === 'W' ? 'active': ''}`}
                                            onClick={()=>showFilteredResult('W')}
                                        >
                                            Win
                                        </div>

                                        <div className={`option ${state.resultFilter === 'L' ? 'active': ''}`}
                                            onClick={()=>showFilteredResult('L')}
                                        >
                                            Lose
                                        </div>

                                        <div className={`option ${state.resultFilter === 'D' ? 'active': ''}`}
                                            onClick={()=>showFilteredResult('D')}
                                        >
                                            Draw
                                        </div>

                                        <div className={`option ${state.resultFilter === 'n/a' ? 'active': ''}`}
                                            onClick={()=>showFilteredResult('n/a')}
                                        >
                                            N/A
                                        </div>

                                    </div>
                                </div>
                            </div>
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