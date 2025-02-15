import React, { useRef,useState,useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const PDF = ({ data }) => {
  const componentRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        marginBottom:"20px",
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
          <h2 className="uppercase" style={{ textAlign: "center", margin: "5px 0px",fontWeight:'bold',       color: "#000",  }}>
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
  );
};

export default PDF;