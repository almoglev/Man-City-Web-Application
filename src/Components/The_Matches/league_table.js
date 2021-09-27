import React, { useEffect, useState } from 'react';
import { positionsCollection } from '../../firebase';
import {
    Table, TableBody, TableHead, TableCell, TableRow
} from '@material-ui/core'
import { showToastError } from '../Utils/utils';


const LeagueTable = () => {

    const [positions, setPositions] =  useState(null)

    useEffect(()=>{
        if(!positions){
            positionsCollection.get().then(snapshot=>{
                const positions = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));

                setPositions(positions)
            }).catch(error=>{
                showToastError(error);
            });
        }
    },[positions])

    const showTeamPositions = () => (
        positions ?
            positions.map((pos,i)=>(
                <TableRow key={i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{pos.team}</TableCell>
                    <TableCell>{pos.w}</TableCell>
                    <TableCell>{pos.l}</TableCell>
                    <TableCell>{pos.d}</TableCell>
                    <TableCell>{pos.pts}</TableCell>
                </TableRow>
            ))
        : null
    )
    
    return(
        <div className="league_table_wrapper">
            <div className="title">
                League Table
            </div>

            <div >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Win</TableCell>
                            <TableCell>Lose</TableCell>
                            <TableCell>Draw</TableCell>
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { showTeamPositions()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LeagueTable;