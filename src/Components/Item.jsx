import React from "react";

const Item = (props) => {
  return (
    <div className="card cardstyle" style={{width: "18rem"}}>
      <img src={props.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h3>{props.title}</h3>
        <p className="card-text" maxLength="140"
            required>
          {props.content}
        </p>
        <button>
          <a href={props.url} target="_blank">Read More</a>
        </button>
      </div>
    </div>
  );
};

export default Item;
