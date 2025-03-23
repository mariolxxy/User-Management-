import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  if (!user) return <p>User not found</p>;

  return (
    <div className="user-details">
      <h2 className="user-details__title">{user.name}</h2>
      <p className="user-details__email">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="user-details__address">
        <strong>Address:</strong> {user.address?.street || "N/A"},{" "}
        {user.address?.city || "N/A"}
      </p>
    </div>
  );
};

export default UserDetails;
