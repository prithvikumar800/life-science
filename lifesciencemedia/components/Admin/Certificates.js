import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../../Firebase/config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Certificates = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const componentRef = useRef();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    // Detect system theme preference (dark or light mode)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);
    
        const handleChange = (e) => {
          setIsDarkMode(e.matches);
        };
    
        mediaQuery.addEventListener("change", handleChange);
        return () => {
          mediaQuery.removeEventListener("change", handleChange);
        };
      }, []);
    
  
    // Fetch Data from Firestore
    const fetchDataFromFirestore = async () => {
        const db = firebase.firestore();
        try {
          const snapshot = await db.collection("certificate").get();
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFetchedData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchDataFromFirestore();
      }, []);
  
    // Extract unique categories
    const uniqueCategories = [
      ...new Set(fetchedData.map((item) => item.certificateCategory)),
    ];
  
    // Filtered data based on selected category
    const filteredData = selectedCategory
      ? fetchedData.filter((item) => item.certificateCategory === selectedCategory)
      : fetchedData;

      const downloadPDF = (title) => {
        html2canvas(componentRef.current).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
          const fileName = title ? `${title.replace(/\s+/g, '_')}.pdf` : "certificate.pdf";
          pdf.save(fileName);
        });
      };
      
      
  return (
    <div>
               {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
        <div>
        <div className="mb-5 flex p-4 flex-wrap gap-3">
    <button
      onClick={() => setSelectedCategory(null)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        selectedCategory === null ? "bg-blue-600 text-white uppercase shadow-md" : "bg-gray-200 uppercase text-gray-800 hover:bg-gray-300"
      }`}
    >
      Show All
    </button>
    {uniqueCategories.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          selectedCategory === category ? "bg-blue-600 uppercase text-white shadow-md" : "bg-gray-200 uppercase text-gray-800 hover:bg-gray-300"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
  
      
      {filteredData.map((data) => (

      <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        marginBottom:"40px",
        lineHeight: "1.6",
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: "#000", 
       
      }}
    >
    
      <div
        ref={componentRef}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: isDarkMode ? "2px solid #555" : "2px solid #ddd",
          backgroundColor: "#fff", // Always white
          color: "#000", // Always black text
          position: "relative",
        }}
      >
      <div
              className="logo"
              style={{
                position: "absolute",
                top: "40%",
                width: "100%",
                maxWidth: "600px",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src="/logo.png"
                style={{
                  width: "665px",
                  opacity: "0.2",
                  transform: "rotate(-35deg)",
                }}
              ></img>
            </div>
        {/* Header */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{ maxWidth: "200px", marginBottom: "20px" }}
        />
        <div style={{ textAlign: "center" }}>
          <div className="text-xl font-bold"
            style={{
              textAlign: "center",
              border: "2px solid #000",
              padding: "5px 15px",
              display: "inline-block",
              margin: "20px 0",
            }}
          >
            <b>Quality Control Certificate</b>
          </div>
          <h2 className="uppercase" style={{ textAlign: "center", margin: "5px 0px",fontWeight:'bold',  color: "#000",  }}>
          {data.certificateTitle}
          </h2>
        </div>

        {/* Product Details */}
        <div style={{ margin: "20px 0" }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "40%",
              margin: "0 auto",
              fontWeight:'bold',
                    color: "#000", 
            }}
          >
            <div>
              <div>Material Code</div>
              <div>Lot. No.</div>
              <div>Mfg. Date</div>
              <div>Expiry Date</div>
            </div>
            <div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
            </div>
            <div>
              <div className="uppercase" >{data.materialCode}</div>
              <div className="uppercase" >{data.lotno}</div>
              <div className="uppercase" >{data.mfgDate}</div>
              <div className="uppercase" >{data.expiryDate}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ width: "760px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
              border: `1px solid ${isDarkMode ? "#fff" : "#000"}`,
            }}
          >
            
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Pre-plated Medium/20 dishes
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Results
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Theoretical Results
                </th>
              </tr>
            </thead>
            <tbody>
            {data.rows.map((row, index) => (
              <tr key={index}>
             <td
  style={{
    border: "1px solid #000",
    padding: "5px",
    textAlign: "left",
  }}
>
  {row.titleName && (
    <strong className="uppercase">{row.titleName}</strong>
  )}
  {row.subtitleName && (
    <>
      <br />
      <span className="uppercase"
  style={{
   color: "#000",   // Adjust text color based on dark mode
  }}
>
  {row.subtitleName}
</span>

    </>
  )}
</td>

                <td className="uppercase"
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
            {row.result}
                </td>
                <td className="uppercase"
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
         {row.theoretical}
                </td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Signature & Footer */}
        <div style={{ textAlign: "right", margin: "40px 0" }}>
  <img
    src="https://signaturely.com/wp-content/uploads/2020/04/unreadable-letters-signaturely.svg"
    alt="Signature"
    style={{ width: "150px", display: "block", marginLeft: "auto" }}
  />
  <b style={{ display: "block", marginTop: "5px" }}>Signature of Quality Head</b>
</div>


        <hr style={{ height: "1px", backgroundColor: "black" }} />
        <div
          style={{ textAlign: "center", marginTop: "40px", fontSize: "0.9em" }}
        >
          <h2>
            <b>LIFE SCIENCE MEDIA</b>
          </h2>
          <p>
            Plot No - 3, 4th Floor, Rishi kunj, Kirti Nagar, GURGAON - HR-
            122007
          </p>
          <p>
            Tel: 9958007455, 9560098518 Email:{" "}
            <a href="mailto:info@lifesciencemedia.in">
              info@lifesciencemedia.in
            </a>
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0",
        }}
      >
       <button
          onClick={() => downloadPDF(data.certificateTitle)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0077ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Download
        </button>
      </div>
    </div>
      ))}
</div>
        )}
    </div>
  )
}
const buttonStyle = {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ddd",
    borderRadius: "5px",
  };
export default Certificates