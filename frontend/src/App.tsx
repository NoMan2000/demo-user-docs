import React from 'react';
import './App.scss';
import { Login } from './components/Login';
import { Router } from '@reach/router';
import { UserContext, defaultUser } from './context/User.context';
import { NotFound } from './components/NotFound';
import { EditDocs } from './components/docs/EditDocs';
import { CategoriesContext, defaultCategories } from './context/Categories.context';

export const App = (): JSX.Element => {
  const [userContext, setUserContext] = React.useState(defaultUser);
  const [categoryContext, setCategoryContext] = React.useState(defaultCategories);
  return (
    <section className="App">
      <header className="App-header">
        <h1>User Documentation</h1>
      </header>
      <div className="app-container">
        <UserContext.Provider value={userContext}>
          <CategoriesContext.Provider value={categoryContext}>
            <Router>
              <Login setUserContext={setUserContext} path='/' />
              <Login setUserContext={setUserContext} path='/login' />

              <EditDocs categories={categoryContext} setCategories={setCategoryContext} path='/docs' />
              <EditDocs categories={categoryContext} setCategories={setCategoryContext}  path='/docs/new' />
              <EditDocs categories={categoryContext} setCategories={setCategoryContext} path='/docs/:id' />
              <NotFound default />
            </Router>
          </CategoriesContext.Provider>
        </UserContext.Provider>
      </div>
    </section>
  );
}
