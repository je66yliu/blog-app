import React, { Component } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import LikeDialog from './LikeDialog';
import './PostPreview.css';

class PostPreview extends Component {
    openDialog = () => {
        this.refs.dialog.handleClickOpen();
    }

    render() {
        const { id, title, content, author, date, handleLike, currentUser, likes, handleDelete } = this.props;

        return (
            <article className='pv3 bb b--black-10 ph3 ph0-l'>
                <LikeDialog postID={id} ref='dialog' />
                <div className='flex flex-column flex-row-ns'>
                    <div className='tl w-100'>
                        <div className='flex justify-between'>
                            <h1 className='f3 athelas mt0 lh-title'>
                                {title}
                            </h1>
                            <div className='flex'>
                                {
                                    currentUser && author ? 
                                        currentUser.id === author.id ?
                                            <IconButton onClick={() => handleDelete(id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        : null
                                    : null
                                }
                            </div>
                        </div>
                        <p className='f5 f4-l lh-copy athelas'>
                            {content}
                        </p>
                    </div>
                </div>
                <p className='tl f6 lh-copy gray mv2'>
                    By
                    <Link to={`${process.env.PUBLIC_URL}/profile/${author ? author.id : ''}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <span className='fw7 pointer profile-link'> {author.displayName}</span>
                    </Link>
                </p>
                <time className='tl f6 db gray'>{date.split(':').slice(0, 2).toString().replace(',', ':')}</time>
                <div className='tl mt3'>
                    {
                        likes[currentUser ? currentUser.id : ''] ?
                            <FavoriteIcon className={`v-mid pointer ${likes[currentUser ? currentUser.id : ''] ? 'heart' : ''}`} style={{ color: '#ed4956' }} onClick={() => handleLike(false, id)} />
                        :   <FavoriteBorderIcon className='v-mid pointer' onClick={() => handleLike(true, id)} />
                    }
                    • <span onClick={Object.keys(likes).length ? this.openDialog : null} className={`v-mid ${Object.keys(likes).length ? 'fw7 pointer profile-link' : ''}`}>{`${Object.keys(likes).length} Like${Object.keys(likes).length === 1 ? '' : 's'}`}</span>
                </div>
            </article>
        );
    }
}

export default PostPreview;
