import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import { auth, createNewUser } from './firebase/Firebase';

class App extends Component {

    unsubscribeFromAuth = null;

    initialState = {
        currentUser: null
    }



    constructor(props) {
        super(props);
        this.state = this.initialState;
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
        return (
            <div className="App">
                <Header user={this.state.currentUser} />
                <section className="mw7 center">
                    <h2 className="athelas ph3 ph0-l">News</h2>
    
                    <article className="pv4 bb b--black-10 ph3 ph0-l">
                        <div className="flex flex-column flex-row-ns">
                            <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                                <h1 className="f3 athelas mt0 lh-title">A whale takes up residence in a large body of water</h1>
                                <p className="f5 f4-l lh-copy athelas">
                                This giant of a whale says it is ready to begin planning a new
                                swim later this afternoon. A powerful mammal that relies on fish and plankton instead
                                of hamburgers.
                                </p>
                            </div>
                            <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                                <img src="http://mrmrs.github.io/photos/whale.jpg" className="db" alt="Whale's tale coming crashing out of the water." />
                            </div>
                        </div>
                        <p className="f6 lh-copy gray mv0">By <span className="ttu">Katherine Grant</span></p>
                        <time className="f6 db gray">Nov. 19, 2016</time>
                    </article>
    
                    <article className="pv4 bb b--black-10 ph3 ph0-l">
                        <div className="flex flex-column flex-row-ns">
                            <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                                <h1 className="f3 athelas mt0 lh-title">
                                ‘We Couldn’t Believe Our Eyes’: A Lost World of Vinyl Is Found
                                </h1>
                                <p className="f5 f4-l lh-copy athelas">
                                Archaeologists have found more than 40 tons of vinyl records,
                                some more than a five years old, shedding light on early hipster
                                trends.
                                </p>
                            </div>
                            <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                                <img src="http://mrmrs.github.io/photos/warehouse.jpg" className="db" alt="Warehouse with stacked shelves." />
                            </div>
                        </div>
                        <p className="f6 lh-copy gray mv0">By <span className="ttu">Imelda Clancy</span></p>
                        <time className="f6 db gray">Nov. 19, 2016</time>
                    </article>
                </section>
            </div>
        );
    }
}

export default App;
