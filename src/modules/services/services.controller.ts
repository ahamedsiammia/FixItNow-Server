import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { services } from "./services.services";
import { paginationI } from "../technician/technician.interface";
import { IServiceFilter } from "./services.interface";

const getAllServices = async (req: Request, res: Response) => {
  try {

      const filters: IServiceFilter = {
    searchTerm: req.query.searchTerm as string,
    location: req.query.location as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
  };

    const options: paginationI = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as "asc" | "desc",
    };

    const service = await services.getAllServices(filters,options);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Services retrieved successfully",
      data: service,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
      error: { error },
    });
  }
};

const getMyService =async(req:Request,res:Response)=>{
  try {
    

    const userId = req.user?.id as string;

    const service = await services.getMyServiceIntoDB(userId)

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Services retrieved successfully",
      data: service,
    });

  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
      error: { error },
    });
  }
}

export const servicesController = {
  getAllServices,
};
