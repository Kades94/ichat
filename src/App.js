import {useState, useEffect} from 'react';
import {db,auth} from './firebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Chat from './Chat'
import Login from './Login'
import './App.css'

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        {/*user logged in*/}
        setUser(authUser);
      } else{
        {/*user logged out*/}
        setUser(null);
      }
      
    })
    return () => {
      unsubscribe();
    }
  }, []);
 

  return (
      <div>
        <div>
          <Router>
              <Routes>
                <Route path="/" element={<Signup/>} />
                <Route exact path="/chat" element={<Chat user={user} />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
          </Router>
        </div>
      </div>
  );

}
export default App;

