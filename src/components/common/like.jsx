import React from "react";
const Like = ({ liked, onClick }) => {
  return (
    <i
      aria-hidden="true"
      onClick={onClick}
      className={"fa active-link " + (liked ? "fa-heart" : "fa-heart-o")}
    ></i>
  );
};

export default Like;
