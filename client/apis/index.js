import { get, post } from "./utils";

export const bookingsIndex = () => get(`bookings`);
export const bookingsShow = bookingId => get(`bookings/${bookingId}`);
export const bookingsWatch = bookingId => post(`bookings/${bookingId}/watch`);
