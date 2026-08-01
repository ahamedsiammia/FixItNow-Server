import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { calculatePagination } from "../../utils/pagination";
import { paginationI } from "../technician/technician.interface";
import { IServiceFilter } from "./services.interface";

const getAllServices =async(payload:IServiceFilter,options:paginationI)=>{

    const { searchTerm,location, minPrice,maxPrice } = payload;
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const andConditions: Prisma.ServicesWhereInput[] = [];

      if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ]
    });
  }

    if (location) {
    andConditions.push({
      location: { contains: location, mode: "insensitive" },
    });
  }

    if (minPrice) {
    andConditions.push({
      price: { gte: Number(minPrice) },
    });
  }
    if (maxPrice) {
    andConditions.push({
      price: { lte: Number(maxPrice) },
    });
  }

    const whereConditions: Prisma.ServicesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

    const services = await prisma.services.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

    
  const total = await prisma.services.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: services,
  };
};

const getMyServiceIntoDB = async(userId:string)=>{

  const user = await prisma.user.findUnique({
    where:{
      id : userId
    },
    include:{
      technician : true
    }
  })

  if(!user){
    throw new Error("Your Not Login!")
  }

  const technicianId = user?.technician?.id ;
  if(!technicianId){
    throw new Error("Your Not Technician!")
  }
  
  const services =await prisma.services.findMany({
    where :{
      technicianId : technicianId
    }
  })

  return services
}


export const services ={
    getAllServices,
    getMyServiceIntoDB
}