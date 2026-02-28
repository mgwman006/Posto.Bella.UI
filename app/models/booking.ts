import { Dayjs } from "dayjs";
import { Room } from "./enums";
import { PaymentDetails } from "./payment";
export  interface BookingCreateDto
{
    tourId:number;
    customerName:string;
    email:string;
    phoneNumber:string;
    pricePerPerson:number;
    numberOfPeople:number;
    totalPrice:number;
    tourDate:Dayjs;
    specialRequests:string
}

export  interface CreatedBookingDto
{
    id:number;
    tourId:number;
    customerName:string;
    email:string;
    phoneNumber:string;
    pricePerPerson:number;
    numberOfPeople:number;
    totalPrice:number;
    tourDate:Dayjs;
    specialRequests:string,
    referenceNumber:string
}



/* ================= TYPES ================= */

export interface ExtraServiceDTO {
  name: string;
  cost: number;
  quantity: number
}
export interface RoomDTO {
  roomType: string;
  quantity: number;
  cost: number;
}

export interface RoomBookingModel {
  customerName: string;
  email: string;
  phone: string;
  checkInDate:string;
  checkOutDate:string;
  expectedTimeOfArrival:String;
  nights: number;
  rooms: RoomDTO[];
  extras: ExtraServiceDTO[];
  paymentDetails: PaymentDetails;
  remarks?: string;
  receptionist:string
}