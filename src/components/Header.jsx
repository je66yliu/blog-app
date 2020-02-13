import React from 'react';
import { auth } from '../firebase/Firebase';
import { signInWithGoogle } from '../firebase/Firebase';

const Header = ({ user }) => {
    return (
        <nav className="flex justify-end bb b--white-10 bg-dark-gray">
            <div className="flex-grow pa3 flex items-center">
                <a className="f6 link dib white dim mr3 mr4-ns" href="#0">
                    {
                        user ?
                        <div onClick={() => auth.signOut()}>Sign Out</div>
                        : <div onClick={signInWithGoogle}>Sign In</div>
                    }
                </a>
                <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" href="#0">Sign Up</a>
            </div>
        </nav>
    );
};

export default Header;
