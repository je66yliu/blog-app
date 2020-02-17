import React from 'react';
import { auth } from '../services/Firebase';
import { signInWithGoogle } from '../services/Firebase';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const Header = ({ user }) => (
    <nav className='flex justify-between bb b--white-10 bg-dark-gray'>
        <div className='link white-70 hover-white no-underline flex items-center pa3'>
            <Link to={`${process.env.PUBLIC_URL}/`}>
                <svg className='dib h1 w1' data-icon='grid' viewBox='0 0 32 32' style={{ fill: 'white' }}>
                    <title>Super Normal Icon Mark</title>
                    <path d='M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z' />
                </svg>
            </Link>
        </div>
        <div className='flex-grow pa3 flex items-center'>
            <div className='f6 link dib white dim mr3 mr4-ns pointer'>
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
                    <Link to={`${process.env.PUBLIC_URL}/profile/${user ? user.id : ''}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <div className='f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer'>Hi, {user.displayName}</div>
                    </Link>
                :   <Tooltip arrow title={<span style={{ fontSize: '12px' }}>Create a Google Account</span>} aria-label='signup'>
                        <a className='f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer' href='https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&dsh=S470069364%3A1581635333339519&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp' target='_blank' rel='noopener noreferrer'>
                            Sign Up
                        </a>
                    </Tooltip>
            }

        </div>
    </nav>
);

export default Header;
