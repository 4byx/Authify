import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertBox from "./AlertBox";
import { setUser } from "../utils/userSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/gettoken",
        { withCredentials: true }
      );
      const token = await response.data;
      console.log(token);
      if (token.Success === false) {
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

  const [success, setSuccess] = useState(false);
  const handleSignUp = () => {
    setSuccess(true);
  };

  const handleCloseAlert = () => {
    setSuccess(false);
  };

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
      const response = await axios.post(
        "http://localhost:3000/api/v1/signUp",
        formData
      );
      const data = response.data;
      if (data.Success === true) {
        handleSignUp();
        console.log("successfully signed up ", data);
        // navigate("/signIn");
        console.log("not going to sign in ");
      } else {
        console.log("unable to sign up");
      }
    } catch (error) {
      console.log(error);
      throw { error };
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      {success && (
        <AlertBox
          message="Signed Up Successfully!"
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
            Sign Up
          </button>
          <div className="">
            <Link to="/signin">Already have an Account ?</Link>
          </div>
        </form>
      </div>
      <div className="w-full h-screen md:w-1/2">
        <img
          className="h-full"
          src="https://4kwallpapers.com/images/walls/thumbs_3t/8200.jpg"
          alt="photo"
        />
      </div>
    </div>
  );
};

export default SignUp;
