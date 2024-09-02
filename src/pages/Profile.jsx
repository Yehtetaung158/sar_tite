import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../store/firebase";
import userIcon from "../assets/user-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav=useNavigate()
  const [user, setUser] = useState(null)  
  console.log(user)

  useEffect(() => {
    const getUserIdHandler = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return getUserIdHandler;
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className=" w-[100px] mb-10 object-cover object-center rounded"
            alt="hero"
            src={userIcon}
            style={{ filter: "invert(0)" }}
          />
          <div className="text-center lg:w-2/3 w-full space-y-6">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {user?.displayName}
            </h1>
            <p>{user?.email}</p>
            <div className="flex justify-center gap-8">
              <button onClick={()=>nav("/home")} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Back
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
