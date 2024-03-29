import React, { useContext, useState } from "react";

import { Layout, theme } from "antd";
import Loading from "./Loading";
import { datacontext, loadcontext } from "../App";
import Single from "./Single";



const { Header, Content, Sider } = Layout;

const ContentSection = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, isLoading] = useContext(loadcontext);
  const [data,setdata]= useContext(datacontext);

  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="contentStyle"
      >
        {loading && <Loading />}
        {!loading &&
          data.map((element) => {
            return (
              <div key={element.url} className="contentMain">
                <Single
                  img={element.urlToImage}
                  title={element.title}
                  content={element.content}
                  url={element.url}
                />
              </div>
            );
          })}
      </Content>
    </>
  );
};

export default ContentSection;
