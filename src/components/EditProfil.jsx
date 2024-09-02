import React, { useState, useEffect } from "react";
import useUserHook from "../Hooks/useUserHook";
import { updateProfile } from "firebase/auth";

const EditProfil = ({setIsEdit}) => {
  const { currentUser } = useUserHook();
  console.log(currentUser)
  const [currentInputValue, setCurrentInputValue] = useState({
    photoURL: "",
    displayName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCurrentInputValue({
        photoURL: currentUser.photoURL || "",
        displayName: currentUser.displayName || "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInputValue({
      ...currentInputValue,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCurrentInputValue({
      ...currentInputValue,
      photoURL: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentUser) {
        let updatedData = {
          displayName: currentInputValue.displayName,
        };

        if (currentInputValue.photoURL instanceof File) {
          const photoURL = URL.createObjectURL(currentInputValue.photoURL); 
          updatedData.photoURL = photoURL;
        } else {
          updatedData.photoURL = currentInputValue.photoURL;
        }

        await updateProfile(currentUser, updatedData);
        console.log("User profile updated successfully!");
        setIsEdit(false)
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsLoading(false);
      setCurrentInputValue({ photoURL: "", displayName: "" });
    }
  };

  return (
    <>
      <form
        className="container mx-auto flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input type="file" onChange={handleFileChange} />
        <input 
          className="border-gray-600 w-full border-2 px-2 py-1 rounded-lg"
          type="text"
          name="displayName"
          value={currentInputValue.displayName}
          onChange={handleInputChange}
          placeholder="Enter display name"
        />
        <button className="bg-green-500 py-1 w-full rounded-lg" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

export default EditProfil;
