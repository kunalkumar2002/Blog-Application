import '../App.css';
import {Routes as Switch , Route } from "react-router-dom"
import { Navbar, Home, PostDetail, CreatePost} from "./";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' Component={Home} />
        <Route exact path='/post/:postId' Component={PostDetail} />
        <Route exact path='/create-post' Component={CreatePost} />
      </Switch>
    </div>
  );
}

export default App;
