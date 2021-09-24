import React, {useEffect, useState} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { Link } from 'react-router-dom';

import {playersCollection} from '../../../firebase';
import { 
    Button, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@material-ui/core';

import { showToastError, showToastSuccess } from '../../Utils/utils';

const AdminPlayers = () => {
    
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);

    useEffect(()=>{
        // do something only if it's the first time loaded (players is empty)
        if(!players){
            setLoading(true);

            playersCollection
            .limit(5)
            .get()
            .then(snapshot=>{
                // a reference to the last doc (player)
                const lastVisible = snapshot.docs[snapshot.docs.length-1];
                
                const players = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setPlayers(players);

            }).catch(error=>{
                showToastError(error)
            }).finally(()=>{
                setLoading(false);
            })
        }

    },[players])

    const loadMorePlayers = () => {
        // load more players after the last visible 
        if(lastVisible){
            setLoading(true)
            playersCollection
                .startAfter(lastVisible)
                .limit(5)
                .get()
                .then(snapshot=>{
                    const lastVisible = snapshot.docs[snapshot.docs.length-1];
                    const newPlayers = snapshot.docs.map(doc=>({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setPlayers([...players,...newPlayers]);
     
                }).catch(error=>{
                    showToastError(error)
                }).finally(()=>{
                    setLoading(false)
                })
        } else {
            showToastError("Sorry, nothing to load")
        }
    }

    return(
        <AdminLayout title="The Players">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_players/add_player'}
                    style={{
                        fontSize: 12
                    }}
                >
                    Add Player
                </Button>
            </div>
            
            <Paper className="mb-5">
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {players ? 
                            players.map((player,i)=>(
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {player.number}
                                    </TableCell>

                                    <TableCell>
                                        {player.position}
                                    </TableCell>

                                </TableRow>
                            ))
                        : null}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={()=>loadMorePlayers()}
                style={{
                    fontSize: 12
                }}
                disabled={loading}
            >
                Load more
            </Button>
            
            <div className="admin_progress">
                { loading ?
                    <CircularProgress thickness={7} style={{color:'#98c5e9'}}/>
                : null}
            </div>
        </AdminLayout>
    )
}

export default AdminPlayers;