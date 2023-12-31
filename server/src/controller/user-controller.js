import { UserService } from "../services/index.js";

const userService = new UserService();

export const signup = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await userService.create(data);
    return res.status(200).json({
      Success: true,
      data: user,
      message: "successfully created a user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to create a user",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    const response = await userService.signin(data);
    console.log("response from sign in \n", response);
    // console.log(response);
    res.cookie("jwttoken", response, {
      // expires: new  Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    // console.log(res.cookie());
    res.status(201).json({
      Success: true,
      data: response,
      message: "successfully signed in a user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to signed in a user",
      err: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json({
      Success: true,
      data: response,
      message: "successfully fetched all the users",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to fetch all the users",
      err: error,
    });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    console.log("cookies in auth \n", req.cookies);
    const response = await userService.isAuthenticated(req.cookies.jwttoken);
    return res.status(200).json({
      Success: true,
      data: response,
      message: "User is authenticated",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "user is not authenticated",
      err: error,
    });
  }
};

export const gettoken = async (req, res) => {
  try {
    var jwtToken = req.cookies.jwttoken;
    if (!jwtToken) {
      console.log("token not found", jwtToken);
      throw { error: "no token found" };
    }
    console.log("inside get token ", jwtToken);
    return res.status(200).json({
      Success: true,
      data: jwtToken,
      message: "Token is fetched",
      err: {},
    });
  } catch (error) {
    return res.status(200).json({
      Success: false,
      data: [],
      message: "failed to get token",
      err: error,
    });
  }
};
