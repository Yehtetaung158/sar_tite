import React, { useState } from "react";
import UserList from "./UserList";

const PeopleList = () => {
  const [isUserLists, setIsUserLists] = useState(true);
  console.log("isUserLists", isUserLists);

  return (
    <>
          <UserList setIsUserLists={setIsUserLists} isUserLists={isUserLists} />
    </>
  );
};

export default PeopleList;
