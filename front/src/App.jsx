import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'
import { AppContext, AppDispachContext } from './context/AppContext'
import { fetchState } from './services/rest-api'



function App() {
  const [appState, setAppState] = useState({products:[], categories:[]});
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    if(!loaded){
      setLoaded(true);
      fetchState().then(state=>{
        setAppState(state);
      })
    }
  },[loaded])

  return (
    <AppContext.Provider value={appState}>
      <AppDispachContext.Provider value={setAppState}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </AppDispachContext.Provider>
    </AppContext.Provider>
  )
}
const initialState = [1, 2, 3, 4, 5];
export default App
