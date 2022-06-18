import React, {Component} from "react";
import './App.css';
import CardList from '../components/CardList';
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";


// const App = () => {
//     return(
//         <div className="tc">
//             <h1>RoboFriends</h1>
//             <SearchBox />
//             <CardList robots = {robots}/>
//         </div>        
//     );
// }

class App extends Component{
    constructor(){
        super()
        this.state = {
            // robots: robots,
            robots: [],
            //we are importing the data from external api through componentDidMount()
            //It will mount the data from the url specified
            searchField: '',
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(Response => {
           return Response.json();
        }).then(users => {
            this.setState( {robots: users})
        });
        //fetching the url then converting response into json and then mapping the each response to robot object
        //it removes the hardcoded database
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
        // this.setState is setting passing the value to constructor 
    }

    render(){
        const filter = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
            // The return is a if else condition that checks and filter the robot names
        });

        if(this.state.robots.length === 0){
            return <h1 className="tc">Loading ...</h1>
        }else{

        return(
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                {/* //when SearchBox executes, it looks for the property searchChange. 
                //In SearchBox, the onChange event gets trigger and send out the input values back to App.
                //As searchChange has a function to call, it will use the property value to execute.  */}
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filter}/>
                    </ErrorBoundary>     
                </Scroll>
                {/* As the filter gives a new array of robots, we pass that parameter to CardList to render that specific robot list */}
            </div>        
        );
            }
    }
}

export default App;