import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import NavBar from './navbar';
import NewsComp from './newsComp';
class MainComp extends Component{
    state={
        navIteam:{}
    }
    render(){
        return(
            <React.Fragment>
            <NavBar/>
            <Switch>
            <Route path="/home" render={(props)=><NewsComp {...props}/>}/>
            <Redirect from="/" to="/home"/>
            </Switch>
            </React.Fragment>
        )
    }
}
export default MainComp