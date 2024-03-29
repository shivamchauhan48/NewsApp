import React, { useContext, useState } from "react";
import { datacontext } from "../App";

const Search = () => {
  const [data, setdata] = useContext(datacontext);

  const [input, setinput] = useState("");

  const [filteredList, setFilteredList] = useState(data);

  const filterbysearch = (event) => {
    console.log(filteredList);
    setFilteredList(
      data.filter(
        (f) => f.author && f.author.toLowerCase().includes(event.target.value)
      )
    );
  };
  const handleclick = (e) => {
    e.preventDefault(); 
    console.log("Clicked");
  };

  return (
    <div>
      <form action="">
        <input type="text" onChange={filterbysearch} />
        <button
          onClick={(e) => {
            handleclick(e);
          }}
        >
          Search
        </button>
      </form>

      <ul>
        {filteredList.map((element) => {
          return <li key={element.url}>{element.author}</li>;
        })}
      </ul>
    </div>
  );
};

export default Search;
