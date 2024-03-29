import React, { useContext, useEffect, useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

import { provider, auth } from "./Config";
import { signInWithPopup, signOut } from "firebase/auth";
import { logincontext } from "../App";

const LoginSection = () => {
  const [username, setusername] = useState((window.localStorage.getItem("Name"))?(window.localStorage.getItem("Name")):"");
  const [photo, setphoto] = useState();
  const [login, islogin] = useContext(logincontext);
  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            console.log("Logging Out...");
            signOut(auth)
              .then(() => {
                console.log("Logged Out Successfully");
                islogin(false);
              })
              .catch((error) => {
                console.log("Some error");
              });
          }}
        >
          Logout
        </button>
      ),
    },
  ];

  const loginhandler = () => {
    console.log("Login Clicked");
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      islogin(true);
      setusername(data.user.displayName);
      setphoto(data.user.photoURL);
    });
  };
  useEffect(() => {
    const data = window.localStorage.getItem("Name");
    if(data==""){
      console.log("empty");
      window.localStorage.setItem("Name",username);
    }
    else{
      console.log("Exist",data)
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Name", username);
  }, [username]);
  return (
    <>
      {login ? (
        <>
          <div className="logSection">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="">
                  <img src={photo} alt="" style={{ marginTop: "5px" }} />
                  {username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </>
      ) : (
        <div>
          <Menu theme="dark" className="logSection">
            <button onClick={loginhandler}>Login</button>
            <button>Signup</button>
          </Menu>
        </div>
      )}
    </>
  );
};

export default LoginSection;
