import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const PDF = () => {
  const componentRef = useRef();

  const downloadPDF = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        lineHeight: "1.6",
       
      }}
    >
    
      <div
        ref={componentRef}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "2px solid #ddd",
          backgroundColor: "#fff",
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
                src="./logo.png"
                style={{
                  width: "665px",
                  opacity: "0.2",
                  transform: "rotate(-35deg)",
                }}
              ></img>
            </div>
        {/* Header */}
        <img
          src="./logo.png"
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
          <h2 style={{ textAlign: "center", margin: "5px 0px",fontWeight:'bold' }}>
            MUELLER HINTON AGAR
          </h2>
        </div>

        {/* Product Details */}
        <div style={{ margin: "20px 0" }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "36%",
              margin: "0 auto",
              fontWeight:'bold'
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
              <div>MP06</div>
              <div>MP06050224</div>
              <div>05-02-2024</div>
              <div>05-05-2024</div>
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
           
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Colour
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  CONFORME
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Pale Yellow
                </td>
              </tr>
            
            </tbody>
          </table>
        </div>

        {/* Signature & Footer */}
        <div style={{ textAlign: "right", margin: "40px 0" }}>
          <p>
            <b>Signature of Quality Head</b>
          </p>
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
          onClick={downloadPDF}
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
  );
};

export default PDF;