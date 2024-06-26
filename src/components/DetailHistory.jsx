import React, { useState, useEffect } from "react";
import StatusButton from "./StatusButton";
import { motion } from "framer-motion";

const DetailHistory = ({ booking }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (booking) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [booking]);

  if (!booking) {
    return <div>Detail Pesanan: Kosong</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString(
      "id-ID",
      options
    );
  };

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "booked":
        return "bg-[#73CA5C] text-white";
      case "pending":
        return "bg-[#FF0000] text-white";
      case "cancelled":
        return "bg-[#8A8A8A] text-white";
      case "confirmed":
        return "bg-[#7126B5] text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-gray-900 font-poppins text-lg font-bold">
            Detail Pesanan
          </h3>
          <div
            className={`${getStatusStyle(
              booking.status
            )} px-3 py-1 rounded-full inline-block mb-1`}
          >
            {capitalizeFirst(booking.status)}
          </div>
        </div>
        <div className="flex">
          <h4 className="text-gray-900 font-poppins text-lg font-bold mb-2">
            <span className="font-normal text-gray-900">Booking Code: </span>
            <span className="text-[#7126B5]">{booking.booking_code}</span>
          </h4>
        </div>
      </div>

      <div className="flex flex-col gap-15px">
        <div className="flex items-start">
          <div className="flex flex-1 flex-col items-start">
            <h5 className="text-gray-900 font-poppins w-33% text-sm font-bold leading-5 md:w-full">
              <span className="text-gray-900">
                {formatTime(booking.Flight.departure_time)}
              </span>
              <br />
              <span className="font-poppins text-sm font-medium text-gray-900">
                {formatDate(booking.Flight.departure_date)}
              </span>
            </h5>
            <p className="text-gray-900 font-poppins text-sm font-medium">
              {booking.Flight.departure_airport} (
              {booking.Flight.departingAirport.city})
            </p>
          </div>
          <div className="relative ml-[-78px] flex">
            <h6 className="text-[#7126B5] font-poppins text-xs font-bold text-deep_purple-300">
              Keberangkatan
            </h6>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex">
          <div className="flex flex-col justify-center py-16 md:py-5">
            <img
              className="h-24px object-cover"
              src="logoplane.svg"
              alt="Logo"
              loading="lazy"
            />
          </div>
          <div className="text-gray-900 font-poppins w-93% text-xs font-medium leading-18px">
            <span className="text-sm font-bold text-gray-900">
              {booking.Flight.Airline.airline_name} -{" "}
              {capitalizeFirst(booking.Tickets[0].Seat.seat_class)}
              <br />
              {booking.Flight.flight_code}
              <br />
            </span>
            <span className="text-sm font-bold text-gray-900">Informasi:</span>
            <br />
            {booking.Tickets.map((ticket, index) => (
              <div key={index}>
                <span className="text-sm text-purple-900">
                  Penumpang {index + 1}: {ticket.Passenger.first_name}{" "}
                  {ticket.Passenger.last_name}
                </span>
                <br />
                <span className="text-sm font-normal text-gray-900">
                  ID: {ticket.Passenger.passenger_id}
                </span>
                <br />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-3.5 pt-3">
        <div>
          <div className="flex items-start">
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <p className="text-gray-900 font-poppins w-41% text-sm font-bold leading-5 md:w-full">
                <span className="text-gray-900 ">
                  {formatTime(booking.Flight.arrival_time)}
                </span>
                <br />
                <span className="font-poppins text-sm font-medium text-gray-900">
                  {formatDate(booking.Flight.arrival_date)}
                </span>
              </p>
              <p className="text-gray-900 font-poppins text-sm font-medium">
                {booking.Flight.arrival_airport} (
                {booking.Flight.arrivingAirport.city})
              </p>
            </div>
            <div className="relative ml-[-24px] flex">
              <p className="text-[#7126B5] font-poppins text-xs font-bold text-deep_purple-300">
                Kedatangan
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-0.5 py-2">
        <div className="flex">
          <p className="text-gray-900 font-poppins text-sm font-bold">
            Rincian Harga
          </p>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              {booking.totalAdult} Adults
            </p>
          </div>
          <div className="flex">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              IDR {formatRupiah(booking.totalAdult * booking.adultPrice)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              {booking.totalChild} Children
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR {formatRupiah(booking.totalChild * booking.childPrice || 0)}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              {booking.totalBaby} Baby
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR {formatRupiah(booking.totalBaby * booking.babyPrice || 0)}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              Tax
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR {formatRupiah(booking.tax || 0)}
          </p>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className="flex items-center gap-2 border-t border-solid border-blue-gray-100 py-2.5">
          <div className="flex flex-1">
            <h6 className="text-gray-900 font-poppins text-base font-bold">
              Total
            </h6>
          </div>
          <h6 className="text-[#7126B5] font-poppins text-lg font-bold">
            IDR {formatRupiah(booking.total_price)}
          </h6>
        </div>
      </div>
      <StatusButton
        status={capitalizeFirst(booking.status)}
        bookingId={booking.booking_id}
        paymentId={booking.payment_id}
        seatClass={booking.Tickets[0].Seat.seat_class}
      />
    </div>
  );
};

export default DetailHistory;

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse duration-700 w-full md:w-auto">
      <div className="h-4 bg-slate-300 w-[200px] rounded-lg mb-2"></div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-5">
          <div className="bg-slate-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-slate-300 rounded-lg w-[80px] h-4"></div>
        </div>
        <div className="bg-slate-300 w-[100px] h-4 rounded-lg"></div>
        <div className="bg-slate-300 w-[160px] h-4 rounded-lg"></div>
      </div>
      <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
        <div className="px-8 mb-3 flex flex-col gap-1">
          <div className="bg-slate-300 rounded-lg w-[80px] h-4"></div>
          <div className="bg-slate-300 rounded-lg w-[50px] h-4"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-slate-300 rounded-lg"></div>
          <div className="flex flex-col gap-0.5">
            <div className="bg-slate-300 rounded-lg w-[70px] h-4"></div>
            <div className="bg-slate-300 rounded-lg w-[55px] h-4"></div>
            <div className="bg-slate-300 rounded-lg w-[65px] h-4"></div>
            <div className="bg-slate-300 rounded-lg w-[80px] h-4"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-5">
          <div className="bg-slate-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-slate-300 rounded-lg w-[80px] h-4"></div>
        </div>
        <div className="bg-slate-300 w-[100px] h-4 rounded-lg"></div>
        <div className="bg-slate-300 w-[160px] h-4 rounded-lg"></div>
      </div>
    </div>
  );
};
