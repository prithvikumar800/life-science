import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { firebase } from '../Firebase/config'; // Assuming this is correctly set up

const Index = () => {
  const [rows, setRows] = useState([
    { titleName: "", subtitleName: "", result: "", theoretical: "" },
  ]);
  const [certificateData, setCertificateData] = useState({
    certificateName: "",
    certificateTitle: "",
    materialCode: "",
    lotno: "",
    mfgDate: "",
    expiryDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      { titleName: "", subtitleName: "", result: "", theoretical: "" },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, idx) =>
      idx === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleCertificateDataChange = (field, value) => {
    setCertificateData({ ...certificateData, [field]: value });
  };

  const handleSubmit = async () => {
    // Collect all the form data
    const certificateDetails = {
      ...certificateData,
      rows,
    };

    try {
      // Add data to Firestore
      const db = firebase.firestore();
      await db.collection("certificate").add(certificateDetails);
      alert("Certificate created successfully!");
      // Close modal after submission
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting certificate: ", error);
      alert("There was an error submitting the certificate.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center px-4">
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`fixed bottom-4 right-4 ${
          isModalOpen ? "bg-red-600" : "bg-teal-600"
        } text-white py-3 px-6 rounded-full shadow-lg hover:opacity-90 focus:outline-none transition duration-200`}
      >
        {isModalOpen ? "Close" : "Create Certificate"}
      </button>

      {isModalOpen && (
        <div className="bg-white rounded-2xl shadow-lg w-full h-full p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">
            Add Certificate Details
          </h2>
          <form>
            {/* Certificate Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="certificateName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={certificateData.certificateName}
                  onChange={(e) => handleCertificateDataChange('certificateName', e.target.value)}
                />
                <label
                  htmlFor="certificateName"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
                >
                  Certificate Name
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="certificateTitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={certificateData.certificateTitle}
                  onChange={(e) => handleCertificateDataChange('certificateTitle', e.target.value)}
                />
                <label
                  htmlFor="certificateTitle"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
                >
                  Certificate Title
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="materialCode"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={certificateData.materialCode}
                  onChange={(e) => handleCertificateDataChange('materialCode', e.target.value)}
                />
                <label
                  htmlFor="materialCode"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
                >
                  Material Code
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="lotno"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={certificateData.lotno}
                  onChange={(e) => handleCertificateDataChange('lotno', e.target.value)}
                />
                <label
                  htmlFor="lotno"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
                >
                  Lot No.
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative z-0 w-full group">
              <input
                type="date"
                id="mfgDate"
                value={certificateData.mfgDate}
                onChange={(e) => handleCertificateDataChange('mfgDate', e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="mfgDate"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
              >
                Manufacturing Date
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="date"
                id="expiryDate"
                value={certificateData.expiryDate}
                onChange={(e) => handleCertificateDataChange('expiryDate', e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="expiryDate"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-teal-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-20px] peer-focus:scale-75 transition-all duration-200"
              >
                Expiry Date
              </label>
            </div>
          </div>

            {/* Table Section */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border text-center border-gray-300 px-4 py-2 text-teal-800">Title & Subtitle</th>
                    <th className="border text-center border-gray-300 px-4 py-2 text-teal-800">Result</th>
                    <th className="border text-center border-gray-300 px-4 py-2 text-teal-800">Theoretical Results</th>
                    <th className="border text-center border-gray-300 px-4 py-2 text-teal-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Enter Title Name"
                            className="block py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={row.titleName}
                            onChange={(e) =>
                              handleInputChange(index, "titleName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Enter Subtitle Name"
                            className="block py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={row.subtitleName}
                            onChange={(e) =>
                              handleInputChange(index, "subtitleName", e.target.value)
                            }
                          />
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          placeholder="Enter Results"
                          className="block py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={row.result}
                          onChange={(e) =>
                            handleInputChange(index, "result", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          placeholder="Enter Theoretical Results"
                          className="block py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={row.theoretical}
                          onChange={(e) =>
                            handleInputChange(index, "theoretical", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeRow(index)}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className="w-full mb-6 py-2 px-4 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition duration-300"
              onClick={addRow}
            >
              Add Row
            </button>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full py-2 px-4 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Index;
