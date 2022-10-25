import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate,useLocation,useParams } from "react-router-dom";
import Home from "./Home";


const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState(null);
  const location = useLocation();
  const params = useParams();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect( () => {
    console.log('params', params);
    console.log('location', location);
    if (location.search=="?isSignUp=true"){
      setIsSignup(true);
    }else{
      setIsSignup(false);
    }
  },[location])

  const sendRequest = async (type = "login") => {
    try{
      const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
    

    const data = await res.data;
    console.log(data);
    return data;
    }
    catch(error){
      console.log(error.response.data.message);
      setAuthError(error.response.data.message);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/"));
    }
  };
  return (
    <Home>
      <form style={{paddingTop:'144px'}} onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          minHeight={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={0}
          borderRadius={5}
          backgroundColor="white"
        
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignup ? "Sign Up" : "Log  in"}
          </Typography>
          {isSignup && (
            <TextField
            fullWidth

              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
            
            fullWidth
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            fullWidth

            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <h4 style={{color:'#E72515'}}>{authError? authError : ""}</h4>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3,minWidth:120 }}
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            {isSignup ? "Log in" : "Create an Account"}
          </Button>
        </Box>
      </form>
    </Home>
  );
};

export default Auth;
