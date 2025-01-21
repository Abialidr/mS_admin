// import node module libraries
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
// import sub components
import NavbarVertical from "./navbars/NavbarVertical";
import NavbarTop from "./navbars/NavbarTop";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  setISLoggedIn,
  setUserType,
} from "utils/redux/reducer/authReducer";
import { useRouter } from "next/router";

const DefaultDashboardLayout = (props) => {
  const isLogedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      (router.pathname === "/" || router.pathname.includes("sign-in")) &&
      isLogedIn
    ) {
      router.push("/products");
    } else if (router.pathname === "/" && !isLogedIn) {
      router.push("/sign-in");
    }
    if (localStorage !== undefined) {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("usertype");
      console.log(
        "🚀 ~ file: DefaultDashboardLayout.js:18 ~ useLayoutEffect ~ token:",
        token,
        router.pathname
      );
      if (!isExpired(token)) {
        dispatch(setISLoggedIn(true));
        dispatch(setUserType(userType));
      }
    }
  }, [router.pathname, isLogedIn]);
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  if (isLogedIn) {
    return (
      <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
        <div className="navbar-vertical navbar">
          <NavbarVertical
            showMenu={showMenu}
            onClick={(value) => setShowMenu(value)}
          />
        </div>
        <div id="page-content">
          <div className="header">
            <NavbarTop
              data={{
                showMenu: showMenu,
                SidebarToggleMenu: ToggleMenu,
              }}
            />
          </div>
          {props.children}
          <div className="px-6 border-top py-3">
            <Row></Row>
          </div>
        </div>
      </div>
    );
  } else if (
    router.pathname.includes("home") ||
    router.pathname.includes("sign-in") ||
    router.pathname.includes("detailtracking")
  ) {
    return <>{props.children}</>;
  }
};
export default DefaultDashboardLayout;
