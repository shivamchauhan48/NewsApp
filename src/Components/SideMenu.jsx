import React, { useContext, useState } from "react";
import { Menu } from "antd";
import { categorycontext, countrycontext } from "../App";
import LoginSection from "./LoginSection";
const items2 = [
  {
    key: "1",
    label: "Sort by Country",
    children: [
      { key: "us", label: "USA" },
      { key: "ru", label: "Russia" },
      { key: "cn", label: "China" },
      { key: "in", label: "India" },
    ],
  },
  {
    key: "2",
    label: "Sort by Topic",
    children: [
      { key: "sports", label: "Sports" },
      { key: "business", label: "Business" },
      { key: "health", label: "Health" },
      { key: "science", label: "Science" },
    ],
  },
];

const SideMenu = () => {
  const [country, setcountry] = useContext(countrycontext);
  const [category, setcategory] = useContext(categorycontext);

  const clickHandler = (e) => {
    console.log(e.key);
    e.key === "id" || e.key === "us" || e.key === "ru" || e.key === "cn"
      ? setcountry(e.key)
      : setcategory(e.key);
  };

  const [login, islogin] = useState(false)

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        onClick={clickHandler}
        items={items2}
      />
      <div className="sideLogSection"> 
      <h2>Hello</h2>
      <LoginSection/>
      </div>
    </>
  );

  
};

export default SideMenu;
