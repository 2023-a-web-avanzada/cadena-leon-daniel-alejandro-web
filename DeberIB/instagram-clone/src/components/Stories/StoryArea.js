// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import blue_icon from "../../res/trainer_blue.png"
import cynthia_icon from "../../res/trainer_cynthia.png"
import icon_hop from "../../res/icon_hop.jpg"
import kukui_icon from "../../res/kukui_icon.png"
import ingo_pp from "../../res/ingo_pp.png"
import fatima_pp from "../../res/fatima_pp.png"
import StoryElement from "./StoryElement";


function StoryArea() {

    return (
        <div>
            <div>
                <div className="story-area-box">
                    <StoryElement profilePicture={blue_icon} checkOpen={true}>
                        Trainer Blue
                    </StoryElement>
                    <StoryElement profilePicture={cynthia_icon} checkOpen={true}>
                        Champion Cynthia
                    </StoryElement>
                    <StoryElement profilePicture={icon_hop}>
                        Trainer Hop
                    </StoryElement>
                    <StoryElement profilePicture={kukui_icon}>
                        Prof. Kukui
                    </StoryElement>
                    <StoryElement profilePicture={ingo_pp}>
                        Trainer Emmet
                    </StoryElement>
                    <StoryElement profilePicture={fatima_pp}>
                        Elite 4 Fatima
                    </StoryElement>
                </div>
            </div>

        </div>
    );
}

export default StoryArea;
