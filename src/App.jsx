import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './pages/Body'
import Profile from './pages/Profile'
import Login from './components/Login'
import Feed from './pages/Feed'
import { Provider } from 'react-redux'
import appStore from './store/appStore'
import Connections from './pages/Connections'
import ConnectionRequests from './pages/ConnectionRequests'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route index element={<Feed />} />
              <Route path='profile' element={<Profile />} />
              <Route path='requests' element={<ConnectionRequests />} />
              <Route path='connections' element={<Connections />} />
              <Route path='login' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
