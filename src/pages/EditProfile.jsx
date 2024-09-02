import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

const EditProfile = ({ isDrawer, setisDrawer }) => {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = auth.currentUser;

      if (user) {
        let updatedData = {
          displayName: formData.name,
        };

        // Handle photo upload if a new photo is selected
        if (formData.photo) {
          const photoURL = URL.createObjectURL(formData.photo); // Placeholder URL, should be replaced with the actual uploaded URL
          updatedData.photoURL = photoURL;
        }

        await updateProfile(user, updatedData);
        console.log("User profile updated successfully!");
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsLoading(false);
      setisDrawer(false);
      setFormData({ photo: null,name:''})
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-500 ${
        isDrawer ? "translate-x-0" : "translate-x-full"
      } bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/3 dark:bg-gray-800`}
    >
      <button
        onClick={() => setisDrawer(false)}
        className="absolute top-2 right-2 text-white"
      >
        X
      </button>

      <div className="w-5/6 mt-14 mx-auto">
        <form onSubmit={updateUserProfile} className="flex flex-wrap -m-2">
          <div className="p-2 w-full flex flex-col gap-8">
            <div className="relative">
              <label
                htmlFor="photo"
                className="leading-7 text-sm text-gray-400"
              >
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-400 cursor-pointer"
              />
            </div>
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="w-full">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center items-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {isLoading ? (
                  <div className="">
                    <div className="loader top-1.5 "></div>
                  </div>
                ) : (
                  <>Save</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
