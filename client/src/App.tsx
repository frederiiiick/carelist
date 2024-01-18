import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import HeaderFooterContainer from './components/HeaderFooterContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import actions from './Redux/Actions';
import Signup from './routes/Signup';
import Home from './routes/Home';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
  });
  
  useEffect(() => {
    const init = async() => {
      if (localStorage.getItem('userLoginData')) {
        await dispatch(actions.auth.retrieveUser());
      }
    }
    init()
  }, [dispatch])

  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route path='/' element={<HeaderFooterContainer />} >
            {
              !user.id
              ? <>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />

              </>
              : <Route path='/' element={<Home />} />
            }
          </Route>
        </Routes>
      </ApolloProvider>
      <ToastContainer />
    </>
  );
}

export default App;
