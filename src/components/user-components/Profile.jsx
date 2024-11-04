import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../authStore'; // เรียกใช้ authStore

const ProfileUser = observer(() => {
  const { user } = authStore;

  // ตรวจสอบว่ามีผู้ใช้ล็อกอินหรือไม่
  useEffect(() => {
    if (!user) {
      console.log("User is not authenticated");
      // สามารถเพิ่มโค้ดเพื่อนำทางไปที่หน้า login ได้
    }
  }, [user]);

  // แสดง loading หาก user ยังไม่มีข้อมูล
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-user">
      <section className="user-details">
        <h2>{user.firstname} {user.lastname}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
      </section>

      <section className="adoption-history">
        <h3>Adoption History</h3>
        <ul>
          {user.adopts.map((adopt) => (
            <li key={adopt.id}>
              Pet Name: {adopt.petName} - Adopted on {new Date(adopt.adoptDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="donation-history">
        <h3>Donation History</h3>
        <ul>
          {user.donations.map((donation) => (
            <li key={donation.id}>
              Amount: {donation.amount} - Date: {new Date(donation.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="volunteer-info">
        <h3>Volunteer Information</h3>
        {user.volunteer ? (
          <p>Volunteer since: {new Date(user.volunteer.joinedDate).toLocaleDateString()}</p>
        ) : (
          <p>Not a volunteer</p>
        )}
      </section>

      <section className="event-participation">
        <h3>Event Participation</h3>
        <ul>
          {user.eventAttendees.map((event) => (
            <li key={event.id}>
              Event: {event.name} - Date: {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
});

export default ProfileUser;
