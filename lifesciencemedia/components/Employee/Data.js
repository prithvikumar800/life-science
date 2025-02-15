import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase/config';
import { getFirestore, doc, get } from 'firebase/firestore';

const Data = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        try {
          const db = getFirestore();
          const userDoc = doc(db, 'users', currentUser.uid); // Accessing user data by UID
          const docSnap = await get(userDoc);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No such user!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user is logged in');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-blue-500 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Hello, {userData?.name}</h1>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span>{userData?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span>{userData?.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Phone:</span>
            <span>{userData?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
