import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "utils/redux/reducer/authReducer";

function index() {
  const router = useRouter();
  const isLogedIn = useSelector(getIsLoggedIn);
  console.log("🚀 ~ file: index.js:9 ~ index ~ isLogedIn:", isLogedIn);

  useEffect(() => {
    if (isLogedIn) {
      router.push("/products");
    } else {
      router.push("/sign-in");
    }
    return <></>;
  }, [isLogedIn]);
}

export default index;
