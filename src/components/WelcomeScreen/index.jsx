import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { Stack } from "@mui/system";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addEmail, addToken } from "../../redux/actions/chatActions";
import { addRoom } from "../../redux/actions/chatActions";

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Login = () => {
    if (email && room) {
      axios.get(`http://localhost:5000/token/${email}`).then(
        (response) => {
          dispatch(addToken(response.data.token));
          dispatch(addEmail(email));
          dispatch(addRoom(room));
          navigate("/chat");
        },
        (error) => {
          console.log(error.message);
          setError(error.message);
        }
      );
    } else {
      setError("Both fields are required.");
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleRoom = (event) => {
    setRoom(event.target.value);
  };

  return (
    <>
      <AppBar
        elevation={19}
        position="fixed"
        style={{ backgroundColor: "black", alignItems: "center" }}
      >
        <Toolbar>
          <img src="Logo.ico" alt="logo" />
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Twilio - Chat - App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid>
        <Paper
          elevation={11}
          style={{
            minWidth: 250,
            padding: 12,
            height: 490,
            width: 450,
            margin: "120px auto",
          }}
        >
          <Grid align="center">
            <img src="favicon.ico" alt="logo" style={{ margin: "15px 0" }} />
            <h1>Welcome</h1>
            <h2>Login Here</h2>
          </Grid>
          <Grid style={{ padding: "30px" }}>
            <Stack spacing={3}>
              <TextField
                name="email"
                required
                label="Email address"
                placeholder="Enter email address"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmail}
                error={error ? true : false}
                helperText={error}
              />

              <TextField
                name="room"
                required
                label="Room"
                placeholder="Enter room name"
                variant="outlined"
                value={room}
                onChange={handleRoom}
                error={error ? true : false}
                helperText={error}
              />
            </Stack>
          </Grid>
          <Button
            onClick={Login}
            variant="contained"
            fullWidth
            style={{
              margin: "10px 0",
              padding: "4%",
              fontWeight: 600,
              backgroundColor: " #8c8c8c",
            }}
          >
            LOGIN IN
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default WelcomeScreen;
