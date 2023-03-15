const User = require('../models/userModel');
const ErrorHandlers = require('../utils/errorhandlers');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale"
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      },
    });
  
    sendToken(user, 201, res);
  });
// Login user

exports.loginUser = catchAsyncErrors( async (req,res,next)=>{
    const {email,password} = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandlers("Please enter your email & password",400))
    };
     

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new ErrorHandlers("Invalid email or password",401))
    };

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandlers("Invalid email or password",401))
    }
    

    sendToken(user,200,res)
    
});

// Logout User

exports.logoutUser = catchAsyncErrors(async (req,res,next)=>{
     
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,

    })

    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
}
   
)

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
     
    const user = await User.findOne({email:req.body.email});
   
    if (!user) {
        return next(new ErrorHandlers("User not found",404))
    }
    // Get Reset PasswordToken

   const resetToken =  user.getResetPasswordToken();

   await user.save({validateBeforeSave:false});

   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

   const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email  then please ignore it.`


   try {
     
    await sendEmail({
         email: user.email,
         subject: `AJ Store Password Recovery`,
         message
    })

    res.status(200).json({
        success: true,
        message:`Email send to ${user.email} successfully`
    })
   } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

     await  user.save({validateBeforeSave:false});

     return next(new ErrorHandlers(error.message,500))

   }

})


// Reset Password

exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    // Creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Finding user in database

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    // If user not found
    if (!user) {
        return next(new ErrorHandlers("Reset Password token is invalid or has been expired",400))
    }

    // If Password and confirm Password are not matched

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandlers("Password does not password",400))
    };

    // If both passwords are same then change password

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res)

});


// Get User Details


exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update user Password

exports.updateUserPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandlers("Old password is incorrect",400))
    };

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandlers("Password and confirm password does not match",400))
    };

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res)
})

// update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all Users     --Admin

exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{
    const usersCount = await User.countDocuments();
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
        usersCount
    })
});

// Get Single User Details  --Admin

exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandlers(`User does not exit with Id: ${req.params.id}`,404))
    };

    res.status(200).json({
        success: true,
        user
    })
});

// Update User Role  --Admin

exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    if (!user) {
        return next(new ErrorHandlers(`User not exit with id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Delete User  --Admin

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandlers(`User not exit with Id: ${req.params.id}`,400))
    };

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId)

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted successfully"
    })
})