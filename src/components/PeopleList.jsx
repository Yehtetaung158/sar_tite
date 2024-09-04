import React, { useState } from "react";
import UserList from "./UserList";

const PeopleList = () => {
  const [isUserLists, setIsUserLists] = useState(true);

  return (
    <div className=" w-full">
          <UserList setIsUserLists={setIsUserLists} isUserLists={isUserLists} />
    </div>
  );
};

export default PeopleList;
