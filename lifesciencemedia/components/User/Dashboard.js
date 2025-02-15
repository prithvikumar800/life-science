import React, { useState, useEffect } from "react";
import { FiTrash2, FiX, FiEdit } from "react-icons/fi";
import { firebase } from '../../Firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PDF from '../../components/PDF';

const Dashboard = ({ userData, loading }) => {
  const [updatedName, setUpdatedName] = useState(userData?.name || "");
  const [updatedMobile, setUpdatedMobile] = useState(userData?.mobile || "");
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpenPDF, setIsModalOpenPDF] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Store filtered data separately
  const [lottoNumber, setLottoNumber] = useState(""); // State for lotto number input
  const [isLottoEntered, setIsLottoEntered] = useState(false); // Flag to check if lotto is entered

  const handleEditClick = () => {
    setIsModalUserOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsModalUserOpen(false);
  };

  const fetchDataFromFirestore = async () => {
    const db = firebase.firestore();
    try {
      const snapshot = await db.collection("certificate").get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchedData(data);
      setFilteredData(data); // Initially show all data
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("There was an error fetching the data.");
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUpdatedName(value);
    } else if (name === "mobile") {
      setUpdatedMobile(value);
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const db = firebase.firestore();
      const userQuery = await db
        .collection("users")
        .where("email", "==", userData?.email)
        .get();

      if (!userQuery.empty) {
        const userDoc = userQuery.docs[0];
        await db.collection("users").doc(userDoc.id).update({
          name: updatedName,
          mobile: updatedMobile,
        });

        toast.success("Profile updated successfully!");
        setIsModalUserOpen(false);
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("There was an error updating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = () => {
    const filtered = fetchedData.filter((data) =>
      data.lotno && data.lotno.includes(searchQuery)
    );
    setFilteredData(filtered); // Update the filtered data state
  };

  const handleLottoSubmit = () => {
    // Check if the lotto number is entered and valid
    if (lottoNumber) {
      setIsLottoEntered(true);
    } else {
      toast.error("Please enter a valid lotto number!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-blue-500 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-xl">
        <h1 className="md:text-4xl text-xl font-semibold text-center text-blue-600 mb-6">Welcome, {userData?.name}</h1>
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-900">{userData?.name}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{userData?.email}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
            <span className="font-semibold text-gray-700">Mobile Number:</span>
            <span className="text-gray-900">{userData?.mobile}</span>
          </div>
          <button
            onClick={handleEditClick}
            className="text-blue-500 flex gap-4 font-bold hover:text-blue-700"
          >
            <FiEdit className="mt-1" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Lotto Number Input */}
      {!isLottoEntered && (
        <div className="min-h-screen bg-white flex px-4">
          <div className="w-full bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-teal-600 mb-6">
              Enter Lotto Number
            </h1>

            <div className="mb-6">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Lotto Number"
                value={lottoNumber}
                onChange={(e) => setLottoNumber(e.target.value)}
              />
              <button
                onClick={handleLottoSubmit}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Data (only shown after Lotto is entered) */}
      {isLottoEntered && (
        <div className="min-h-screen bg-white flex px-4">
          <div className="w-full bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-teal-600 mb-6">
              Search & Download Certificate Data
            </h1>

            <div className="mb-6">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Lot Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md"
              >
                Search
              </button>
            </div>

            <ToastContainer />

            {filteredData && filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse bg-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Certificate Title</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Material Code</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Expiry Date</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Lot Number</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Verification Status</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index} className="hover:bg-teal-50">
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">{index + 1}.{data.certificateTitle}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">{data.materialCode}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">{data.expiryDate}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">{data.lotno}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">
                          {data.Verified === 'True' ? (
                            <span className="text-green-600 font-semibold">Verified</span>
                          ) : (
                            <span className="text-red-600 font-semibold">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b uppercase">
                          <button
                            onClick={() => {
                              setSelectedData(data);
                              setIsModalOpenPDF(true);
                            }}
                            className="text-teal-600 uppercase hover:text-teal-800"
                          >
                            View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-center text-gray-600">No matching certificates found</p>
            )}
          </div>
        </div>
      )}

      {/* Modal to view PDF */}
      {isModalOpenPDF && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
            <FiX
              className="absolute top-4 right-4 text-gray-600 cursor-pointer"
              onClick={() => setIsModalOpenPDF(false)}
            />
            <PDF fileUrl={selectedData?.pdfURL} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
