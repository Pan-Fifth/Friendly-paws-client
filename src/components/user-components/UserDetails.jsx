import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <h2>{user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserDetails;
