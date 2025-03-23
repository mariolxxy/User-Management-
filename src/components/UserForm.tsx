import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.users.users);

  // Find existing user if editing
  const existingUser = users.find((user) => user.id === Number(id));

  // Set default form values
  const [formData, setFormData] = useState({
    id: existingUser?.id || Date.now(), // Generate ID for new users
    name: existingUser?.name || "",
    email: existingUser?.email || "",
    address: {
      street: existingUser?.address?.street || "",
      suite: existingUser?.address?.suite || "",
      city: existingUser?.address?.city || "",
      zipcode: existingUser?.address?.zipcode || "",
    },
  });

  // Sync formData when editing an existing user
  useEffect(() => {
    if (existingUser) {
      setFormData({
        ...existingUser,
        address: existingUser.address || {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
      });
    }
  }, [existingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Handling nested address fields
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser(formData));
    }

    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="user-form__title">{id ? "Edit User" : "Add User"}</h2>

      <input
        className="user-form__input"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        className="user-form__input"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      {/* Address Inputs */}
      <input
        className="user-form__input"
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
      />
      <input
        className="user-form__input"
        name="address.suite"
        value={formData.address.suite}
        onChange={handleChange}
        placeholder="Suite"
      />
      <input
        className="user-form__input"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        className="user-form__input"
        name="address.zipcode"
        value={formData.address.zipcode}
        onChange={handleChange}
        placeholder="Zipcode"
      />

      <button type="submit" className="user-form__button">
        {id ? "Update" : "Add"} User
      </button>
    </form>
  );
};

export default UserForm;
