import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { addToken } from "../../redux/actions/chatActions";
import { useDispatch } from "react-redux";
import { ChatItem } from "../ChatItem";
import {
  AppBar,
  Backdrop,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { CssBaseline, IconButton } from "@mui/material";
import axios from "axios";
const Chat = require("twilio-chat");
const ChatScreen = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.chatReducers.email);
  const room = useSelector((state) => state.chatReducers.room);
  const token = useSelector((state) => state.chatReducers.token);
  // const messages = useSelector((state)=>state.chatReducers.messages);
  // dispatch(setMessages(messages));
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);
  const scrollDiv = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getMessage = async () => {
      const client = await Chat.Client.create(token);
      client.on("tokenAboutToExpire", async () => {
        axios.get(`http://localhost:5000/token/${email}`).then(
          (response) => {
            dispatch(addToken(response.data.token));
            client.updateToken(response.data.token);
          },
          (error) => {
            navigate("/");
          }
        );
      });
      client.on("tokenExpired", async () => {
        axios.get(`http://localhost:5000/token/${email}`).then(
          (response) => {
            dispatch(addToken(response.data.token));
            client.updateToken(response.data.token);
          },
          (error) => {
            navigate("/");
          }
        );
      });
      client.on("channelJoined", async (channel) => {
        // getting list of all messages since this is an existing channel
        const messages = await channel.getMessages();
        setMessages([...messages, ...messages.items]);
        scrollToBottom();
      });
      try {
        const channel = await client.getChannelByUniqueName(room);
        await joinChannel(channel);
      } catch (err) {
        try {
          const channel = await client.createChannel({
            uniqueName: room,
            friendlyName: room,
          });
          await joinChannel(channel);
        } catch {
          throw new Error("Unable to create channel, please reload this page");
        }
      }
    };
    getMessage();
  }, [email, room, token, messages]);

  useEffect(() => {
    if (channel) {
      channel.on("messageAdded", async (message) => {
        setMessages([...messages, message]);
        scrollToBottom();
      });
    }
  });

  // Takes channel which is an object that represent a chat channel
  const joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
      setChannel(channel);
      setLoading(false);
    }
  };
  const sendMessage = () => {
    if (text) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    const scrollHeight = scrollDiv.current.scrollHeight;
    const height = scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    scrollDiv.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Backdrop open={loading} style={{ zIndex: 99999 }}>
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
        <AppBar
          elevation={19}
          position="fixed"
          style={{ backgroundColor: "black", alignItems: "center" }}
        >
          <Toolbar>
            <img src="Logo.ico" alt="logo" />
            <Typography variant="h6">
              Email: {email} Room: {room}
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Grid
          container
          direction="column"
          style={{
            paddingTop: 100,
            borderWidth: 1,
            backgroundColor: "#E6E6E6",
            paddingBottom: 100,
          }}
        >
          <Grid
            item
            style={{ overflow: "auto", height: "72vh" }}
            ref={scrollDiv}
          >
            {messages.map((message) => (
              <ChatItem
                message={message}
                key={message.index}
                user={{ email }}
              />
            ))}
          </Grid>
          <Grid item style={{ marginTop: 12, marginBottom: 12 }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item style={{ flex: 5, marginTop: 12, marginLeft: 12 }}>
                <TextField
                  style={{
                    width: "100%",
                    borderWidth: 0,
                    borderColor: "transparent",
                  }}
                  placeholder="Type Message here..."
                  variant="outlined"
                  multiline
                  maxRows={2}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={{
                    backgroundColor: "#AD1F1F",
                    marginLeft: 14,
                    marginRight: 19,
                  }}
                  onClick={() => sendMessage()}
                >
                  <SendIcon style={{ color: "white" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ChatScreen;
