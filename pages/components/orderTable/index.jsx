"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Col,
  ListGroup,
  Modal,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import {
  deleteDocument,
  getAllDocuments,
  updateDocument,
} from "utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCopy,
  faEdit,
  faShare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "utils/helper";
import { useRouter } from "next/navigation";
function OrderTable({ ud, setReload = () => {} }) {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState();
  const [cleintData, setClientData] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const handleClose = () => setShow(false);

  useEffect(() => {
    (async () => {
      const data = await getAllDocuments("client");
      setClientData(data);
    })();
  }, []);
  const toggleSelection = (item) => {
    setSelectedItems(item);
  };
  const router = useRouter();
  return (
    <Row className="mt-1">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Items</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "70vh", overflow: "auto" }}>
          <ListGroup>
            {cleintData
              ?.sort((a, b) => {
                if (a.personName < b.personName) {
                  return -1;
                }
                if (a.personName > b.personName) {
                  return 1;
                }
                return 0;
              })
              .map((item, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedItems?._id === item._id ? "blue" : "",
                    color: selectedItems?._id === item._id ? "white" : "",
                    border: "1px solid grey",
                  }}
                  onClick={() => toggleSelection(item)}
                >
                  {item.personName} | {item.companyName}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const i = JSON.parse(JSON.stringify(selectedItems));
              delete i._id;
              const res = await updateDocument("order", orderId, {
                clientDetails: i,
                clientId: selectedItems._id,
              });
              setReload((prev) => !prev);
              setShow(false);
              alert(`order moved to ${selectedItems.personName}`);
            }}
          >
            Move
          </Button>
        </Modal.Footer>
      </Modal>
      <Col md={12} xs={12}>
        <Table responsive className="text-nowrap mb-0 printarea1">
          <thead className="table-light">
            <tr>
              <th>SR.NO</th>
              <th>BOOKING DATE</th>
              <th>AWB NO.</th>
              <th>FORWARDING NO.</th>
              <th>SERVICE</th>
              <th>UPDATE</th>
              <th className="special-tr1">DESTINATION</th>
              <th>SHIPPER NAME</th>
              <th>SHIPPER FIRM NAME</th>
              <th>SHIPPER CONTACT</th>
              <th>CONSIGNEE NAME</th>
              <th>CONSIGNEE CONTACT 1</th>
              <th>CONSIGNEE CONTACT 2</th>
              <th>ACTIONS</th>
              {/* <th> CREATED DATE </th> */}
            </tr>
          </thead>
          <tbody>
            {ud?.toReversed().map((item, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    <span className={`align-middle`}>
                      {formatDate(item.bookingDate)}
                    </span>
                  </td>
                  <td
                    className="align-middle"
                    style={{
                      color: "blue",
                    }}
                  >
                    <a target="_blank" href={`/detailtracking/${item.orderId}`}>
                      {item?.orderId}
                    </a>
                  </td>
                  <td className="align-middle">
                    <div className="avatar-group">{item.forwardingNumber}</div>
                  </td>
                  <td className="align-middle">
                    <div className="avatar-group">{item.serviceType}</div>
                  </td>
                  <td className="align-middle">
                    <div
                      style={{
                        display: "flex",
                        gap: "0px",
                      }}
                    >
                      <div className="tooltipp">
                        <a href={`/status/${item._id}`} target="_blank">
                          <FontAwesomeIcon
                            icon={faAddressCard}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </a>
                        <span className="tooltipptext">Update entry</span>
                      </div>
                      <div className="tooltipp">
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={async (e) => {
                            const obj = {
                              "Consignee Name": item.personName,
                              Source: "Surat",
                              Destination: item.city,
                              "AWB NO": item.orderId,
                              "Booking Date": formatDate(item.bookingDate),
                              "Tracking Link": `https://galaxy-cargo-web.vercel.app/detailtracking/${item.orderId}`,
                            };
                            navigator.clipboard
                              .writeText(
                                `Dear Customer, 
Your Shipment is Booked By 
*Hilal Cargo & Courier*
*Galaxy Cargo & Courier*
(M)7043499952 / 7043499953

*Shipment Details*${JSON.stringify(obj, null, 1).replace(/[{}"]/g, "")}`
                              )
                              .then(() => {
                                console.log("Text copied to clipboard");
                              })
                              .catch((err) => {
                                console.error("Failed to copy text: ", err);
                              });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                        <span className="tooltipptext">copy details</span>
                      </div>
                      <div className="tooltipp">
                        <a href={`/order/update/${item._id}`} target="_blank">
                          <FontAwesomeIcon
                            icon={faEdit}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </a>
                        <span className="tooltipptext">edit entry</span>
                      </div>
                      <div className="tooltipp">
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={() => {
                            setShow(true);
                            setSelectedItems({
                              ...item.clientData,
                              _id: item.clientId,
                            });
                            setOrderId(item._id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faShare}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                        <span className="tooltipptext">move entry</span>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="avatar-group">{item.city}</div>
                  </td>
                  <td className="align-middle">{item.clientData.personName}</td>{" "}
                  <td className="align-middle">
                    {item.clientData.companyName}
                  </td>
                  <td className="align-middle">
                    <a
                      href={`whatsapp://send?text=Hello World!&phone=${item.clientData.phoneNo}`}
                      target="_blank"
                    >
                      {item.clientData.phoneNo}
                      <span className="ml-2  icon-whatsapp"></span>
                    </a>
                  </td>
                  <td className="align-middle">{item.personName}</td>
                  <td className="align-middle">
                    {item.phoneNo2 ? (
                      <a
                        href={`whatsapp://send?text=Hello World!&phone=${item.phoneNo}`}
                        target="_blank"
                      >
                        {item.phoneNo}
                        <span className="ml-2  icon-whatsapp"></span>
                      </a>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="align-middle">
                    {item.phoneNo2 ? (
                      <a
                        href={`whatsapp://send?text=Hello World!&phone=${item.phoneNo}`}
                        target="_blank"
                      >
                        {item.phoneNo2}
                        <span className="ml-2  icon-whatsapp"></span>
                      </a>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="align-middle">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          boxShadow: "none",
                        }}
                        onClick={async (e) => {
                          e.preventDefault();
                          await deleteDocument("order", item._id);
                          setReload((prev) => !prev);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          height={"20px"}
                          width={"20px"}
                          color="#637381"
                        />
                      </button>
                    </div>
                  </td>
                  {/* <td className="align-middle">{item.createdAt}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default OrderTable;
