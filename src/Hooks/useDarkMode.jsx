import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../store/slice/navSlice";

const useDarkMode = () => {
  const mode = useSelector((state) => state.nav.mode);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    const newMode = !mode;
    dispatch(setDarkMode(newMode));

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { mode, toggleDarkMode };
};

export default useDarkMode;
