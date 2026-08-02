import { BookingStatus } from "../../../generated/prisma/enums"

export interface TechnicianI {
    userId : string;
    bio ?: string
    experienceYear : number
    skills : string
    hourlyRate : number
    rating : number
    totalReviews : number
    availabilitySlots : string

}

export interface UpdateTechnicianI {
    bio ?: string
    experienceYear ?: number
    skills ?: string
    hourlyRate ?: number
    rating ?: number
    totalReviews ?: number
    availabilitySlots ?: string

}

export interface filteringI {
    searchTerm ?: string
    Rating ?: number
    minPrice ?: number
    maxPrice ?: number
    experience ?: number
    availabilitySlots ?: string

}


export interface paginationI {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}


export interface IServices {
    categoryId : string
    title : string
    description ?: string
    price : number
    duration : number
    location : string,
    imageUrl : string
}


export interface BookingStatusI {
    status : BookingStatus
}