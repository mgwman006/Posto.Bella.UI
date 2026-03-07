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
  serviceType: string;
  cost: number;
  quantity: number;
  checkInDate:Dayjs;
  checkOutDate:Dayjs;
  numberOfNights:number
}
export interface RoomDTO {
  roomType: string;
  quantity: number;
  cost: number;
  checkInDate:Dayjs;
  checkOutDate:Dayjs;
  numberOfNights:number
}

export interface RoomBookingModel {
  customerName: string;
  phone: string;
  rooms: RoomDTO[];
  extras: ExtraServiceDTO[];
  paymentDetails: PaymentDetails;
  remarks?: string;
  receptionist:string,
  expectedArrivalTime:string
}

export interface RestaurantBookingModel 
{
  customerName:string;
  email: string;
  phone: string;
  date:string;
  eventType:string;
  arrivalTime:String;
  eatingTime: String;
  tableNumber:number;
  guests:number;
  meal:string;
  paymentDetails: PaymentDetails;
  remarks?: string;
  receptionist:string
}