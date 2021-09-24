import React, {useEffect, useState} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { Link } from 'react-router-dom';

import {matchesCollection} from '../../../firebase';
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

import { showToastError } from '../../Utils/utils';

const AdminMatches = () => {
    
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(null);

    useEffect(()=>{
        // do something only if it's the first time loaded (matches is empty)
        if(!matches){
            setLoading(true);

            matchesCollection
            .limit(5)
            .get()
            .then(snapshot=>{
                // a reference to the last doc (match)
                const lastVisible = snapshot.docs[snapshot.docs.length-1];
                
                const matches = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setMatches(matches);

            }).catch(error=>{
                showToastError(error)
            }).finally(()=>{
                setLoading(false);
            })
        }

    },[matches])

    const loadMoreMatches = () => {
        // load more matches after the last visible 
        if(lastVisible){
            setLoading(true)
            matchesCollection
                .startAfter(lastVisible)
                .limit(5)
                .get()
                .then(snapshot=>{
                    const lastVisible = snapshot.docs[snapshot.docs.length-1];
                    const newMatches = snapshot.docs.map(doc=>({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setMatches([...matches,...newMatches]);
     
                }).catch(error=>{
                    showToastError(error)
                }).finally(()=>{
                    setLoading(false)
                })
        } else {
            showToastError("Nothing to load")
        }
    }

    return(
        <AdminLayout title="The Matches">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_matches/add_match'}
                    style={{
                        fontSize: 12
                    }}
                >
                    Add Match
                </Button>
            </div>
            
            <Paper className="mb-5">
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Match</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Final</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {matches ? 
                            matches.map((match,i)=>(
                                <TableRow key={match.id}>
                                    <TableCell>
                                        {match.date}
                                    </TableCell>

                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.away} - {match.local}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {/* away - local */}
                                        {match.resultAway} - {match.resultLocal}
                                    </TableCell>

                                    <TableCell>
                                        {match.final === "Yes" ?
                                            <span className="matches_tag_red">Has finished</span>
                                        :
                                            <span className="matches_tag_green">Not played yet</span>
                                        }
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
                onClick={()=>loadMoreMatches()}
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

export default AdminMatches;