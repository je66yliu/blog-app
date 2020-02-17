import React, { Component } from 'react';
import PostPreview from './PostPreview';
import { firestore } from '../services/Firebase';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = { displayedUser: null, userPosts: [] };
    }

    getUser = async () => {
        const { match } = this.props;
        const userRef = await firestore.doc(`users/${match.params.userID}`).get();
        const userData = userRef.data();
        this.setState({ displayedUser: userData });
    }

    componentDidMount() {
        this.getUser();

        const { match } = this.props;
        const postRef = firestore.collection('posts');
        this.unsubscribeFromSnapshot = postRef.onSnapshot(snapshot => {
            const allPosts = snapshot.docs.map(doc => doc.data());
            const currentUserPosts = allPosts.filter(post => post.author.id === match.params.userID);
            this.setState({ userPosts: currentUserPosts });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    render() {
        const { displayedUser, userPosts } = this.state;
        const { currentUser, handleLike } = this.props;

        return (
            <div>
                <article className='mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
                    <div className='tc'>
                        <img src={displayedUser ? displayedUser.photoURL : ''} className='br-100 h4 w4 dib ba b--black-05 pa2' alt='profile pic' />
                        <h1 className='f3 mb2'>
                            {displayedUser ? displayedUser.displayName : ''}
                        </h1>
                        <h2 className='f5 fw4 gray mt0'>
                            Contact:
                            <a style={{ textDecoration: 'none', color: '#777' }} href={`mailto:${displayedUser ? displayedUser.email : ''}`} target='_blank' rel='noopener noreferrer'>
                                <span className='fw7'> {displayedUser ? displayedUser.email : ''}</span>
                            </a>
                        </h2>
                    </div>
                </article>
                <section className='mw7 center'>
                    <h1 className='athelas ph3 ph0-l'>{`${displayedUser ? displayedUser.displayName : ''}'s Posts`}</h1>
                    {
                        userPosts.length ?
                            userPosts.map(post => (<PostPreview {...post} currentUser={currentUser} handleLike={handleLike} />))
                        :   <h3 className='fw4'>No posts yet!</h3>
                    }
                </section>
            </div>
        );
    }
}

export default ProfilePage;