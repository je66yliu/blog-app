import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import { auth, createNewUser } from './firebase/Firebase';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

class App extends Component {

    unsubscribeFromAuth = null;

    initialState = {
        currentUser: null,
        titleField: '',
        contentField: '',
        posts: []
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
            const newArr = posts.concat({
                title: titleField,
                content: contentField,
                author: currentUser.displayName,
                date: new Date().toString().split(':').slice(0, 2).toString().replace(',', ':')
            });
    
            this.handleReset();
            this.setState({ posts: newArr });
        }
    }

    handleReset = () => {
        this.setState({
            titleField: '',
            contentField: ''
        });
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
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
        const { titleField, contentField, currentUser, posts } = this.state;

        return (
            <div className="App">
                <Header user={this.state.currentUser} />
                {currentUser ? <CreatePost handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleReset={this.handleReset} titleField={titleField} contentField={contentField} /> : null}
                <section className="mw7 center">
                    <h2 className="athelas ph3 ph0-l">News</h2>
                    {posts.length ? posts.map(post => (<Post {...post} />)) : <h1>No posts yet!</h1>}
                </section>
            </div>
        );
    }
}

export default App;
