import React from "react";
import Animate from 'react-move/Animate';
import {easePolyOut} from 'd3-ease';
import { Home } from "@material-ui/icons";

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import PlayerCard from "../../Utils/player_card";


let cards = [
    {
        bottom:170,
        left:370,
        player:Kompany
    },
    {
        bottom:140,
        left:300,
        player:Sterling
    },
    {
        bottom:110,
        left:230,
        player:Otamendi
    },
    {
        bottom:80,
        left:160,
        player:Kompany
    }
]


const HomeCards = (props) => {

    const showAnimateCards = () => (
        cards.map((card,i)=>(
            <Animate
                key={i}
                show={props.show}
                start={{
                    left:0,
                    bottom:0
                }}
                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{ delay:500, duration: 500, ease: easePolyOut }
                }}
            >
                {({left,bottom})=>(
                    <div
                        style={{
                            position: 'absolute',
                            left,
                            bottom
                        }}
                    >
                        <PlayerCard
                            number="4"
                            name="Vincent"
                            lastname="Kompany"
                            bck={card.player}
                        />
                    </div>
                )}
            </Animate>
        ))
    )

    return(
        <div>
            {showAnimateCards()}
        </div>
    )
}

export default HomeCards;