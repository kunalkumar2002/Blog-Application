import '../App.css';
import {Routes as Switch , Route } from "react-router-dom"
import { Navbar, Home, PostDetail, CreatePost , UpdatePost} from "./";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' Component={Home} />
        <Route exact path='/post/:postId' Component={PostDetail} />
        <Route exact path='/create-post' Component={CreatePost} />
        <Route exact path='/updatePost/:postId' Component={UpdatePost}/>
      </Switch>
    </div>
  );
}

export default App;
