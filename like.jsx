import React from "react";

//stateless functional component
const Like = (props) => {
  // input : boolean
  // output: onClick raise event

  const { liked, likeClicked } = props; // argument destructuring
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={likeClicked}
    ></i>
  );
};

export default Like;
