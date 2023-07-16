import React from 'react';
import PostElement from "./PostElement";
import blue_icon from "../../res/trainer_blue.png"
import ingo_post from "../../res/ingo_post.png"
import kukui_icon from "../../res/kukui_icon.png"
import ingo_pp from "../../res/ingo_pp.png"
import test_post_video from "../../videos/mudkip-video.mp4";


function PostArea() {
    return (
        <div>
            <PostElement media={blue_icon} likeCount="105" profilePicture={blue_icon} time="6s" username="champblue" explanation="Smell ya later!"/>
            <PostElement media={ingo_post} likeCount="16" profilePicture={ingo_pp} time="2h" username="unova_emmet" explanation="Wherever you are, I miss you brother..."/>
            <PostElement mediaType="video" media={test_post_video} likeCount="56" profilePicture={kukui_icon} time="16h" username="alolan_masked" explanation="Mudkips are SO cool!"/>
        </div>
    );
}

export default PostArea;