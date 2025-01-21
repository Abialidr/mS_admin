"use client";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("../components/map"), {
  ssr: false,
});
import style from "./Trackingpage.module.css";
function ModalInData({ type }) {
  if (type === "road") {
    return (
      <Card>
        <Card>
          <Card.Header className="p-4 bg-white">Delivery By Road</Card.Header>
          <Card.Body>
            <img
              src="/images/cargo_sea_small.jpg"
              alt="Image"
              className="img-fluid mb-5"
            />
            <h2
              style={{
                textAlign: "justify",
              }}
            >
              Delivery by road all over India offers a business-class experience
              for your shipments. This cost-effective courier service provides
              reliable transit time with real time tracking and proof of
              delivery.
            </h2>
            <ul className="ul-check primary list-unstyled mt-5">
              <li>Real time tracking</li>
              <li>Proof of delivery</li>
              <li>Oversized shipments</li>
              <li>Non-time sensitive</li>
              <li>Fewer restrictions</li>
              <li>Insured</li>
            </ul>
            <h2>Popular categories of goods sent via these services:</h2>
            <ul className="ul-check primary list-unstyled mt-5">
              <li>All types of garments</li>
              <li>Fashion & accessories</li>
              <li>Audio & electrical equipment</li>
              <li>Cosmetics</li>
            </ul>
            <h2>Popular choice for e-retailers</h2>
            <p>
              Economical, it is a popular choice for many e-retailers who send
              less time-sensitive shipments.
            </p>
          </Card.Body>
        </Card>
      </Card>
    );
  }
  if (type === "air") {
    return (
      <Card>
        <Card>
          <Card.Header className="p-4 bg-white">Delivery By Air</Card.Header>
          <Card.Body>
            <img
              src="/images/cargo_air_small.jpg"
              alt="Image"
              className="img-fluid mb-5"
            />
            <h2>
              "International Air Services" offers a first-class experience for
              your shipments with real time tracking and proof of delivery. we
              proactively notify our customer about their shipment's status.
            </h2>
            <br />
            <h2>
              International Air Express is our most popular shipping solution.
            </h2>
            <ul className="ul-check primary list-unstyled mt-5">
              <li>Real time tracking</li>
              <li>Time sensitive</li>
              <li>Goods up to 30kg per piece</li>
              <li>DDP & DDU service</li>
            </ul>
            <h2>Popular categories of goods sent via these services:</h2>
            <ul className="ul-check primary list-unstyled mt-5">
              <li>All types of garments</li>
              <li>Fashion & accessories</li>
              <li>Audio & electrical equipment</li>
              <li>Documents</li>
            </ul>
          </Card.Body>
        </Card>
      </Card>
    );
  }
  if (type === "ecom") {
    return (
      <Card>
        <Card>
          <Card.Header className="p-4 bg-white">
            E - Commerce Delivery
          </Card.Header>
          <Card.Body>
            <img
              src="/images/cargo_delivery_small.jpg"
              alt="Image"
              className="img-fluid mb-5"
            />
            <h3>
              Cross-border e-commerce presents great opportunities for
              retailers. Galaxy Cargo & Courier offers expert support to
              optimize global deliveries, considering customs and international
              duties. Our tailored solutions cater to e-commerce needs, With
              real-time tracking and proactive notifications.
            </h3>
            <br />
            <h4>Cross-Border E-Commerce: A Global Opportunity</h4>
            <p>
              Cross-border e-commerce is becoming an increasingly profitable
              outlet for retailers. Why sell in one market when the world is
              your oyster? We can offer your business the advice, support, and
              expertise to optimise your worldwide deliveries, taking into
              account customs controls and international duties and tax.
            </p>
            <h4>Tailored Solutions for E-Commerce and Online Retail</h4>
            <p>
              We have developed a range of options to accommodate the unique
              requirements of e-commerce and the online retail sector.
            </p>
            <h4>Real-Time Information for Your Customers</h4>
            <p>
              Your customers need instant information, so knowing where their
              shipment is at all times is of utmost importance. By continuously
              improving our services to meet the demands of the modern era,
              Galaxy Cargo and Courier's proactive customer notification system
              provides your customers with the experience they demand.
            </p>
          </Card.Body>
        </Card>
      </Card>
    );
  }
}
function Home() {
  const [isClient, setIsClient] = useState(false);
  const [show1, setShow1] = useState(false);
  const [type, setType] = useState("");
  const [tn, setTn] = useState("");
  const handleClose = () => setShow1(false);
  const router = useRouter();
  const [imageHeight, setImageHeight] = useState(70);
  useEffect(() => {
    const handleScroll = () => {
      const w = window.innerWidth;
      const scrollY = window.scrollY;
      if (w >= 1000) {
        if (scrollY >= 100) {
          setImageHeight(50);
        } else {
          setImageHeight(70);
        }
      } else {
        if (scrollY >= 100) {
          setImageHeight(60);
        } else {
          setImageHeight(60);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    setIsClient(true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (!isClient) {
    return <></>;
  } else {
    return (
      <>
        <Modal show={show1} onHide={handleClose} size="lg" centered>
          <Modal.Body style={{ background: "transparent" }}>
            <ModalInData type={type} />
          </Modal.Body>
        </Modal>
        <Script src="/js/jquery-3.3.1.min.js"></Script>
        <Script src="/js/popper.min.js"></Script>
        <Script src="/js/bootstrap.min.js"></Script>
        <Script src="/js/owl.carousel.min.js"></Script>
        <Script src="/js/jquery.sticky.js"></Script>
        <Script src="/js/jquery.waypoints.min.js"></Script>
        <Script src="/js/jquery.animateNumber.min.js"></Script>
        <Script src="/js/jquery.fancybox.min.js"></Script>
        <Script src="/js/jquery.easing.1.3.js"></Script>
        <Script src="/js/aos.js"></Script>
        <Script src="/js/main.js"></Script>
        <div
          data-spy="scroll"
          data-target=".site-navbar-target"
          data-offset="300"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <div className="site-wrap" id="home-section">
            <div className="site-mobile-menu site-navbar-target">
              <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                  <span className="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div className="site-mobile-menu-body"></div>
            </div>
            <div className="top-bar">
              <div className={style.mainContainer1}>
                <div className={style.logoContainer1}>
                  <a href="mailto:galaxycargo53@gmail.com" className="">
                    <span className="mr-2  icon-envelope-open-o"></span>{" "}
                    <span className="d-none d-md-inline-block">
                      galaxycargo53@gmail.com
                    </span>
                  </a>
                  <span className="mx-md-2 d-inline-block"></span>
                  <a href="tel:+917043499952" className="">
                    <span className="icon-phone"></span>{" "}
                    <span className="d-none d-md-inline-block">
                      +91 70434 99952
                    </span>
                  </a>
                </div>
                <div className={style.numContainer1}>
                  <a href="tel:+917043499953" className="ml-3">
                    <span className="  icon-whatsapp"></span>{" "}
                    <span className="d-none d-md-inline-block">
                      +91 70434 99953
                    </span>
                  </a>
                  <span className="mx-md-2 d-inline-block"></span>
                  <a
                    href="https://www.instagram.com/galaxycc16/profilecard/?igsh=MWs3YmhtenJsa29lOA=="
                    target="_blank"
                    className=""
                  >
                    <span className="icon-instagram"></span>{" "}
                    <span className="d-none d-md-inline-block">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
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
              </div>
            </header>
            <div className="ftco-blocks-cover-1">
              <div
                className="ftco-cover-1 overlay"
                style={{
                  backgroundImage:
                    "url('https://source.unsplash.com/pSyfecRCBQA/1920x780')",
                }}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div
                      className="col-lg-6"
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          color: "#0c3353",
                        }}
                      >
                        Reliable and Cost-Effective Express Delivery
                      </h1>
                      <p
                        className="mb-5"
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Your one-stop solution for express delivery, providing
                        reliable door-to-door services for documents, parcels
                        and heavy shipments while ensuring the highest standards
                        of service at all times.
                      </p>
                      <div className="form-group d-flex">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Enter your tracking number"
                          value={tn}
                          onChange={(e) => {
                            setTn(e.target.value);
                          }}
                        />
                        <input
                          style={{
                            backgroundColor: "#0c3353",
                          }}
                          type="submit"
                          className="btn btn-primary text-white px-4"
                          value="Track Now"
                          onClick={() => {
                            router.push(`/detailtracking/${tn}`);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ftco-service-image-1 pb-5" id="services-section">
                <div className="container">
                  <div className="owl-carousel owl-all">
                    <div
                      className="service text-center"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setType("road");
                        setShow1(true);
                      }}
                    >
                      <div>
                        <img
                          src="/images/cargo_sea_small.jpg"
                          alt="Image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="px-md-3">
                        <h3>
                          <span>Delivery By Road</span>
                        </h3>
                        <p>
                          Delivery by road all over India offers a
                          business-class experience for your shipments. This
                          cost-effective courier service provides reliable
                          transit time with real time tracking and proof of
                          delivery.
                        </p>
                      </div>
                    </div>
                    <div
                      className="service text-center"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setType("air");
                        setShow1(true);
                      }}
                    >
                      <div>
                        <img
                          src="/images/cargo_air_small.jpg"
                          alt="Image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="px-md-3">
                        <h3>
                          <span>Delivery By AIR</span>
                        </h3>
                        <p>
                          "International Air Services" offers a first-class
                          experience for your shipments with real time tracking
                          and proof of delivery. we proactively notify our
                          customer about their shipment's status.
                        </p>
                      </div>
                    </div>
                    <div
                      className="service text-center"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setType("ecom");
                        setShow1(true);
                      }}
                    >
                      <div>
                        <img
                          src="/images/cargo_delivery_small.jpg"
                          alt="Image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="px-md-3">
                        <h3>
                          <span>E - Commerce Delivery</span>
                        </h3>
                        <p>
                          Cross-border e-commerce presents great opportunities
                          for retailers. Galaxy Cargo & Courier offers expert
                          support to optimize global deliveries, considering
                          customs and international duties. Our tailored
                          solutions cater to e-commerce needs, With real-time
                          tracking and proactive notifications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="block__73694 site-section border-top"
              id="about-section"
            >
              <div className="container">
                <div className="row d-flex no-gutters align-items-stretch">
                  <div
                    className="col-lg-12 mr-auto p-lg-5 mt-4 mt-lg-0 order-lg-1"
                    data-aos="fade-right"
                    data-aos-delay=""
                  >
                    <h2 className="mb-4 text-black pl-2">ABOUT US</h2>
                    <ul className="ul-check primary list-unstyled mt-5">
                      <li className="text-justify pr-2 ">
                        At Galaxy Cargo & Courier, 'client satisfaction' is our
                        first duty and sole motto. Our clients' needs, no matter
                        how demanding and challenging, have always been at the
                        pinnacle of our agenda. Even today, after years of
                        service, we are striving relentlessly to expand our
                        functions and operations to help and serve our clients
                        to the height of their expectations.
                      </li>
                      <li className="text-justify pr-2 ">
                        We specialise in national and international couriers.
                        Our formal affiliations with multinational courier
                        companies have allowed us an extensive worldwide
                        network. All this helps us in the speedy delivery of
                        your packages. So when you think about good service,
                        think Galaxy Cargo & Courier.
                      </li>
                      <li className="text-justify pr-2 ">
                        We employ the most stringent safety measures. With us,
                        there is no chance of loss or damage to your package.
                        Besides, we are one of the courier companies that
                        provide international door-to-door cargo. So when you
                        think about reliability, think Galaxy Cargo & Courier.
                      </li>
                      <li className="text-justify pr-2 ">
                        Our website is equipped with the latest tracking
                        facilities, which will keep you updated on the status of
                        your package. Besides, our staff is always eager to
                        assist you in any way possible. So once your package is
                        in our hands, you can rest assured that it will be
                        delivered at express speed to the desired destination
                        with utmost care. So when you think about trust or
                        faith, think Galaxy Cargo & Courier.
                      </li>
                      <li className="text-justify pr-2 ">
                        Our deep understanding of our clients' needs, our
                        sensitivity and responsiveness to changing business
                        requirements, our state-of-the-art services, and not to
                        mention, our affordable prices, have made us a name to
                        contend with within the courier industry.
                      </li>
                      <li className="text-justify pr-2 ">
                        So, give us a chance; we will endeavour to serve you to
                        the best of our ability, leaving no stone unturned. So
                        when you think about Galaxy Cargo & Courier, think no
                        further.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="block__73694 site-section border-top"
              id="buisness-section"
            >
              <div className="container">
                <div className="row d-flex no-gutters align-items-stretch">
                  <div
                    className="col-lg-12 mr-auto p-lg-5 mt-4 mt-lg-0 order-lg-1"
                    data-aos="fade-right"
                    data-aos-delay=""
                  >
                    <h2 className="mb-4 text-black pl-2">
                      Business Opportunity
                    </h2>
                    <ul className="ul-check primary list-unstyled mt-5">
                      <li className="text-justify pr-2 ">
                        If you have an office or shop in a prime location, we
                        can help you set up a Hub Franchise with a nominal
                        investment.
                      </li>
                      <li className="text-justify pr-2 ">
                        If you're in a service industry like freight forwarding,
                        travel services, or the hotel industry, you can offer
                        our services to your existing client base.
                      </li>
                      <li className="text-justify pr-2 ">
                        If you're already in the trade, you understand the value
                        of working with an honest, transparent wholesaler who
                        ensures client confidentiality.
                      </li>
                      <li className="text-justify pr-2 ">
                        If you're not yet doing business with us, now is the
                        perfect time to start.
                      </li>
                      <li className="text-justify pr-2 ">
                        With our support, you can achieve even greater success!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="site-footer">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <h2
                        className="footer-heading mb-2 text-underline"
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        Find Us
                      </h2>
                      <div className="mb-6">
                        <MapComponent />
                      </div>
                    </div>
                    <div className="col-md-6 ml-auto">
                      <h2
                        className="footer-heading mb-2 "
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        Contact us
                      </h2>
                      <ul className="list-unstyled">
                        <li>
                          <p className="text-justify pr-2 ">
                            Shop No.1, Safiya Manzil, Nr. Bank of Baroda, Opp.
                            Al Jamea Tus Saifiyah Bldg, Aamkhaas Mohalla, Near
                            Qutbibaug, Surat. 395003
                          </p>
                        </li>
                        <li>
                          <a href="tel:+917043499952" className="">
                            <span className="icon-phone"></span>{" "}
                            <span className=" d-md-inline-block">
                              +91 70434 99952
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="tel:+917043499953" className="">
                            <span className="  icon-whatsapp"></span>{" "}
                            <span className=" d-md-inline-block">
                              +91 70434 99953
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="mailto:galaxycargo53@gmail.com" className="">
                            <span className=" icon-envelope-open-o"></span>{" "}
                            <span className=" d-md-inline-block">
                              galaxycargo53@gmail.com
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-5 mt-5 text-center">
                <div className="col-md-12">
                  <div className="border-top pt-5">
                    <p className="copyright"></p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
export default Home;
