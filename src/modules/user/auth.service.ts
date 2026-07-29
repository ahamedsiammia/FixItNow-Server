import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUser, LIuser } from "./auth.interface";
import config from "../../config";
import { createToken } from "../../utils/token/jwtToken";
import { IjwtPayload } from "../../utils/interface";



const createUserIntoDB = async(payload : IUser)=>{

    const {name,email,password,address,phone,profileImage,role,status}= payload;

    const missingFields: string[] = [];

if (!name) missingFields.push("name");
if (!email) missingFields.push("email");
if (!password) missingFields.push("password");
if (!address) missingFields.push("address");
if (!phone) missingFields.push("phone");

if (missingFields.length > 0) {
  throw new Error(`Please provide: ${missingFields.join(", ")}`);
}
        
    const isUserExit = await prisma.user.findUnique({
        where:{email}
    });
    
    if(isUserExit){
        throw new Error("User with this email already exits!")
    };
    
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
            address,
            phone,
            profileImage,
            role,
            status
        },
        omit : {
            password : true
        }
    })

    return user
    
};


const loginUserIntoDB = async(payload:LIuser)=>{
    const {email,password} = payload;


    const isExistUser = await prisma.user.findUnique({
        where :{
            email
        }
    });

    if(!isExistUser){
        throw new Error(`this email is not exist.please ${email} register now`)
    }

    const hashedPassword = isExistUser.password as string;


    const passwordCompare = await bcrypt.compare(password,hashedPassword);

    if(!passwordCompare){
        throw new Error(`Your Password is invalid.please provid valid password`)
    }

    const jwtPayload  = {
        id : isExistUser.id,
        name : isExistUser.name ,
        email : isExistUser.email,
        role : isExistUser.role
    } as IjwtPayload


    const accesstoken = await createToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in);


    const refreshtoken = await createToken(jwtPayload,config.jwt_refresh_secret,config.jwt_refresh_expires_in);

    const {id,name,email : userEmail,address,phone,role,status,profileImage,createdAt,updatedAt} = isExistUser;
    
    const accessToken = accesstoken.data
    const refreshToken = refreshtoken.data

    return {
        id,
        name,
        userEmail,
        address,
        phone,
        role,
        status,
        profileImage,
        createdAt,
        updatedAt,
        accessToken,
        refreshToken
    }


};


const getMeIntoDB = async(userId : string)=>{
    const user = await prisma.user.findUnique({
        where :{
            id : userId
        },
        omit :{
            password : true
        }
    });

    return {user}
}



export const authService = {
    createUserIntoDB,
    loginUserIntoDB,
    getMeIntoDB,
}  
