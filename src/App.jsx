import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import CreatePost from './components/CreatePost';
import PostPreview from './components/PostPreview';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import Button from '@material-ui/core/Button';

import { auth, createNewUser } from './services/Firebase';
import { firestore } from './services/Firebase';
import uuidv1 from 'uuid/v1';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {

    unsubscribeFromAuth = null;
    unsubscribeFromSnapshot = null;

    initialState = {
        currentUser: null,
        titleField: '',
        contentField: '',
        posts: [],
        currentPage: 1
    }



    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    handleSubmit = () => {
        const { titleField, contentField, currentUser } = this.state;

        if (!titleField.trim() || !contentField.trim()) {
            alert('Title or content cannot be empty!');
        } else {
            
            const currentTime = new Date();
            const postID = 10000000000000 - currentTime.getTime();
            const newPost = {
                id: postID,
                key: uuidv1(),
                title: titleField,
                content: contentField,
                author: currentUser,
                date: currentTime.toString(),
                likes: {}
            };
    
            this.handleReset();

            firestore.doc(`posts/${postID}`).set(newPost);
        }
    }

    handleDelete = postID => {
        firestore.doc(`posts/${postID}`).delete();
    }

    handleReset = () => {
        this.setState({
            titleField: '',
            contentField: ''
        });
    }

    handlePageForward = () => {
        this.setState(state => ({
            currentPage: state.currentPage + 1
        }));
    }

    handlePageBackward = () => {
        this.setState(state => ({
            currentPage: state.currentPage - 1
        }));
    }

    handleSubscription = async sub => {
        const userRef = firestore.doc(`users/${this.state.currentUser.id}`);
        const userObj = await userRef.get();
        const userData = userObj.data();

        try {
            await userRef.set({ ...userData, isSubscribed: sub });
        } catch (err) {
            console.log('Error handling subscription.', err.message);
        }
    }

    handleLike = async (like, postID) => {
        const { currentUser } = this.state;

        if (!currentUser) {
            alert('Please sign in to like this post.');
            return;
        }

        const postRef = firestore.doc(`posts/${postID}`);
        const postSnapshot = await postRef.get();
        const postData = postSnapshot.data();

        try {
            if (like) {
                const updatedUserLikes = { ...postData.likes, [currentUser.id]: currentUser };
                await postRef.set({ ...postData, likes: updatedUserLikes });
            } else {
                delete postData.likes[currentUser.id];
                await postRef.set({ ...postData, likes: postData.likes });
            }
        } catch (err) {
            console.log('Error handling like.', err.message);
        }
    }


    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createNewUser(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({ currentUser: {
                        id: snapshot.id,
                        ...snapshot.data()
                    }});
                })
            } else {
                this.setState({ currentUser: null });
            }
        });

        const postRef = firestore.collection('posts');
        this.unsubscribeFromSnapshot = postRef.onSnapshot(snapshot => {
            const allPosts = snapshot.docs.map(doc => doc.data());
            this.setState({ posts: allPosts });

            if (this.state.currentPage > 1 && this.state.currentPage > Math.ceil(allPosts.length / 5)) {
                this.setState({ currentPage: Math.ceil(allPosts.length / 5) });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
        this.unsubscribeFromSnapshot();
    }


    render() {
        const { currentUser, posts, currentPage } = this.state;

        return (
            <div className='App'>
                <Header user={currentUser} />
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`}>
                        <section className='mw7 center'>
                            <h1 className='athelas ph3 ph0-l'>News Feed</h1>
                            
                            {
                                currentUser ?
                                    <div>
                                        <div className='mh3 dib'>
                                            <Link to={`${process.env.PUBLIC_URL}/newpost`} style={{ textDecoration: 'none' }}>
                                                <Button variant='contained' style={{ backgroundColor: '#1777f2', color: 'white' }}><AddIcon /><span>New Post</span></Button>
                                            </Link>
                                        </div>
                                        {
                                            currentUser.isSubscribed ? 
                                                <div className='mh3 dib'>
                                                    <Button variant='contained' onClick={() => this.handleSubscription(false)}><NotificationsOffIcon /><span>Unsubscribe</span></Button>
                                                </div>
                                            :   <div className='mh3 dib'>
                                                    <Button variant='contained' onClick={() => this.handleSubscription(true)} style={{ backgroundColor: '#f90300', color: 'white' }}><NotificationsActiveIcon /><span>Subscribe</span></Button>
                                                </div>
                                        }
                                    </div>
                                :   null
                            }

                            {
                                posts.length ?
                                    <div>
                                        {posts.slice((currentPage - 1) * 5, currentPage * 5).map(post => (<PostPreview {...post} currentUser={currentUser} handleLike={this.handleLike} handleDelete={this.handleDelete} />))}
                                        <div className='ma4'>
                                            <Button onClick={this.handlePageBackward} variant='contained' disabled={currentPage === 1}><ArrowBackIcon /></Button>
                                                <span className='mh3'>{`Page ${currentPage} of ${Math.ceil(posts.length / 5)}`}</span>
                                            <Button onClick={this.handlePageForward} variant='contained' disabled={currentPage === Math.ceil(posts.length / 5)}><ArrowForwardIcon /></Button>
                                        </div>
                                        <div className='ma3'>
                                            <Link to={`${process.env.PUBLIC_URL}/all`} style={{ textDecoration: 'none' }}>
                                                <Button style={{ textTransform: 'none' }} variant='outlined'>View All Posts</Button>
                                            </Link>
                                        </div>
                                    </div>
                                :   <h3 className='fw4'>No posts yet!</h3>
                            }
                        </section>
                    </Route>

                    <Route path={`${process.env.PUBLIC_URL}/newpost`}>
                        <CreatePost handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleReset={this.handleReset} {...this.state} />
                    </Route>

                    <Route path={`${process.env.PUBLIC_URL}/all`}>
                        <section className='mw7 center'>
                            <h1 className='athelas ph3 ph0-l'>All Posts</h1>
                            {
                                posts.length ?
                                    <div>
                                        {posts.map(post => (<PostPreview {...post} currentUser={currentUser} handleLike={this.handleLike} handleDelete={this.handleDelete} />))}
                                        <div className='ma3'>
                                            <Link to={`${process.env.PUBLIC_URL}/`} style={{ textDecoration: 'none' }}>
                                                <Button style={{ textTransform: 'none' }} variant='outlined'>Back to News Feed</Button>
                                            </Link>
                                        </div>
                                    </div>
                                :   <h3 className='fw4'>No posts yet!</h3>
                            }
                        </section>
                    </Route>

                    <Route path={`${process.env.PUBLIC_URL}/profile/:userID`} render={props => <ProfilePage {...props} currentUser={currentUser} handleLike={this.handleLike} handleDelete={this.handleDelete} />} />
                </Switch>
                <img src='https://img.pngio.com/university-texas-longhorn-clipart-free-85063-png-images-pngio-university-of-texas-longhorns-png-320_161.png' className='h2 w3 ma2' alt='longhorn' />
            </div>
        );
    }
}

export default App;
