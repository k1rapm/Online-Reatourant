import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";
import { Autoplay, Pagination } from "swiper/modules";
import AppleIcon from "@mui/icons-material/Apple";
import Card from "../../components/Card/Card";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import HeadsetOutlinedIcon from "@mui/icons-material/HeadsetOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import Swipe from "../../components/Card/Swiper";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import usav from "../../assets/vidio/usa.mp4";
import tjv from "../../assets/vidio/tj.mp4";
import italiyav from "../../assets/vidio/italiya.mp4";
import japanv from "../../assets/vidio/japan.mp4";
import chinav from "../../assets/vidio/china.mp4";

import vidhome from "../../assets/vidio/vidhome.mp4";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  getData,
  getDataCategoriya,
  getDishesWithDrinks,
} from "../../reduser/counter";
import { getDataDrink } from "../../reduser/counter";
import { getToken } from "../../utils/token";
import { Link } from "react-router-dom";
import Card2 from "../../components/Card/Card2";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

export function Home() {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.data);
  const productdrink = useSelector((state) => state.product.dataDrink);
  const productCategoriya = useSelector(
    (state) => state.product.dataCategoriya
  );
  const sliderdata = useSelector((state) => state.product.dataDishesWithDrinks);
  const [comments, setComments] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  let titleName = getToken().name;
  console.log(getToken());

  const handleDayClick = (day, date) => {
    setSelectedDate(date);
    setComment(comments[date.format("YYYY-MM-DD")] || "");
    setAnchorEl(day.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSave = () => {
    setComments({
      ...comments,
      [selectedDate.format("YYYY-MM-DD")]: comment,
    });
    handlePopoverClose();
  };

  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    const dateStr = day.format("YYYY-MM-DD");
    return (
      <div
        onClick={(event) => handleDayClick(event, day)}
        style={{ position: "relative" }}
      >
        {dayComponent}
        {comments[dateStr] && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            cvb !
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        toggleActions: "restart none none reverse",
      },
    });

    // Background image parallax effect
    timeline.fromTo(
      bgRef.current,
      { scale: 2 },
      { scale: 1, duration: 2, ease: "power3.out" }
    );
    // Section fade in and scale up
    timeline.fromTo(
      sectionRef.current,
      { opacity: 1, y: 100, scale: 16, borderRadius: "0%" },
      {
        opacity: 1,
        y: 0,
        scale: 0,
        duration: 10,
        borderRadius: "0%",
        ease: "power3.out",
      },
      "-=2"
    );

    // Staggered text animations
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          toggleActions: "restart none none reverse",
        },
      }
    );
  }, []);
  // const shuffledProducts = [...product]
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 7);
  // const shuffledProducts2 = [...productdrink]
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 7);
  const shuffleArray = (array) => {
    return array;
  };
  console.log(productCategoriya);

  useEffect(() => {
    dispatch(getData());
    dispatch(getDataDrink());
    dispatch(getDataCategoriya());
    dispatch(getDishesWithDrinks());
  }, []);

  return (
    <div className="  from-white ">
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={vidhome}
      >
        <source src={vidhome} type="video/mp4" />
      </video>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
        }}
        className="flex items-center justify-center gap-10 sm:inline-block"
      >
        <div className=" relative z-10 sm:mt-[80%]  bottom-[5%]  text-white">
          <h1 ref={titleRef} className="text-6xl sm:text-5xl  font-mono">
            Hello<span className="text-orange-400"> {titleName} </span> 
          ,Welcome to our restourant
          </h1>
        </div>
      </section>
      <div className="w-[100%] m-auto flex flex-col gap-[60px] sm:w-[390px] sm:gap-[40px]">
        <section className="flex pb-[20px] items-center  sm:inline-block">
          <div className="mt-[8%] sm:hidden w-[100%]">
            <Swiper
              slidesPerView={3} // Default to 1 slide per view
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-[100%] flex-wrap h-[300px] sm:w-[100%] sm:h-[633px]"
            >
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(0, 1).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(1, 2).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(6, 7).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(2, 3).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(3, 4).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(7, 8).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(4, 5).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(5, 6).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(8, 9).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="mt-[8%] hidden m-auto sm:block w-[90%]">
            <Swiper
              slidesPerView={1} // Default to 1 slide per view
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-[100%] flex-wrap h-[300px] sm:w-[100%] sm:h-[633px]"
            >
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(0, 1).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(1, 2).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(6, 7).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(2, 3).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(3, 4).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(7, 8).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(4, 5).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(5, 6).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="sm:p-[2px_2px]   ">
                <div>
                  <div className=" gap-1 flex w-[100%]">
                    {sliderdata?.slice(8, 9).map((el) => (
                      <div
                        className="w-[500px] flex-wrap sm:w-[100%] hover:shadow-md hover:w-[505px] border-[1px] border-black   h-[300px]"
                        key={el.id}
                      >
                        <Link to={`cart/${el.id}`}>
                          <img
                            src={`${imgUrl}${el.pathPhoto}`}
                            className="w-[100%] h-[100%] object-cover m-auto"
                            alt="picture"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <hr className="w-[90%] h-[2px] m-auto" />
        <section className="flex lg:px-[5%] sm:px-[2%]  flex-col gap-[32px] ">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center gap-[16px]">
              <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
              <p className="text-[#DB4444] font-mono text-[20px]">Categories</p>
            </div>
            <p className="text-[35px] font-mono font-bold">
              Category By Country
            </p>
          </div>
          <div className=" sm:flex-wrap sm:w-[80%] sm:m-auto  flex-wrap   flex  justify-between items-center">
            <div className="lg:w-[19%]">
              {productCategoriya
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
              {productCategoriya
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
              {productCategoriya
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
              {productCategoriya
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
              {productCategoriya
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
          </div>
        </section>
        <hr className="w-[90%] h-[2px] m-auto" />
        <section className="flex px-[5%]  flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center gap-[16px]">
              <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
              <p className="text-[#DB4444] font-mono text-[20px]">
                This Month`s Top
              </p>
            </div>
            <div className="flex justify-between  sm:flex-col sm:items-start sm:gap-[10px]">
              <p className="text-[35px] font-bold sm:text-[28px] sm:font-[600] font-mono">
                Drinks
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[30px] sm:flex sm:flex-col">
            {productdrink?.slice(0, 4).map((el) => (
              <Card2
                key={el.id}
                id={el.id}
                img={`${imgUrl}${el.pathPhoto}`}
                description={el.description}
                cookingTimeInMinutes={el.cookingTimeInMinutes}
                title={el.name}
                price={el.price}
              />
            ))}
          </div>
        </section>

        <hr className="w-[90%] h-[1px] m-auto" />
        <section className="flex px-[5%]  flex-col gap-[32px] sm:p-[0px_20px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center gap-[16px]">
              <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
              <p className="text-[#DB4444] font-mono text-[20px]">
                This Month`s Top
              </p>
            </div>
            <div className="flex justify-between  sm:flex-col sm:items-start sm:gap-[10px]">
              <p className="text-[35px] font-bold sm:text-[28px] sm:font-[600] font-mono">
                foods
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[30px] sm:flex sm:flex-col">
            {product?.slice(0, 4).map((el) => (
              <Card
                key={el.id}
                id={el.id}
                img={`${imgUrl}${el.pathPhoto}`}
                description={el.description}
                title={el.name}
                cookingTimeInMinutes={el.cookingTimeInMinutes}
                price={el.price}
              />
            ))}
          </div>
        </section>
        <hr className="w-[90%] h-[1px] m-auto" />

      </div>
    </div>
  );
}

export default Home;
