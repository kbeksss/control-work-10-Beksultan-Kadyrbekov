import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NewPostForm from "./components/NewPostForm/NewPostForm";
import SinglePost from "./components/SinglePost/SinglePost";

const App = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/new-post' exact component={NewPostForm}/>
            <Route path='/post/:id' exact component={SinglePost}/>
        </Switch>

    );
};

export default App;
