"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import "leaflet/dist/leaflet.css";
const MapComponent = () => {
  const position = [21.194899, 72.837945];
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  if (!isClient) {
    return null;
  } else {
    return (
      <MapContainer
        center={position}
        zoom={25}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://www.google.com/maps/place/Galaxy+Cargo/@21.194899,72.837945,15z/data=!4m2!3m1!1s0x0:0x3d56ddcafd583c4a?sa=X&ved=1t:2428&ictx=111" target="_blank">Galaxy Cargo Services India LLP</a>'
        />
        <Marker
          position={position}
          style={{
            height: "25px !important",
            width: "25px !important",
          }}
        >
          <Popup>Galaxy Cargo Services India LLP</Popup>
        </Marker>
      </MapContainer>
    );
  }
};
export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
