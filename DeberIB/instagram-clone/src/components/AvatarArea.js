import React from 'react';
import test_pp_icon from "../res/red_pp.png";
import nemo_pp from "../res/nemo_pp.png";
import penny_pp from "../res/penny_pp.png";
import arven_pp from "../res/arven_pp.png";
import larry_pp from "../res/larry_pp.png";
import jacq_pp from "../res/jacq_pp.png";

function AvatarArea() {
    return (
        <div>
            <div className="avatar-area-main-box">
                <img className="profile_photo_small" src={test_pp_icon} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">pkmntrainerred</div>
                    <div style={{ color: "#8e8e8e" }}>Trainer Red</div>
                </div>
                <div className="profile-switch-and-follow-button">Switch</div>
            </div>
            <div style={{ margin: "12px 0 12px", display: "flex" }}>
                <div style={{ color: "#8e8e8e" }}>Suggestions for you</div>
                <div style={{ marginLeft: "120px" }}>See All</div>
            </div>
            <div className="avatar-area-suggestions">
                <img className="profile_photo_small" src={nemo_pp} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">champnemona</div>
                    <div style={{ color: "#8e8e8e" }}>Champ Nemona</div>
                </div>
                <div className="profile-switch-and-follow-button">Follow</div>
            </div>
            <div className="avatar-area-suggestions">
                <img className="profile_photo_small" src={penny_pp} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">eeveelover</div>
                    <div style={{ color: "#8e8e8e" }}>Penny Star</div>
                </div>
                <div className="profile-switch-and-follow-button">Follow</div>
            </div>
            <div className="avatar-area-suggestions">
                <img className="profile_photo_small" src={arven_pp} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">missftrainer</div>
                    <div style={{ color: "#8e8e8e" }}>Arven Violet</div>
                </div>
                <div className="profile-switch-and-follow-button">Follow</div>
            </div>
            <div className="avatar-area-suggestions">
                <img className="profile_photo_small" src={larry_pp} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">normalgymleader</div>
                    <div style={{ color: "#8e8e8e" }}>Mr. Larry</div>
                </div>
                <div className="profile-switch-and-follow-button">Follow</div>
            </div>
            <div className="avatar-area-suggestions">
                <img className="profile_photo_small" src={jacq_pp} alt="logo" />
                <div className="avatar-name">
                    <div id="linked-username">proffesorjacq</div>
                    <div style={{ color: "#8e8e8e" }}>Proffesor Jacq</div>
                </div>
                <div className="profile-switch-and-follow-button">Follow</div>
            </div>
            <div className="all-gray">
                <div className="basic-link-help" style={{ marginTop: "30px" }}>
                    <div><a href="frontend/src#">About</a></div>
                    <div>Help</div>
                    <div>Press</div>
                    <div>API</div>
                    <div>Jobs</div>
                    <div>Privacy</div>
                    <div>Terms</div>
                    <div>Locations</div>
                    <div>Language</div>
                </div>
                <div style={{ marginTop: "30px" }}>© 2023 INSTAGRAM FROM META</div>
            </div>
        </div>
    );
}

export default AvatarArea;