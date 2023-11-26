
import './App.css';
import Home from './component/Home';
import { Switch, Route } from 'react-router-dom'
import Profile from './component/Profile';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} ></Route>
          {/* <Route exact path='/profile' component={Profile} ></Route> */}
          <Route exact path='/profile/:id' component={Profile} ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
