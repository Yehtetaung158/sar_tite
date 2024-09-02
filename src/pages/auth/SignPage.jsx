import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../store/firebase";
import useUserHook from "../../Hooks/useUserHook";

const SignPage = () => {
  const nav = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const { currentUser, isError, isLoading } = useUserHook();

  useEffect(() => {
    if (currentUser) {
      nav("/home");
    } else if (!isLoading) {
      nav("/");
    }
  }, [currentUser,isError, nav]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitError("");
    try {
      console.log("Submitted values:", values); // Log the values
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential) {
        await updateProfile(auth.currentUser, {
          displayName: values.name,
        });
        nav("/login");
      }
    } catch (error) {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", error); // Log the full error object
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative h-screen flex items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Sign In
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-col -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Name
                    </label>
                    <Field
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="name"
                      type="text"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Email
                    </label>
                    <Field
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="email"
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Password
                    </label>
                    <Field
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="password"
                      type="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-indigo-300"
                  >
                    {isSubmitting ? <>Submitting...</> : <>Submit</>}
                  </button>
                </div>
                <button
                  onClick={() => nav("/login")}
                  className=" p-2 w-full text-center"
                >
                  I don't have any account. Sign Up
                </button>
                {submitError && (
                  <div className="p-2 w-full text-red-500 text-center">
                    {submitError}
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SignPage;
