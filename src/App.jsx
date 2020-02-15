import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import { auth, createNewUser } from './firebase/Firebase';
import CreatePost from './components/CreatePost';
import PostPreview from './components/PostPreview';
import uuidv1 from 'uuid/v1';
import { firestore } from './firebase/Firebase';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
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
        const { titleField, contentField, currentUser, posts } = this.state;

        if (!titleField.trim() || !contentField.trim()) {
            alert('Title or content cannot be empty!');
        } else {

            const newPost = {
                key: uuidv1(),
                title: titleField,
                content: contentField,
                author: currentUser.displayName,
                date: new Date().toString().split(':').slice(0, 2).toString().replace(',', ':')
            };
    
            this.handleReset();

            firestore.doc(`posts/${100000000 - posts.length - 1}`).set(newPost);
        }
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
        const { titleField, contentField, currentUser, posts, currentPage } = this.state;

        return (
            <div className="App">
                <Header user={this.state.currentUser} />
                <Switch>
                    <Route exact path={process.env.PUBLIC_URL + '/'}>
                        {currentUser ? <CreatePost handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleReset={this.handleReset} titleField={titleField} contentField={contentField} /> : null}
                        <section className="mw7 center">
                            <h1 className="athelas ph3 ph0-l">News Feed</h1>
                            {posts.length ?
                                <div>
                                    {posts.slice((currentPage - 1) * 5, currentPage * 5).map(post => (<PostPreview {...post} />))}
                                    <div className='ma4'>
                                        <Button onClick={this.handlePageBackward} variant='contained' disabled={currentPage === 1}><ArrowBackIcon /></Button>
                                            <span className='mh3'>{`Page ${currentPage} of ${Math.ceil(posts.length / 5)}`}</span>
                                        <Button onClick={this.handlePageForward} variant='contained' disabled={currentPage === Math.ceil(posts.length / 5)}><ArrowForwardIcon /></Button>
                                    </div>
                                    <div className='ma3'>
                                        <Link to={process.env.PUBLIC_URL + '/all'} style={{ textDecoration: 'none' }}>
                                            <Button style={{ textTransform: 'none' }} variant='outlined'>View All Posts</Button>
                                        </Link>
                                    </div>
                                </div>
                            : <h2>No posts yet!</h2>}
                        </section>
                    </Route>

                    <Route path={process.env.PUBLIC_URL + '/all'}>
                        <section className="mw7 center">
                            <h1 className="athelas ph3 ph0-l">All Posts</h1>
                            {posts.length ?
                                <div>
                                    {posts.map(post => (<PostPreview {...post} />))}
                                    <div className='ma3'>
                                        <Link to={process.env.PUBLIC_URL + '/'} style={{ textDecoration: 'none' }}>
                                            <Button style={{ textTransform: 'none' }} variant='outlined'>Back to News Feed</Button>
                                        </Link>
                                    </div>
                                </div>
                            : <h2>No posts yet!</h2>}
                        </section>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
