import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useFetchDataById } from "../hooks/useFetchDataById";

export default function UserDetails() {
  const userId = useSelector((state) => state.user.id);
  const { data, isLoading, error } = useFetchDataById("user", userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
  }, [userId]);

  return (
    data && (
      <div className="row justify-content-center  w-100">
        <div className="card col-sm-12 col-md-6 col-lg-3 mt-4 p-0">
          <div className="card-header">Profile</div>
          <img src={data.image} className="card-img-top" alt="profile pic" />
          <div className="card-body">
            <h5 className="card-title">
              {data.firstName + " " + data.lastName}
            </h5>
            <p>
              <b>Title:</b> {data.company.title}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Company:</b> {data.company.name}
            </li>
            <li className="list-group-item">
              <b>Email: </b>
              {data.email}
            </li>
            <li className="list-group-item">
              <b>Phone: </b>
              {data.phone}
            </li>
          </ul>
        </div>

        <div
          className="card col-sm-12 col-md-6 col-lg-4 mt-4 ms-lg-4 p-0"
          style={{ height: "fit-content" }}
        >
          <div className="card-header">Company</div>
          <div className="card-body">
            <h5 className="card-title">{data.company.name}</h5>
            <p>
              <b>Address: </b>
              {data.company.address.address +
                ", " +
                data.company.address.city +
                ", " +
                data.company.address.state +
                ", " +
                data.company.address.country}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>State Code: </b>
              {data.company.address.stateCode}
            </li>
            <li className="list-group-item">
              <b>Postal Code: </b>
              {data.company.address.postalCode}
            </li>
            <li className="list-group-item">
              <b>Coordinates: </b>
              {"Lat: " +
                data.company.address.coordinates.lat +
                ", " +
                "Lng: " +
                data.company.address.coordinates.lng}
            </li>
          </ul>
        </div>
      </div>
    )
  );
}
