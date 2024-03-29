import React from "react";
import { Avatar, Card, Anchor } from "antd";
const { Meta } = Card;
const Single = (props) => (
  <a className="newsitem" href={props.url} target="_blank">
    <Card
      hoverable
      style={{
        width: 240,
        marginRight: "15px",
        height: 362,
        overflow: "hidden",
      }}
      cover={<img alt="example" src={props.img} />}
    >
      <Meta title={props.title} description={props.content} />
    </Card>
  </a>
);
export default Single;
