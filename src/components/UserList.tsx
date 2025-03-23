import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User List</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <Link to={`/users/${user.id}`} className="user-name">
              {user.name}
            </Link>
            {/* <h3 className="user-name">{user.name}</h3> */}
            <p className="user-email">Email: {user.email}</p>
            <p className="user-address">
              Address: {user.address?.street || "N/A"},{" "}
              {user.address?.city || "N/A"}
            </p>
            <div className="button-group">
              <Link to={`/edit-user/${user.id}`} className="edit-button">
                Edit
              </Link>
              <button
                onClick={() => dispatch(deleteUser(user.id))}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
