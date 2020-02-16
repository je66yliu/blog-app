import React from 'react';

const ProfilePage = ({ match }) => (
    <div>
        {match.params.userID}
    </div>
);

export default ProfilePage;
