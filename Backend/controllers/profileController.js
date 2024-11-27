import Profile from "../models/Profile.js";
import PG from "../models/PG.js";
import User from "../models/User.js";

const getProfile=async(req,res)=>{
    try{
        const user=req.query.userId;
        console.log(user);
        
        const profile=await Profile.findOne({user:user}).populate('bookings');
        if(!profile){
            return res.json({success:false,message:"Profile not found"})
        }
        console.log(profile);
        
        return res.json({success:true,profile});
    }catch(e){
        console.log(e)
        return res.json({success:false,message:"Profile not found"})
    }
}

const createOrUpdateProfile = async (req, res) => {
    try {
      // Extract files and form data from the request
      const photo = req.files?.photo?.[0]?.filename;
      const aadharCard = req.files?.aadhar?.[0]?.filename;
      const { name, email, phone, age, gender, parent, address, user } = req.body;
      console.log(name, email, phone, age, gender, parent, address, user);
      
  
      // Validate required fields
      if (!user || !email || !phone || !aadharCard) {
        return res.json({ success: false, message: "Please provide all the required fields" });
      }
  
      // Check if the profile already exists for the given user
      const existingProfile = await Profile.findOne({ user });
  
      if (existingProfile) {
        // Update the existing profile
        existingProfile.name = name || existingProfile.name;
        existingProfile.email = email || existingProfile.email;
        existingProfile.phone = phone || existingProfile.phone;
        existingProfile.age = age || existingProfile.age;
        existingProfile.gender = gender || existingProfile.gender;
        existingProfile.parent = parent || existingProfile.parent;
        existingProfile.address = address || existingProfile.address;
  
        // Update photo and aadharCard if new files are uploaded
        if (photo) existingProfile.photo = photo;
        if (aadharCard) existingProfile.aadharCard = aadharCard;
  
        // Save the updated profile
        await existingProfile.save();
  
        return res.json({ success: true, message: "Profile updated successfully" });
      } else {
        // Create a new profile if none exists
        const profile = new Profile({
          name,
          email,
          phone,
          age,
          gender,
          parent,
          address,
          photo,
          aadharCard,
          user,
        });
  
        // Save the new profile
        await profile.save();
  
        return res.json({ success: true, message: "Profile created successfully" });
      }
    } catch (e) {
      console.error(e);
      return res.json({ success: false, message: "Something went wrong" });
    }
  };
  

export {getProfile,createOrUpdateProfile};