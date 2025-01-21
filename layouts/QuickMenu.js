import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Dropdown, ListGroup } from "react-bootstrap";

import "simplebar/dist/simplebar.min.css";

// import hooks
import useMounted from "hooks/useMounted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setISLoggedIn, setUserType } from "utils/redux/reducer/authReducer";
import { useRouter } from "next/router";
const QuickMenu = () => {
  const router = useRouter();
  const hasMounted = useMounted();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const QuickMenuDesktop = () => {
    const dispatch = useDispatch();

    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className={`navbar-right-wrap ms-auto d-flex nav-top-wrap`}
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div
              className="avatar avatar-lg avatar-indicators"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                style={{
                  height: "30px",
                  width: "30px",
                }}
                icon={faCog}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="left"
            aria-labelledby="dropdownUser"
            show
          >
            <Dropdown.Item
              onClick={() => {
                dispatch(setISLoggedIn(false));
                localStorage.removeItem("token");
                router.push("/sign-in");
                dispatch(setUserType(""));
              }}
            >
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  const QuickMenuMobile = () => {
    const dispatch = useDispatch();

    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div
              className="avatar avatar-lg avatar-indicators"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                style={{
                  height: "30px",
                  width: "30px",
                }}
                icon={faCog}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
          >
            <Dropdown.Item
              onClick={() => {
                dispatch(setISLoggedIn(false));
                dispatch(setUserType(""));
                localStorage.removeItem("token");
                router.push("/sign-in");
              }}
            >
              <i className="fe fe-power me-2"></i>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  return (
    <Fragment>
      {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
    </Fragment>
  );
};

export default QuickMenu;
