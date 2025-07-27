const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);


router.post("/upload-image", upload.single("image"), async (req, res) => {
    
        if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl,
        });

    
}
)

module.exports = router;