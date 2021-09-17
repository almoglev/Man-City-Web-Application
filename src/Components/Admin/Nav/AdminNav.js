import React from "react";
import { Link, withRouter } from 'react-router-dom';
import ListeItem from '@material-ui/core/ListItem';
import { signoutHandler } from '../../Utils/utils';

const AdminNav = (props) => {

    const links =[
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        }
    ]

    const renderIterms = () => (
        links.map(item=>(
            <Link to={item.linkTo} key={item.title}>
                <ListeItem button className="admin_nav_link">
                    {item.title}
                </ListeItem>
            </Link>
        ))
    )


    return(
        <div>
            {renderIterms()}
            <ListeItem button className="admin_nav_link"
                onClick={()=>signoutHandler()}
            >
                Sign out
            </ListeItem>        
        </div>
    )
}

export default withRouter(AdminNav);