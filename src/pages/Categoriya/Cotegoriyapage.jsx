import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import usav from "../../assets/vidio/usa.mp4";
import tjv from "../../assets/vidio/tj.mp4";
import italiyav from "../../assets/vidio/italiya.mp4";
import japanv from "../../assets/vidio/japan.mp4";
import chinav from "../../assets/vidio/china.mp4";
import { getDataCategoriya } from "../../reduser/counter";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cotegoriyapage = () => {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
  const productCategories = useSelector(
    (state) => state.product.dataCategoriya
  );

  useEffect(() => {
    dispatch(getDataCategoriya());
  }, []);
const filteredCategories = productCategories.filter((e) =>
  e.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <section className="px-[5%] sm:py-[20%] py-[10%]">
        <div className="flex flex-wrap gap-5 my-[5%]">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 font-mono w-5 h-10 rounded-md"></div>
            <p className="text-red-600 font-mono text-2xl">Cotegoriy</p>
          </div>
          <div className="flex justify-between flex-wrap">
            <p className="text-4xl font-mono font-bold">All Cotegoriy</p>
          </div>
          <input
            type="text"
            placeholder="Search for drinks..."
            className="my-[5%] p-[1%] border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className=" sm:flex-wrap sm:w-[80%] sm:m-auto  flex-wrap   flex  justify-between items-center">
          <div className="lg:w-[19%]">
            {filteredCategories
              ?.filter((e) => {
                return e.name == "Italiya";
              })
              ?.map((el) => {
                return (
                  <div className="w-[100%] mx-[5px] py-[20px] ">
                    <Link to={`/catalog/categoriya/${el.id}`}>
                      <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                        <video
                          autoPlay
                          muted
                          loop
                          className="object-cover  rounded-md h-[150px] w-[100%] border "
                          src={italiyav}
                        >
                          <source src={italiyav} />
                        </video>
                        <div key={el.id}>
                          <p className="text-[20px] font-mono">{el.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="lg:w-[19%]">
            {filteredCategories
              ?.filter((e) => {
                return e.name == "Usa";
              })
              ?.map((el) => {
                return (
                  <div className="w-[100%] mx-[5px] py-[20px] ">
                    <Link to={`/catalog/categoriya/${el.id}`}>
                      <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                        <video
                          autoPlay
                          muted
                          loop
                          className="object-cover  rounded-md h-[150px] w-[270px] border "
                          src={usav}
                        >
                          <source src={usav} />
                        </video>

                        <div key={el.id}>
                          <p className="text-[20px] font-mono">{el.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="lg:w-[19%]">
            {filteredCategories
              ?.filter((e) => {
                return e.name == "Tajikistan";
              })
              ?.map((el) => {
                return (
                  <div className="w-[100%] mx-[5px] py-[20px] ">
                    <Link to={`/catalog/categoriya/${el.id}`}>
                      <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                        <video
                          autoPlay
                          muted
                          loop
                          className="object-cover  rounded-md h-[150px] w-[270px] border "
                          src={tjv}
                        >
                          <source src={tjv} />
                        </video>

                        <div key={el.id}>
                          <p className="text-[20px] font-mono">{el.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="lg:w-[19%]">
            {filteredCategories
              ?.filter((e) => {
                return e.name == "Japan";
              })
              ?.map((el) => {
                return (
                  <div className="w-[100%] mx-[5px] py-[20px] ">
                    <Link to={`/catalog/categoriya/${el.id}`}>
                      <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                        <video
                          autoPlay
                          muted
                          loop
                          className="object-cover  rounded-md h-[150px] w-[100%] border "
                          src={japanv}
                        >
                          <source src={japanv} />
                        </video>

                        <div key={el.id}>
                          <p className="text-[20px] font-mono">{el.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="lg:w-[19%]">
            {filteredCategories
              ?.filter((e) => {
                return e.name == "China";
              })
              ?.map((el) => {
                return (
                  <div className="w-[100%] mx-[5px] py-[20px] ">
                    <Link to={`/catalog/categoriya/${el.id}`}>
                      <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                        <video
                          autoPlay
                          muted
                          loop
                          className="object-cover  rounded-md h-[150px] w-[100%] border "
                          src={chinav}
                        >
                          <source src={chinav} />
                        </video>

                        <div key={el.id}>
                          <p className="text-[20px] font-mono">{el.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="w-[100%] flex flex-wrap">
            {filteredCategories
              ?.filter((e) => {
                return (
                  e.name != "Italiya" &&
                  e.name != "Tajikistan" &&
                  e.name != "Japan" &&
                  e.name != "Usa" &&
                  e.name != "China"
                );
              })
              .map((el) => {
                return (
                  <div className="lg:w-[20%] w-[100%] flex">
                    <div className=" w-[100%]  mx-[5px] py-[20px]  mt-[5%] ">
                      <Link to={`/catalog/categoriya/${el.id}`}>
                        <div className="w-[100%] rounded-md p-[20px] flex flex-col gap-2 items-center border hover:shadow-md hover:shadow-gray-400  hover:text-[black] ">
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="object-cover  rounded-md h-[150px] w-[100%] border "
                            alt="picture"
                          />
                          <div key={el.id}>
                            <p className="text-[20px] font-mono">{el.name}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cotegoriyapage;
