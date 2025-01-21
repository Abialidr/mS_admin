import { Button, Col, Container, Form } from "react-bootstrap";
import { db, updateDocument } from "utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PageHeading } from "widgets";
import OrderTable from "pages/components/orderTable";
const serviceTypeOptions = [
  { value: "SELF", label: "SELF" },
  { value: "SELF_DOM", label: "SELF_DOM" },
  { value: "SELF_INTL", label: "SELF_INTL" },
  { value: "SELF_DUTY_PAID", label: "SELF_DUTY_PAID" },
  { value: "DHL", label: "DHL" },
  { value: "FEDEX", label: "FEDEX" },
  { value: "UPS", label: "UPS" },
  { value: "DPD", label: "DPD" },
  { value: "ARAMEX", label: "ARAMEX" },
  { value: "DELHIVERY", label: "DELHIVERY" },
];
const shipmentStatuses = [
  { value: "Shipment Booked", label: "Shipment Booked" },
  { value: "In Transit To Destination", label: "In Transit To Destination" },
  { value: "Arrived At Destination", label: "Arrived At Destination" },
  { value: "Out For Delivery", label: "Out For Delivery" },
  { value: "Delivery Pending", label: "Delivery Pending" },
  { value: "Return To Origin", label: "Return To Origin" },
  // { value: "Delivered", label: "Delivered" },
];
const Settings = () => {
  const [d, setD] = useState();
  const [service, setService] = useState("");
  const [isDelivered, setisDelivered] = useState("Shipment Booked");
  const [relaod, setReload] = useState(false);
  const [ud, setuD] = useState();
  const [datee, setDate] = useState();
  useEffect(() => {
    (async () => {
      let q = query(
        collection(db, "order"),
        where("isDelivered", "==", isDelivered)
      );
      if (datee) {
        q = query(q, where("orderDetails.bookingDate", "==", datee));
      }
      if (service) {
        q = query(q, where("orderDetails.serviceType", "==", service));
      }
      const docSnap = await getDocs(q);
      let d = [];
      docSnap.forEach((element) => {
        const data = element.data();
        d.push({
          ...data.orderDetails,
          clientData: data.clientDetails,
          clientId: data.clientId,
          orderId: data.orderId,
          createdAt: data.createdAt,
          _id: element.id,
        });
      });
      d = d.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      console.log("🚀 ~ file: index.jsx:61 ~ d:", d);
      // d = d.sort((a, b) => b.forwardingNumber - a.forwardingNumber);
      setuD(d);
      setD(d);
    })();
  }, [datee, service, relaod, isDelivered]);
  return (
    <Container fluid className="p-2">
      {/* Page Heading */}
      <Col lg={12} md={12} xs={12}>
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <PageHeading heading="Orders" ismb={false} />
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "fit-content",
              }}
            >
              <Button
                variant="primary"
                className="col-md-2"
                onClick={async (e) => {
                  try {
                    let q = query(collection(db, "order"));
                    const currentDate = new Date();
                    const fiveDaysAgo = new Date();
                    fiveDaysAgo.setDate(currentDate.getDate() - 16);
                    const fiveDaysAgoTimestamp = fiveDaysAgo
                      .toISOString()
                      .split("T")[0];
                    q = query(
                      q,
                      where("isDelivered", "==", "Delivered"),
                      where("deliveryDate", "<=", fiveDaysAgoTimestamp)
                    );

                    const docSnap = await getDocs(q);
                    let d = [];
                    docSnap.forEach((element) => {
                      const data = element.id;
                      d.push(data);
                    });
                    d.map(async (_id) => {
                      await updateDocument("order", _id, {
                        isDelete: true,
                      });
                    });
                  } catch (error) {}
                }}
              >
                Soft Delete
              </Button>
              <Form.Select
                className=""
                id="country"
                value={isDelivered}
                onChange={(e) => {
                  setisDelivered(e.target.value);
                }}
              >
                <option value="">Select</option> {}
                {shipmentStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Button>{d?.length}</Button>

              <Form.Select
                id="country"
                value={service} // This ensures the selected value is displayed
                onChange={(e) => {
                  setService((val) => e.target.value);
                }}
              >
                {/* Placeholder option */}
                {serviceTypeOptions.map((option) => (
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
                  const newD = d.filter((item) => {
                    return (
                      item.clientData.companyName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      item.clientData.personName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
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
                  setuD(newD);
                }}
              />
            </div>
          </div>
        </div>
      </Col>

      {/* General Settings */}
      <OrderTable ud={ud} setReload={setReload} />
    </Container>
  );
};

export default Settings;
