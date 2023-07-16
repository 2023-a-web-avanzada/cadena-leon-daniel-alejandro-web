import React from 'react';

import StoryArea from './components/Stories/StoryArea';
import PostArea from './components/Posts/PostArea';
import AvatarArea  from './components/AvatarArea';

function HomePage() {
    return (
        <div className="homepage-main-area">
            <div></div>
            <div className="home-page-post-area">
                <StoryArea />
                <PostArea />
            </div>
            <div className="home-page-avatar-area">
                <AvatarArea />
            </div>
            <div className="home-page-upper-navbar"></div>
        </div>
    );
}

export default HomePage;