import React from "react";
import {AppBar, Toolbar, Button} from '@material-ui/core';
import { Link } from "react-router-dom";
import { CityLogo } from '../Utils/utils';
import { signoutHandler } from '../Utils/utils';


const Header = ({user}) => {

    return(
        <AppBar
            position="fixed"
            style={{
                backgroundColor: '#98c5e9',
                boxShadow:'none',
                padding:'11px 0px',
                borderBottom:'1px solid #00285e'
            }}
        >
            <Toolbar style={{display:'flex'}}>
                <div style={{flexGrow: 1}}>
                    <div className="header_logo">
                        <CityLogo
                            link={true}
                            linkTo={'/'}
                            width="70px"
                            height="70px"
                        />
                    </div>
                </div>

                <Link to="/the_team">
                    <Button color="inherit">The Team</Button>
                </Link>

                <Link to="/matches">
                    <Button color="inherit">Matches</Button>
                </Link>

                {user ?
                    <>
                        <Link to="/dashboard">
                            <Button color="inherit">Dashboard</Button>
                        </Link>

                        <Button color="inherit"
                            onClick={()=> signoutHandler()}>Sign out</Button>
                    </>
                :
                        <Link to="/sign_in">
                            <Button color="inherit">Sign in</Button>
                        </Link>
                }


            </Toolbar>

        </AppBar>
    )
}

export default Header;