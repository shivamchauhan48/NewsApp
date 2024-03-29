import React, { useEffect, useState, useContext } from "react";
import Item from "./Item";
import axios from "axios";
import { context, datacontext } from "../App";
import { Carousel } from "antd";
import { useRef } from "react";
import Card from "./Single";
import Single from "./Single";

const MainComp = () => {
  const ref = useRef();
  const [data, setdata] = useContext(datacontext);
  const [country, setcountry] = useContext(context);
  const fetchdata = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=d3b0f8a1abb248fda16ffb614f8984bb&pageSize=4`;
    let response = await axios.get(url);

    setdata(response.data.articles);
  };
  useEffect(() => {
    fetchdata();
    console.log(data);
  }, [country]);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="maincomp">
        <Carousel autoplay ref={ref}>
          {data.map((element) => {
            return (
              <div key={element.url}>
                <Single
                  img={element.urlToImage}
                  title={element.title}
                  content={element.content}
                  url={element.url}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div>
        <button
          onClick={() => {
            ref.current.next();
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            ref.current.prev();
          }}
        >
          Prev
        </button>
      </div>
    </>
  );
};

export default MainComp;
