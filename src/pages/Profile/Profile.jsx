import { getToken } from "../../utils/token";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import { getUser, getUserById } from "../../reduser/counter";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/vidio/bg-profile.mp4";


export function About() {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  let name = getToken().name;
  let idx = getToken().sid;
  let email = getToken().email;
  let phone = getToken().Phone;
  let photo = getToken().PathPhoto;
  const users = useSelector((state) => state.product.dataUser);
  const ById = useSelector((state) => state.product.dataUserById);
  const dispatch = useDispatch();

  console.log(ById);
  console.log(getToken());

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserById(idx));
  }, [idx]);

  return (
    <div className=" pb-[5%] py-[5%]">
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
        src={bg}
      >
        <source src={bg} type="video/mp4" />
      </video>
      <header className="z-10 relative">
        <section className="my-[10%] z-10 border w-[30%] m-auto py-[5%] rounded-xl  backdrop-blur-xl">
          <img
            src={`${imgUrl}${photo}`}
            alt={ById?.username}
            className="w-[150px] h-[150px] bg-black  object-cover m-auto rounded-full"
          />
          <div className=" ">
            <p className="font-mono  text-[32px] text-center mt-[20px]">
              {name}
            </p>
            <p className="font-mono text-[22px] text-white  text-center  mt-[20px]">
              {email}
            </p>
            <p className="font-mono text-[22px] text-white  text-center  mt-[10px]">
              {phone}
            </p>
          </div>
        </section>
        {getToken()[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "User" ? null : (
          <section className="px-[5%] mt-[300px]">
            <TableContainer
              component={Paper}
              sx={{
                backdropFilter: "blur(50px)",
                backgroundColor: "rgb(0,0,0,0.9)",
                border: "1px solid black",
                boxShadow: "1px 1px 1px 1px 20px",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                      Avatar
                    </TableCell>
                    <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                      Phone
                    </TableCell>

                    <TableCell
                      sx={{ color: "white", fontFamily: "monospace" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell
                        sx={{ color: "white", fontFamily: "monospace" }}
                      >
                        <img
                          src={`${imgUrl}${e.pathPhoto}`}
                          alt={e.username}
                          className="w-12 rounded-full"
                        />
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontFamily: "monospace" }}
                      >
                        {e.username}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontFamily: "monospace" }}
                      >
                        {e.email}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontFamily: "monospace" }}
                      >
                        {e.phone}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        )}
      </header>
    </div>
  );
}

export default About;
