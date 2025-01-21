import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import a from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db, getAllDocuments, getDocumentById } from "utils/firebase";
import { formatDate } from "utils/helper";
import style from "./Trackingpage.module.css";
import { Button, Modal } from "react-bootstrap";
const Trackingpage = () => {
  const router = useRouter();
  const id = router.query.id;
  const [imageHeight, setImageHeight] = useState(80); // Initial height of the image

  useEffect(() => {
    if (id) {
      (async () => {
        const d = await getDocs(
          query(
            collection(db, "order"),
            where("orderId", "==", id),
            where("isDelete", "==", false)
          )
        );
        let dee = undefined;
        d.forEach((elem) => {
          dee = elem.data();
        });

        setData(dee);
      })();
    }
  }, [id]);
  const [data, setData] = useState(null);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  return (
    <>
      <Modal show={show1} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src={data?.reciverSign}
            ></img>
          </div>
        </Modal.Body>
      </Modal>
      <header className="" role="banner">
        <div className={`${style.mainContainer}`}>
          <div>
            <div>
              <a href="/home" className={style.logoContainer}>
                <img src="/images/hlogo.png"></img>

                <img src="/images/glogo.png"></img>
              </a>
            </div>
          </div>
          <div className={style.numContainer}>
            <a
              style={{
                color: "#666666",
              }}
              href="tel:+917043499952"
              className=""
            >
              <span className="icon-phone"></span>{" "}
              <span className="d-md-inline-block">+91 70434 99952</span>
            </a>
            <a
              style={{
                color: "#666666",
              }}
              href="tel:+917043499953"
              className="ml-3"
            >
              <span className="  icon-whatsapp"></span>{" "}
              <span className=" d-md-inline-block">+91 70434 99953</span>
            </a>
          </div>
        </div>
      </header>

      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(45deg, #377aff 0%, #00d9ff 100%)",
        }}
      >
        {data === null ? (
          <h1>Loading...</h1>
        ) : data ? (
          <div
            div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                minWidth: "50vw",
                maxWidth: "90vw",
                padding: "30px",
                border: "2px solid black",
                height: "fit-content",
                flexWrap: "wrap",
                background: "white",
                // flexWrap:"wrap",
                overflow: "scroll",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  height: "fit-content",
                }}
              >
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      style={{
                        backgroundColor: "#003c82",
                        color: "white",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Shipment Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Booking Date
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {formatDate(data?.orderDetails?.bookingDate)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      AWB No.
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.orderId}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Actual Weight
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {parseFloat(data?.orderDetails?.chargebleWeight).toFixed(
                        3
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Pcs
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {parseFloat(data?.orderDetails?.pcs)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Service Type
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.orderDetails?.serviceType}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Consignee Name
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.orderDetails?.personName}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Origin
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.clientDetails?.city}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Destination
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.orderDetails?.city}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Forwarding No.
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.orderDetails?.serviceType === "SELF_DOM"
                        ? "-"
                        : data?.orderDetails?.forwardingNumber}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Delivery Status
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.isDelivered}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Delivery Date
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.deliveryDate
                        ? formatDate(data?.deliveryDate)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Delivery Proof
                    </td>
                    <td
                      onClick={() => {
                        setShow1(true);
                      }}
                      style={{ ...cellStyle, textTransform: "capitalize" }}
                    >
                      {data?.reciverSign ? (
                        <img src={data?.reciverSign} width={200}></img>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>{" "}
                  <tr>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      Reciever Name
                    </td>
                    <td style={{ ...cellStyle, textTransform: "capitalize" }}>
                      {data?.RecieverName ? data?.RecieverName : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                minWidth: "50vw",
                maxWidth: "90vw",
                padding: "30px",
                border: "2px solid black",
                height: "fit-content",
                flexWrap: "wrap",
                background: "white",
                // flexWrap:"wrap",
                overflow: "scroll",
              }}
            >
              {/* Shipment Details Table */}

              {/* Shipping History Table */}
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th
                      colSpan={5}
                      style={{
                        backgroundColor: "#003c82",
                        color: "white",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Shipping History
                    </th>
                  </tr>
                  <tr>
                    <th style={headerCellStyle}>Date</th>
                    <th style={headerCellStyle}>Time</th>
                    <th style={headerCellStyle}>Location</th>
                    <th style={headerCellStyle}>Status</th>
                    <th style={headerCellStyle}>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.status
                    ?.slice()
                    .reverse()
                    .map((element) => {
                      return (
                        <tr>
                          <td
                            style={{
                              ...cellStyle,
                              textTransform: "capitalize",
                            }}
                          >
                            {formatDate(element?.date)}
                          </td>
                          <td
                            style={{
                              ...cellStyle,
                              textTransform: "capitalize",
                            }}
                          >
                            {element?.time}
                          </td>
                          <td
                            style={{
                              ...cellStyle,
                              textTransform: "capitalize",
                            }}
                          >
                            {element?.city}
                          </td>
                          <td
                            style={{
                              ...cellStyle,
                              textTransform: "capitalize",
                            }}
                          >
                            {element?.status}
                          </td>
                          <td
                            style={{
                              ...cellStyle,
                              textTransform: "capitalize",
                            }}
                          >
                            {element?.remark}
                          </td>
                        </tr>
                      ); // Example operation: multiplying each element by 2
                    })}

                  {/* Add the remaining rows from the image */}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            No Delivery Found <br />
            Try With a Different Tracking Id
          </h1>
        )}
      </div>
    </>
  );
};

// Common styles
const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textTransform: "capitalize !important",
};

const headerCellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  backgroundColor: "#f2f2f2",
};

export default Trackingpage;
