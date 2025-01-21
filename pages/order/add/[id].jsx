// import node module libraries
import { Col, Row, Card, Button, Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import { addDocument, db, getDocumentById } from "utils/firebase";
import { useRouter } from "next/router";
import OrderAddUpdateFields from "pages/components/orderAddUpdateFields";
import { collection, getDocs, query, where } from "firebase/firestore";

const Settings = () => {
  const router = useRouter();
  const [clientDetails, setClientDetails] = useState();
  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const doc = await getDocumentById("client", router.query.id);
        setClientDetails(doc);
      }
    })();
  }, [router.query.id]);
  const [formData, setFormData] = useState({
    serviceType: "",
    forwardingNumber: "",
    serviceOption: "",
    parcelType: "",
    companyName: "",
    personName: "",
    companyWebsite: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNo: "",
    phoneNo2: "",
    bookingDate: "",
    pcs: 1,
    actualWeight: 0,
    volumetricWeight: 0,
    chargebleWeight: 0,
    kg: 0,
    kgammount: 0,
    totalkg: 0,
    hkg: 0,
    hkgamount: 0,
    totalhkg: 0,
    totalAmount: 0,
  });

  const [WaD, setWaD] = useState([
    {
      actualWeight: 0,
      lcm: 0,
      bcm: 0,
      hcm: 0,
      volumetricWeight: 0,
      chargebleWeight: 0,
    },
  ]);
  const id = router.query.id;
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      {/* <PageHeading heading="SHIPPER / From information" /> */}

      {/* General Settings */}
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <OrderAddUpdateFields
              formData={formData}
              setFormData={setFormData}
              WaD={WaD}
              setWaD={setWaD}
            />
            <Card.Body>
              <Row className="align-items-center">
                <Col md={{ offset: 0, span: 8 }} xs={12} className="mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (
                        formData.forwardingNumber &&
                        formData.forwardingNumber !== "0"
                      ) {
                        let q = query(
                          collection(db, "order"),
                          where(
                            "orderDetails.forwardingNumber",
                            "==",
                            formData.forwardingNumber
                          )
                        );
                        const docSnap = await getDocs(q);
                        let d = [];
                        docSnap.forEach((element) => {
                          d.push(element.id);
                        });
                        console.log(
                          "🚀 ~ file: [id].jsx:101 ~ onClick={ ~ d:",
                          d
                        );
                        if (d.length) {
                          return alert("forwarding number already exist");
                        }
                      }

                      const timestamp = new Date().getTime().toString();
                      const base36String = timestamp.toString(36);
                      const orderId = base36String.padEnd(10, "0").slice(0, 10);

                      const res = await addDocument("order", {
                        clientDetails,
                        orderDetails: formData,
                        packageDetails: WaD,
                        status: [
                          {
                            date: new Date().toISOString().split("T")[0],
                            time: new Date()
                              .toTimeString()
                              .split(" ")[0]
                              .slice(0, 5),
                            status: "Shipment Booked",
                            city: "Surat",
                            remark: "Surat RO",
                          },
                        ],
                        isDelete: false,
                        createdAt: new Date().toDateString(),
                        clientId: id,
                        orderId,
                        isDelivered: "Shipment Booked",
                        reciverSign: "",
                        deliveryDate: "",
                      });
                      if (res.id) {
                        router.push(`/order/${id}`);
                      } else {
                        alert("something went wrong");
                      }
                    }}
                  >
                    Add Order
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Email Settings */}
      {/* <EmailSetting /> */}

      {/* Settings for Preferences */}
      {/* <Preferences /> */}

      {/* Settings for Notifications */}
      {/* <Notifications /> */}

      {/* Delete Your Account */}
      {/* <DeleteAccount /> */}
    </Container>
  );
};

export default Settings;
