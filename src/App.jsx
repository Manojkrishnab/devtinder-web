import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './pages/Body'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Connections from './pages/Connections'
import ConnectionRequests from './pages/ConnectionRequests'
import Auth from './pages/Auth'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route index element={<Feed />} />
              <Route path='profile' element={<Profile />} />
              <Route path='requests' element={<ConnectionRequests />} />
              <Route path='connections' element={<Connections />} />
              <Route path='auth' element={<Auth />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
