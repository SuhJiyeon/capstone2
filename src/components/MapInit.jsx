import { useEffect, useRef, useState } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";

import styles from "../pages/Upload/Upload.module.css";
import MapInput from "./MapInput";
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 0,
}

const MapInit = (props) => {
  const [map, setMap] = useState(null);
  const [searchLocation, setSearchLocation] = useState()

  const InputRef = useRef(null);

  const ref = useRef();

  const [marker, setMarker] = useState(null);
  const { location, error } = useGeoLocation(geolocationOptions)
  console.log(location, "useGeoLocation")
  console.log(error, "에러")



  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });



  // 지도 클릭시 마커 표시
  // read-only 일 때는 클릭해도 무시함 해당 컴포넌트를 다른 곳에서도 쓰기 때문에 필요한 옵션
  const onClick = (e) => {
    if (props.viewType === "read-only") return;

    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };


  // 초기 맵 설정 
  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: props.location?.latitude ? props.location.latitude : 37.569227, lng: props.location?.longtitude ? props.location.longtitude : 126.9777256 },
      zoom: 16,
    });



    setMap(newMap);

  }, [props.location])
  useEffect(() => {


    // latitude: 37.4681777, longitude: 126.9433486}
    if (props.viewType === "read-only") return;


    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: location?.latitude ? location.latitude : 37.569227, lng: location?.longtitude ? location.longtitude : 126.9777256 },
      zoom: 16,
    });

    // const searchBox = new window.google.maps.places.SearchBox(InputRef.current);





    setMap(newMap);


  }, [location])

  useEffect(() => {
    if (!map) return;
    map.addListener("click", (e) => onClick(e));
    map.addListener("idle", () => onIdle(map));

    setMarker({ lat: props.location?.latitude ? props.location.latitude : 37.569227, lng: props.location?.longtitude ? props.location.longtitude : 126.9777256 })


  }, [map]);

  useEffect(() => {
    setMarker({ lat: searchLocation?.place?.geometry?.location?.lat(), lng: searchLocation?.place?.geometry?.location?.lng() })
  }, [searchLocation])

  useEffect(() => {

    // new marker logic
    if (!marker) return;

    const newMarker = new window.google.maps.Marker({
      position: marker,
      map,
    });
    if (props.viewType !== "read-only") {
      props.setGeoLocation(marker)

    }
    map.setCenter(marker)
    return () => newMarker.setMap(null);

  }, [marker])




  return (
    <div className={styles.MapWrapper}>


      {props.viewType === "read-only" ? null : <MapInput setSearchLocation={setSearchLocation} />}

      <div ref={ref} id="map" style={{ width: "100%", height: "500px" }}>


      </div>
    </div>

  )
};


export default MapInit