import { Button, Card, Col, Form, Row } from "react-bootstrap";
const countryOptions = [
  { value: "Aaddhar number", label: "Aaddhar number" },
  { value: "Pan number", label: "Pan number" },
];
const ServicesOptions = [
  { value: "International", label: "International" },
  { value: "Domestic", label: "Domestic" },
];
const parcelTypeOptions = [
  { value: "DOX", label: "DOX" },
  { value: "NON-DOX", label: "NON-DOX" },
];
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
function OrderAddUpdateFields({ formData, setFormData, WaD, setWaD }) {
  return (
    <>
      <Card.Header className="p-4 bg-white">
        <h4
          className="mb-0"
          style={{
            alignSelf: "center",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          Consignee / To
        </h4>
      </Card.Header>
      <Card.Body>
        <div>
          {/* border */}

          <Form>
            <Row className="align-items-center mb-3">
              <Form.Label className="col-sm-4" htmlFor="zipcode">
                Booking Date
              </Form.Label>

              <Col md={8} xs={12}>
                <Form.Control
                  type="Date"
                  id="zipcode"
                  required
                  value={formData.bookingDate}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      bookingDate: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Shipment
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.serviceOption} // Controlled value from state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      serviceOption: e.target.value, // Update serviceOption in state
                    }));
                  }}
                >
                  <option value="">Select a service option</option>{" "}
                  {/* Placeholder option */}
                  {ServicesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Product Type
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.parcelType} // Bind the value to the state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      parcelType: e.target.value, // Update the parcelType in the state
                    }));
                  }}
                >
                  <option value="">Select a parcel type</option>{" "}
                  {/* Placeholder option */}
                  {parcelTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Service Type
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.serviceType} // This ensures the selected value is displayed
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      serviceType: e.target.value, // Update the formData with the selected value
                    }));
                  }}
                >
                  <option value="">Select a service type</option>{" "}
                  {/* Placeholder option */}
                  {serviceTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Forwarding Number
              </label>
              <div className="col-sm-8 mb-3 mb-lg-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Forwarding Number"
                  id="ForwardingNumber"
                  required
                  value={formData.forwardingNumber}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      forwardingNumber: e.target.value,
                    }));
                  }}
                />
              </div>
            </Row>

            {/* formData?.serviceOption === "Domestic" ?  */}
            {/* <> */}

            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Shipment Weight
              </label>
              <div
                className="col-sm-8 mb-3 mb-lg-0"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  type="number"
                  className="form-control col-sm-6 "
                  placeholder="KGS"
                  id="Quantity"
                  required
                  value={formData.kg}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      kg: parseFloat(e.target.value),
                      totalkg: parseFloat(e.target.value * formData.kgammount),
                      totalAmount: parseFloat(
                        e.target.value * formData.kgammount + formData.totalhkg
                      ),
                    }));
                  }}
                />
                <input
                  type="number"
                  className="form-control col-sm-6"
                  placeholder="Half KG"
                  id="Quantity"
                  required
                  value={formData.hkg}
                  onChange={(e) => {
                    const w = parseFloat(e.target.value);
                    let we;
                    if (w >= 0.1 && w <= 0.5) {
                      we = parseFloat(formData.hkgamount);
                    } else if (w <= 0.1) {
                      we = 0;
                    } else we = formData.kgammount;
                    setFormData((val) => ({
                      ...val,
                      hkg: parseFloat(e.target.value),
                      totalhkg: we,
                      totalAmount: parseFloat(we + formData.totalkg),
                    }));
                  }}
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Amount
              </label>
              <div
                className="col-sm-8 mb-3 mb-lg-0"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  type="number"
                  className="form-control col-sm-6 "
                  placeholder="Amount KGS"
                  id="fullName"
                  required
                  value={formData.kgammount}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      kgammount: parseFloat(e.target.value),
                      totalkg: parseFloat(e.target.value * formData.kg),
                      totalAmount: parseFloat(
                        e.target.value * formData.kg + formData.totalhkg
                      ),
                    }));
                  }}
                />
                <input
                  type="number"
                  className="form-control col-sm-6 "
                  placeholder="Amount Half KG"
                  id="fullName"
                  required
                  value={formData.hkgamount}
                  onChange={(e) => {
                    const w = parseFloat(formData.hkg);
                    let we;
                    if (w >= 0.1 && w <= 0.5) {
                      we = parseFloat(e.target.value);
                    } else if (w <= 0.1) {
                      we = 0;
                    } else we = formData.kgammount;
                    setFormData((val) => ({
                      ...val,
                      hkgamount: parseFloat(e.target.value),

                      totalhkg: we,
                      totalAmount: parseFloat(we + formData.totalkg),
                    }));
                  }}

                  // onChange={(e) => {
                  //   setFormData((val) => ({
                  //     ...val,
                  //     hkgamount: parseFloat(e.target.value),
                  //     totalhkg: parseFloat(e.target.value * formData.hkg),
                  //     totalAmount: parseFloat(
                  //       e.target.value * formData.hkg + formData.totalkg
                  //     ),
                  //   }));
                  // }}
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Total Amount
              </label>
              <div className="col-sm-8 mb-3 mb-lg-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total Amount"
                  id="fullName"
                  value={formData.totalAmount}
                  disabled
                />
              </div>
            </Row>
            {/* : <></> */}
            {/* </> */}

            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Company Name
              </label>
              <div className="col-sm-8 mb-3 mb-lg-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  id="fullName"
                  required
                  value={formData.companyName}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      companyName: e.target.value,
                    }));
                  }}
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="fullName"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Person Name
              </label>
              <div className="col-sm-8 mb-3 mb-lg-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Person Name"
                  id="fullName"
                  required
                  value={formData.personName}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      personName: e.target.value,
                    }));
                  }}
                />
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLine">
                Address Line 1
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter Address line 1"
                  id="addressLine"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      addressLine1: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            {/* Address Line Two */}
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                Address Line 2
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter Address line 2"
                  id="addressLineTwo"
                  required
                  value={formData.addressLine2}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      addressLine2: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                Address Line 3
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter Address line 3"
                  id="addressLineTwo"
                  required
                  value={formData.addressLine3}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      addressLine3: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLine">
                Post / Zip Code
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter POST / ZIP CODE"
                  id="addressLine"
                  required
                  value={formData.postalCode}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      postalCode: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            {/* Address Line Two */}
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                City
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  id="addressLineTwo"
                  required
                  value={formData.city}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      city: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                State
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter STATE "
                  id="addressLineTwo"
                  required
                  value={formData.state}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      state: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                Country
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter COUNTRY"
                  id="addressLineTwo"
                  required
                  value={formData.country}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      country: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            {/* row */}
            <Row className="mb-3">
              <label
                htmlFor="email"
                className="col-sm-4 col-form-label
                    form-label"
              >
                Email
              </label>
              <div className="col-md-8 col-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </Row>
            {/* row */}
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="phone">
                Phone No 1
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone"
                  id="phone"
                  required
                  value={formData.phoneNo}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      phoneNo: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-sm-4" htmlFor="phone">
                Phone No 2
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone"
                  id="phone"
                  required
                  value={formData.phoneNo2}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      phoneNo2: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                KYC type
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.kycType} // Bind the value to the state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      kycType: e.target.value, // Update the kycType in the state
                    }));
                  }}
                >
                  <option value="">Select</option> {/* Placeholder option */}
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="align-items-center mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="zipcode"
                style={{
                  textTransform: "capitalize",
                }}
              >
                KYC Number
              </Form.Label>

              <Col md={8} xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter KYC Number"
                  id="zipcode"
                  required
                  value={formData.kycNumber}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      kycNumber: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            {/* Location */}
            {/* Address Line One */}
            {/* Zip code */}
          </Form>
        </div>
      </Card.Body>
      <Card.Header className=" bg-white"></Card.Header>
      <Card.Header className="p-4 bg-white">
        <Row>
          <h4
            className="mb-0 col-md-4
                "
            style={{
              alignSelf: "center",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            WEIGHT & DIMENSIONS
          </h4>
          <div className="mb-0 col-md-8">
            <Button
              variant="primary"
              className="col-md-1"
              style={{
                fontSize: "12px",
                textWrap: "no-wrap",
              }}
              onClick={async (e) => {
                const dum = JSON.parse(JSON.stringify(WaD));
                dum.push({
                  actualWeight: 0,
                  lcm: 0,
                  bcm: 0,
                  hcm: 0,
                  volumetricWeight: 0,
                  chargebleWeight: 0,
                });
                setWaD(dum);
                setFormData({ ...formData, pcs: dum.length });
              }}
            >
              Add Box
            </Button>
          </div>
        </Row>
        <Row className="mt-1">
          {/* <div className="col-md-4"></div> */}
          <div className="col-md-2">
            <label
              htmlFor="fullName"
              className="col-form-label                    form-label"
            >
              PCS
            </label>
            <div>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Company Name"
                id="fullName"
                required
                value={formData.pcs}
                onChange={(e) => {
                  setFormData((val) => ({
                    ...val,
                    companyName: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="col-md-2">
            <label
              htmlFor="fullName"
              className="col-form-label                    form-label"
            >
              Actual Weight
            </label>
            <div>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Company Name"
                id="fullName"
                required
                value={formData.actualWeight}
              />
            </div>
          </div>
          <div className="col-md-2">
            <label
              htmlFor="fullName"
              className="col-form-label                    form-label"
            >
              Volumetric Weight
            </label>
            <div>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Company Name"
                id="fullName"
                required
                value={formData.volumetricWeight}
              />
            </div>
          </div>
          <div className="col-md-2">
            <label
              htmlFor="fullName"
              className="col-form-label                    form-label"
            >
              Chargeable Weight
            </label>
            <div>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Company Name"
                id="fullName"
                required
                value={formData.chargebleWeight}
              />
            </div>
          </div>
        </Row>
        <div>
          {/* border */}

          <Form>
            {/* row */}
            {WaD.map((data, index) => {
              return (
                <Row className="mb-3">
                  <div className="col-md-1">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      Box No
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={index + 1}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      Actual Wt.(Kg.)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.actualWeight}
                        onChange={(e) => {
                          const dum = JSON.parse(JSON.stringify(WaD));
                          dum[index].actualWeight = e.target.value;
                          if (
                            dum[index].actualWeight >
                            dum[index].volumetricWeight
                          )
                            dum[index].chargebleWeight =
                              dum[index].actualWeight;
                          else
                            dum[index].chargebleWeight =
                              dum[index].volumetricWeight;
                          setWaD(dum);

                          const mainvw = dum.reduce((total, data) => {
                            return total + parseFloat(data.actualWeight);
                          }, 0);
                          if (mainvw > formData.volumetricWeight)
                            setFormData({
                              ...formData,
                              chargebleWeight: mainvw,
                              actualWeight: mainvw,
                            });
                          else
                            setFormData({
                              ...formData,
                              chargebleWeight: formData.volumetricWeight,
                              actualWeight: mainvw,
                            });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      L(cm)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.lcm}
                        onChange={(e) => {
                          const dum = JSON.parse(JSON.stringify(WaD));
                          dum[index].lcm = e.target.value;
                          const volumetricWeight =
                            (dum[index].lcm * dum[index].hcm * dum[index].bcm) /
                            5000;
                          dum[index].volumetricWeight = volumetricWeight;

                          if (
                            dum[index].actualWeight >
                            dum[index].volumetricWeight
                          )
                            dum[index].chargebleWeight =
                              dum[index].actualWeight;
                          else
                            dum[index].chargebleWeight =
                              dum[index].volumetricWeight;
                          setWaD(dum);

                          const mainvw = dum.reduce((total, data) => {
                            return total + parseFloat(data.volumetricWeight);
                          }, 0);
                          if (mainvw > formData.actualWeight)
                            setFormData({
                              ...formData,
                              volumetricWeight: mainvw,
                              actualWeight: mainvw,
                            });
                          else
                            setFormData({
                              ...formData,
                              chargebleWeight: formData.actualWeight,
                              volumetricWeight: mainvw,
                            });
                        }}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-1">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      B(cm)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.bcm}
                        onChange={(e) => {
                          const dum = JSON.parse(JSON.stringify(WaD));
                          dum[index].bcm = e.target.value;
                          const volumetricWeight =
                            (dum[index].lcm * dum[index].hcm * dum[index].bcm) /
                            5000;
                          dum[index].volumetricWeight = volumetricWeight;

                          if (
                            dum[index].actualWeight >
                            dum[index].volumetricWeight
                          )
                            dum[index].chargebleWeight =
                              dum[index].actualWeight;
                          else
                            dum[index].chargebleWeight =
                              dum[index].volumetricWeight;
                          setWaD(dum);
                          const mainvw = dum.reduce((total, data) => {
                            return total + parseFloat(data.volumetricWeight);
                          }, 0);
                          if (mainvw > formData.actualWeight)
                            setFormData({
                              ...formData,
                              volumetricWeight: mainvw,
                              actualWeight: mainvw,
                            });
                          else
                            setFormData({
                              ...formData,
                              chargebleWeight: formData.actualWeight,
                              volumetricWeight: mainvw,
                            });
                        }}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-1">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      H(cm)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.hcm}
                        onChange={(e) => {
                          const dum = JSON.parse(JSON.stringify(WaD));
                          dum[index].hcm = e.target.value;
                          const volumetricWeight =
                            (dum[index].lcm * dum[index].hcm * dum[index].bcm) /
                            5000;
                          dum[index].volumetricWeight = volumetricWeight;

                          if (
                            dum[index].actualWeight >
                            dum[index].volumetricWeight
                          )
                            dum[index].chargebleWeight =
                              dum[index].actualWeight;
                          else
                            dum[index].chargebleWeight =
                              dum[index].volumetricWeight;
                          setWaD(dum);
                          const mainvw = dum.reduce((total, data) => {
                            return total + parseFloat(data.volumetricWeight);
                          }, 0);
                          if (mainvw > formData.actualWeight)
                            setFormData({
                              ...formData,
                              volumetricWeight: mainvw,
                              chargebleWeight: mainvw,
                            });
                          else
                            setFormData({
                              ...formData,
                              chargebleWeight: formData.actualWeight,
                              volumetricWeight: mainvw,
                            });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      Volumetric Wt.(Kg.)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.volumetricWeight}
                        disabled
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-2">
                    <label
                      htmlFor="fullName"
                      className="col-form-label form-label"
                    >
                      Chargeable Wt.(Kg.)
                    </label>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Company Name"
                        id="fullName"
                        required
                        value={data.chargebleWeight}
                        disabled
                      />
                    </div>
                  </div>
                  {WaD.length > 1 ? (
                    <div
                      className="col-md-2 "
                      style={{
                        alignSelf: "end",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <Button
                        variant="danger"
                        onClick={() => {
                          const dummy = JSON.parse(JSON.stringify(WaD));
                          dummy.splice(index, 1);
                          setWaD(dummy);
                          const volumetricWeight = dummy.reduce(
                            (total, data) => {
                              return total + parseFloat(data.volumetricWeight);
                            },
                            0
                          );
                          const actualWeight = dummy.reduce((total, data) => {
                            return total + parseFloat(data.actualWeight);
                          }, 0);
                          if (actualWeight > volumetricWeight)
                            setFormData({
                              ...formData,
                              pcs: dummy.length,
                              volumetricWeight,
                              actualWeight,
                              chargebleWeight: actualWeight,
                            });
                          else
                            setFormData({
                              ...formData,
                              pcs: dummy.length,
                              volumetricWeight,
                              actualWeight,
                              chargebleWeight: volumetricWeight,
                            });
                        }}
                      >
                        <FontAwesomeIcon height={20} icon={faTrashCan} />
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Row>
              );
            })}

            {/* Address Line One */}

            {/* Zip code */}
          </Form>
        </div>
      </Card.Header>
    </>
  );
}

export default OrderAddUpdateFields;
