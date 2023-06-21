import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handling the cookies state
  const getToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/gettoken",
        { withCredentials: true }
      );
      const data = response.data;
      console.log(token);
      if (data.Success === false) {
        console.log("inside false");
        return {};
      }
      console.log("outside");
      return data;
    } catch (error) {
      console.log("error in fetching token");
      return {};
    }
  };
  useEffect(() => {
    try {
      const data = getToken();
      console.log("inside effect", token);
      if (data.token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("no token found");
    }
  }, []);

  // handling alert box
  const [success, setSuccess] = useState(false);
  const handleSignIn = () => {
    setSuccess(true);
  };
  const handleCloseAlert = () => {
    setSuccess(false);
  };

  // this is checking form data which in inputted
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:3000/api/v1/signIn",
        formData,
        { withCredentials: true }
      );
      const data = response.data;
      dispatch(
        setUser({
          username: data.username,
          id: data._id,
        })
      );
      console.log("the data is set in user sign in ");

      console.log(data);
      if (data.Success === true) {
        handleSignIn();
        navigate("/dashboard");
      }
      // if (data.Success == true) {
      //   console.log(data);
      // }
    } catch (error) {
      console.log(error);
      throw { error };
    }
  };

  // rendering element
  return (
    <div className="flex flex-col md:flex-row">
      {success && (
        <AlertBox
          message="Signed In Successfully!"
          onClose={handleCloseAlert}
        />
      )}
      <div className="flex flex-col items-center justify-center w-full h-screen md:w-1/2">
        <h1 className="font-bold">Welcome Back</h1>
        <form
          action=""
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Enter your username"
            className="px-2 py-1 w-1/3 mx-2 my-2 border-black border-2 rounded-lg"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="******"
            autoComplete="off"
            className="px-2 py-1 w-1/3 mx-2 my-2 border-black border-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-1/3 bg-black text-white py-2 my-1 rounded-lg"
          >
            Sign In
          </button>
        </form>
        <div className="">
          <Link to="/signup">Did not have an account ?</Link>
        </div>
      </div>
      <div className="w-full bg-cover h-screen md:w-1/2">
        <img
          className="h-full"
          src="https://4kwallpapers.com/images/walls/thumbs_3t/8200.jpg"
          alt="photo"
        />
      </div>
    </div>
  );
};

export default SignIn;
