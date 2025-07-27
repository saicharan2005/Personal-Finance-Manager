

const jwt = require("jsonwebtoken");
const User = require("../models/User");     


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1h" });
};


const registerUser = async (req, res) => {


    const { fullName, email, password, profileImageUrl } = req.body;
    console.log({ fullName, email, password, profileImageUrl });

    if ( !fullName || !email || !password) {
        
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

        const user = await User.create({
          fullName,
          email,
          password,
          profileImageUrl,
        });

        
      res.status(201).json({
          id: user._id,
          user,
          token: generateToken(user._id),
        message: "Registeration Sucessfull",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: `some error occured`,
      });
    }
};

const loginUser = async (req, res) => {
     const {  email, password } = req.body;
     console.log({ email, password });
     

     if (!email || !password) {
       return res.status(400).json({ message: "All fields are required." });
     }
        try {
          const user = await User.findOne({ email });
          if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
          }

         

          res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
            message: "Login Sucessfull",
          });
            
        } catch (e) {
          console.log(e);
          res.status(500).json({
            success: false,
            message: "some error occured",
          });
        }
    
    

};

const getUserInfo = async (req, res) => {
    try {
      const user = await User.findById( req.user.id).select("-password");
      if (!user ) {
        return res.status(404).json({ message: "user not found" });
      }
        
        res.status(201).json({
    
          user,

          message: "userinfo fetched Sucessfully",
        });
        
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "some error occured",
      });
    }
};

module.exports = { registerUser, loginUser, getUserInfo };
