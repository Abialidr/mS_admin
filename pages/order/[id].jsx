// import node module libraries
import Link from "next/link";
import { Col, Container, Form } from "react-bootstrap";
import { db } from "utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PageHeading } from "widgets";
import OrderTable from "pages/components/orderTable";
const shipmentStatuses = [
  { value: "Shipment Booked", label: "Shipment Booked" },
  { value: "In Transit To Destination", label: "In Transit To Destination" },
  { value: "Arrived At Destination", label: "Arrived At Destination" },
  { value: "Out For Delivery", label: "Out For Delivery" },
  { value: "Delivery Pending", label: "Delivery Pending" },
  { value: "Return To Origin", label: "Return To Origin" },
  { value: "Delivered", label: "Delivered" },
];
const Settings = () => {
  const [isDelivered, setD] = useState("Shipment Booked");
  const [ud, setuD] = useState();
  const [r, setR] = useState(false);
  const [relaod, setReload] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const [datee, setDate] = useState();

  useEffect(() => {
    if (id) {
      (async () => {
        let q = query(
          collection(db, "order"),
          where("isDelivered", "==", isDelivered),
          where("clientId", "==", id)
        );
        if (datee) {
          q = query(q, where("orderDetails.bookingDate", "==", datee));
        }
        const docSnap = await getDocs(q);
        let d = [];
        docSnap.forEach((element) => {
          const data = element.data();
          d.push({
            ...data.orderDetails,
            ...data,
            clientData: data.clientDetails,
            clientId: data.clientId,
            orderId: data.orderId,
            createdAt: data.createdAt,
            _id: element.id,
          });
        });
        d = d.sort((a, b) => b.forwardingNumber - a.forwardingNumber);
        d = d.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        setuD(d);
        setR(d);
      })();
    }
  }, [isDelivered, id, datee, relaod]);
  return (
    <Container fluid className="p-2">
      {/* Page Heading */}
      <Col lg={12} md={12} xs={12}>
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <PageHeading
              heading={`${
                isDelivered === "true" ? "Delivered" : "Un-DElivered"
              } Order`}
              ismb={false}
            />
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "stretch",
                height: "55px",
              }}
            >
              <Form.Select
                id="country"
                value={isDelivered} // Controlled value from state
                onChange={(e) => {
                  setD(e.target.value);
                }}
              >
                {shipmentStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                type="Date"
                id="zipcode"
                required
                value={datee}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                id="fullName"
                required
                onChange={(e) => {
                  const newD = r.filter((item) => {
                    return (
                      item.personName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      item.forwardingNumber
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      item.orderId
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                  });
                  console.log("🚀 ~ file: [id].jsx:110 ~ newD ~ newD:", newD);
                  setuD(newD);
                }}
              />
              <Link
                style={{
                  textWrap: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
                href={`/order/add/${id}`}
                className="btn btn-primary"
              >
                Create New Order
              </Link>
            </div>
          </div>
        </div>
      </Col>

      {/* General Settings */}
      <OrderTable ud={ud} setReload={setReload} />

      {/* General Settings */}
    </Container>
  );
};

export default Settings;
