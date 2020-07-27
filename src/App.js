import React from "react";
import axios from "axios";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

function App() {
  const [values, setValues] = React.useState({
    Message: "hello",
    MessageList: [],
  });
  const getMessageList = () => {
    let msgList = values.MessageList.map((msg) => {
      return <ListItemText primary={msg} />;
    });
    return msgList;
  };

  const openForm = (event) => {
    return (document.getElementById("myForm").style.display = "block");
  };

  const closeForm = (event) => {
    return (document.getElementById("myForm").style.display = "none");
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClick = (event) => {
    let url = "http://localhost:3001/postMessage";
    let body = { message: values.Message };
    var msgList = values.MessageList;
    msgList.push("You: " + values.Message);
    axios
      .post(url, body)
      .then((res) => {
        msgList.push("Bot: " + res.data.bot_message);
        setValues({ ...values, msgList });
      })
      .catch((err) => {
        console.log(err);
      });
    setValues({ ...values, msgList });
  };
  return (
    <div className="App">
      <button class="open-button" onClick={(e) => openForm(e)}>
        <i
          className="fas fa-robot"
          style={{ fontSize: "48px", color: "red" }}
        ></i>
      </button>

      <div class="chat-popup" id="myForm">
        <form class="form-container">
          <div class="header">
            <h1 class>Job Cloud</h1>
          </div>
          <br></br>
          <div class="list chatbox">
            <div class="chatlogs">
              <List style={{ marginLeft: "10px", color: "black" }}>
                {getMessageList()}
              </List>
            </div>
          </div>

          <div class="footer">
            <label for="msg">
              <b>Message</b>
            </label>
            <textarea
              id="standard-name"
              label="Message"
              value={values.name}
              onChange={handleChange("Message")}
              margin="normal"
              placeholder="Type message.."
              name="msg"
              required
            ></textarea>

            <Button class="btn" onClick={(e) => handleClick(e)}>
              Send
            </Button>
            <button class="btn cancel" onClick={(e) => closeForm(e)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
