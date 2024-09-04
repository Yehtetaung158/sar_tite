import { useNavigate } from "react-router-dom";
import { auth } from "../../store/firebase";
import { signOut } from "firebase/auth";
import useAlert from "../../Hooks/useAlert";
// import logOutIcon from '../assets/logout-svgrepo-com.svg';

const LogoutBtn = () => {
  const showAlert=useAlert()
  const nav = useNavigate();
  const logOuthandle = () => {
    nav("/login",{state:{isNoData:true}});
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      logOuthandle();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  const handleClick = () => {
    showAlert({
      title: 'Are you sure?',
      text: 'Do you want to logOut?',
      icon: 'warning',
      confirmButtonText: 'Logout',
      showCancelButton: true,
      cancelButtonText: 'No',
      onConfirm: handleLogout,
      // onCancel: handleCancel,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex gap-2 items-center bg-gray-100 dark:bg-gray-500 text-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
    >
      <p className=" text-sm">Log Out</p>
      {/* <img className=" size-6" src={logOutIcon} alt="" /> */}
    </button>
  );
};

export default LogoutBtn;
