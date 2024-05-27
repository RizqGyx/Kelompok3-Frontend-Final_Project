import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoIosNotifications,
  IoMdSearch,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";

const Notifikasi = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5">
        <h1 className="text-xl font-bold">Notifikasi</h1>
        <div className="flex justify-between items-center gap-5 mx-4">
          <div className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg">
            <Link to="/">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
            <h3 className="text-base">Beranda</h3>
          </div>
          <div className="flex gap-2 items-center">
            <button className="flex items-center text-base gap-2 border border-[#7126B5] p-1 px-2 rounded-full">
              <BiFilterAlt className="text-[#8A8A8A] text-xl" /> <p>Filter</p>
            </button>
            <button>
              <IoMdSearch className="text-[#7126B5] text-4xl" />
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Notifikasi;
