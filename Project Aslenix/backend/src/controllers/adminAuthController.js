export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("EMAIL FROM FRONTEND:", email);
    console.log("PASSWORD FROM FRONTEND:", password);

    console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};