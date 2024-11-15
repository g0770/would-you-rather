
import { Route, Routes, Outlet } from 'react-router';
import './App.css';
import Game from './components/Game/Game';
import Footer from './components/Game/Footer/Footer';
import ContextHeader from './components/Game/ContextModal/ContextHeader';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {

  const FooterWrapper = () => {
    return(
      <div>
        <Footer/>
        <Outlet/>
      </div>
    )
  }

  const HeaderWrapper = () => {
    return(
      <div>
        <ContextHeader/>
        <Outlet/>
      </div>
    )
  }

  return (
    <div>
      <Routes>
        <Route element={<HeaderWrapper/>}>
          <Route element={<FooterWrapper/>}>
            <Route index path="/" element={<Game/>} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </div>
    

  )
}

export default App;
