import React from 'react';
import { auth } from '../services/Firebase';
import { signInWithGoogle } from '../services/Firebase';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const Header = ({ user }) => (
    <nav className="flex justify-end bb b--white-10 bg-dark-gray">
        <div className="flex-grow pa3 flex items-center">
            <div className="f6 link dib white dim mr3 mr4-ns pointer">
                {
                    user ?
                        <Link to={`${process.env.PUBLIC_URL}/`} style={{ textDecoration: 'none', color: 'white' }}>
                            <div onClick={() => auth.signOut()}>Sign Out</div>
                        </Link>
                    :   <div onClick={signInWithGoogle}>Sign In</div>
                }
            </div>

            {
                user ? 
                    <Link to={`${process.env.PUBLIC_URL}/profile`} style={{ textDecoration: 'none', color: 'white' }}>
                        <div className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer">Hi, {user.displayName}</div>
                    </Link>
                :   <Tooltip arrow title={<span style={{ fontSize: '12px' }}>Create a Google Account</span>} aria-label="signup">
                        <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&dsh=S470069364%3A1581635333339519&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp" target="_blank" rel="noopener noreferrer">
                            Sign Up
                        </a>
                    </Tooltip>
            }

        </div>
    </nav>
);

export default Header;
