import React, { createContext, useState, useEffect, useRef } from "react";
import "./App.css";
import mainlogo from "./logo.png";
import { MenuOutlined } from "@ant-design/icons";

import { Layout, Menu, theme, Pagination, notification, Drawer } from "antd";
import axios from "axios";

import Sidemenu from "./Components/SideMenu";
import ContentSection from "./Components/ContentSection";
import LoginSection from "./Components/LoginSection";

const { Header, Content, Sider, Footer } = Layout;
const items1 = ["Home", "About", "Login"].map((key) => ({
  key,
  label: `${key}`,
}));

export let datacontext = createContext();
export let loadcontext = createContext();
export let countrycontext = createContext();
export let categorycontext = createContext();
export let logincontext = createContext();

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const App = () => {
  const ref = useRef();
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [totatresult, settotal] = useState(0);
  const [loading, isLoading] = useState(true);
  const [country, setcountry] = useState("in");
  const [category, setcategory] = useState("business");
  const [login, islogin] = useState(false);

  const [isopen, setopen] = useState(false);
  const fetchdata = async () => {
    isLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=4&page=${page}&apiKey=d3b0f8a1abb248fda16ffb614f8984bb`;
    let response = await axios.get(url);
    settotal(response.data.totalResults);
    setdata(response.data.articles);
    isLoading(false);
  };

  useEffect(() => {
    fetchdata();
    console.log(data);
  }, [page, , country, category]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={layoutStyle}>
      <Sider
        style={{
          width: "40vw",
        }}
      >
        <div style={{ backgroundColor: "#001529" }}>
          <img
            src={mainlogo}
            alt=""
            style={{
              width: "150px",
              margin: "10px 0px",
            }}
          />
        </div>
        <countrycontext.Provider value={[country, setcountry]}>
          <categorycontext.Provider value={[category, setcategory]}>
            <logincontext.Provider value={[login, islogin]}>
              <Sidemenu />
            </logincontext.Provider>
          </categorycontext.Provider>
        </countrycontext.Provider>
      </Sider>

      <Layout>
        <Header>
          <div className="menuoutlined">
            <MenuOutlined
              style={{ fontSize: "20px", color: "white" }}
              onClick={() => {
                setopen(true);
              }}
            />
          </div>
          <div
            className="menuheader"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "75vw",
            }}
          >
            <div style={{ width: "200px" }}>
              <Menu theme="dark" className="navbarbuttons">
                <a href="">Home</a>
                <a href="">About</a>
              </Menu>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <logincontext.Provider value={[login, islogin]}>
                <LoginSection />
              </logincontext.Provider>
            </div>
          </div>
        </Header>
        <Content>
          <datacontext.Provider value={[data, setdata]}>
            <loadcontext.Provider value={[loading, isLoading]}>
              <ContentSection />
            </loadcontext.Provider>
          </datacontext.Provider>
        </Content>
        <Footer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              total={totatresult}
              onChange={(e) => {
                setpage(e);
              }}
            />
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
