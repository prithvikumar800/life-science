import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUserTie } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';

const Employee = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = firebase.firestore(); // Get Firestore instance using firebase
        const usersCollection = db.collection('users'); // Reference to the 'users' collection
        const snapshot = await usersCollection.get(); // Get documents
        const usersList = snapshot.docs.map(doc => doc.data()); // Map documents to data
        setUsers(usersList); // Set state with fetched user data
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchUsers();
  }, []); // Run once when component mounts

  return (
<div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center py-8 px-4">
  <h2 className="text-3xl font-bold text-gray-800 mb-8">Users List</h2>

  {loading ? (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-600 w-20 h-20"></div>
    </div>
  ) : (
    <div className="w-full max-w-5xl">
      {users.length > 0 ? (
        <ul className="space-y-6">
          {users.map((user, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center space-x-5">
                <FaUser className="text-4xl text-blue-500" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{user.name} ({user.role}) </h3>
                  <p className="text-gray-700">{user.email}</p>
                  <p className="text-gray-700">{user.mobile}</p>
                  {/* <p className="text-gray-700 flex items-center">
                    <FaUserTie className="mr-2 text-blue-500" />
                    {user.role}
                  </p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-medium">No users found</p>
      )}
    </div>
  )}

  <ToastContainer />
</div>

  );
};

export default Employee;
