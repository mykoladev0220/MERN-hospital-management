import React from "react";
import HeroImg from "../assets/img/hero-home.svg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:flex-row-reverse md:justify-between max-w-screen-xl mx-auto px-5 py-5 md:py-28 my-10 md:my-10 h-full items-center">
        <div className="">
          <img src={HeroImg} alt="hero" className="w-96 h-auto" />
        </div>
        <div className="text-center sm:text-left">
          <div>
            <h1 className="text-4xl text-center md:text-left font-bold">
              Welcome To <br />
              Hospital Management
              <br /> System
            </h1>
          </div>
          <div className="my-4 w-full mx-auto ">
            <button className="text-maingreen-200 border-2 border-maingreen-200 rounded-xl px-2 ">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
