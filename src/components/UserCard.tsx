import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";

interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="user-card">
      <h2 className="user-card__name">{user.name}</h2>
      <p className="user-card__email">Email: {user.email}</p>

      {user.address ? (
        <p className="user-card__address">
          Address: {user.address.street}, {user.address.city}
        </p>
      ) : (
        <p className="user-card__no-address">No address available</p>
      )}

      <div className="user-card__actions">
        <Link to={`/edit-user/${user.id}`} className="user-card__edit">
          Edit
        </Link>
        <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
