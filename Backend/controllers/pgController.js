import PG from "../models/PG.js";
import Room from "../models/Room.js";
import Review from "../models/Review.js";
import ApiFeatures from "../utils/apiFeatures.js";

const addPG=async (req,res)=>{
    try{
        const photo = req.files?.photo?.[0]?.filename;
        const {name,university,distance,street,city,state,pincode,latitude,longitude,facilities,phone,email,rooms}=req.body;
        const userId=req.body.userId;
        // console.log(photo);
        const address={street,city,state,pincode,latitude,longitude};
        const contact={phone,email};
        const room=new Room({rooms});
        await room.save();
        // console.log(room);
        const pg=new PG({name,address,university,distance,rooms:[room._id],facilities,photo,contact,owner:userId});
        await pg.save();
        return res.json({success:true,msg:"PG Added Successfully"});
    }
    catch(err){
        console.log(err);
        return res.json({ success: false, msg: "Something went wrong" });
    }
}

const getAllPG=async(req,res)=>{
    try{
        const owner=req.query.userId;        
        const pg=await PG.find({owner:owner}).populate("rooms");
        if (!pg) {
            return res.json({success: false,msg: "No PG found for this user"});
        }
        return res.json({success: true,pg});
        
    }catch(e){
        console.log(e);
        
    }
}

const getAdminPG=async (req,res)=>{
    try{
        const pgId=req.params.id;
        const pg=await PG.findById(pgId).populate("rooms").populate("reviews");
        if (!pg) {
            return res.json({success: false,msg: "Something went wrong"});
        }
        return res.json({success: true,pg});
    }catch(e){
        console.log(e);
    }
}

// user
const getSearchRes=async (req,res)=>{
    try{
        const apiFeature = new ApiFeatures(PG.find().populate('rooms').populate({
            path: "reviews",
            populate: {
                path: "userId",
                model: "User",
            },
        }), req.query).search();
        
        const pgs = await apiFeature.query;
        
        return res.json({success:true,pgs})
    }
    catch(e){
        console.log(e);
        return res.json({success:false,message:"PG not found"})
    }
}

const getPG=async (req,res)=>{
    try{
        const pgId=req.params.id;
        const pg=await PG.findById(pgId).populate("rooms").populate({
            path: "reviews",
            populate: {
                path: "userId",
                model: "User",
            },
        });
        if (!pg) {
            return res.json({success: false,msg: "Something went wrong"});
        }
        return res.json({success: true,pg});
    }
    catch(e){
        console.log(e);
        return res.json({success:false,message:"Something went wrong"})
    }
}

export {addPG,getAllPG,getAdminPG,getSearchRes,getPG};