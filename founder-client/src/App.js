import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import React from "react";
import usersReducer from "./user/reducer";
import Login from "./user/login";
import Register from "./user/register";
import Home from "./home/home";
const store = configureStore({
  reducer: {
      users: usersReducer,
  }
})

function App() {
  return (
    <div className="container mt-4 mb-4">
      <Provider store={store}>
        <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home/>}/>  
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
          
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
