import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import './PostPreview.css';

const PostPreview = ({ id, title, content, author, date, handleLike, currentUserID, userName, likes }) => (
    <article className="pv3 bb b--black-10 ph3 ph0-l">
        <div className="flex flex-column flex-row-ns">
            <div className="tl">
                <h1 className="f3 athelas mt0 lh-title">
                    {title}
                </h1>
                <p className="f5 f4-l lh-copy athelas">
                    {content}
                </p>
            </div>
        </div>
        <p className="tl f6 lh-copy gray mv2">
            By
            <Link to={`${process.env.PUBLIC_URL}/profile/${userName}`} style={{ textDecoration: 'none' }}>
                <span className='fw7 pointer'>{author}</span>
            </Link>
        </p>
        <time className="tl f6 db gray">{date}</time>
        <div className='tl mt3'>
            {
                likes[currentUserID] ?
                    <FavoriteIcon className={`v-mid pointer ${likes[currentUserID] ? 'heart' : ''}`} style={{ color: '#ed4956' }} onClick={() => handleLike(false, id)} />
                :   <FavoriteBorderIcon className='v-mid pointer' onClick={() => handleLike(true, id)} />
            }
            <span className='v-mid'>{`• ${Object.keys(likes).length} Like${Object.keys(likes).length === 1 ? '' : 's'}`}</span>
        </div>
    </article>
);

export default PostPreview;
