import React from 'react';
import { useHistory } from 'react-router';
import { authService } from '../fbInstance';

const Profile = () => {
    const history = useHistory();
    const signOut = (event) => {
        authService.getAuth().signOut();
        history.push('/')
    }
    return (
        <div>
            <div>Profile</div>
            <div>회원 정보입니다.</div>
            <button onClick={signOut}>로그아웃하기!</button>
        </div>
    );
};

export default Profile;