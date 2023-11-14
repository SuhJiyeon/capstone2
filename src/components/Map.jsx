import { Wrapper } from "@googlemaps/react-wrapper"
import MapInit from "./MapInit"

// ...생략
const Map = (props) => {

  return (
    <Wrapper apiKey={"AIzaSyDJEVugzuNVyQ4OB_gqFSdUEZuX98chM2A"} libraries={["places"]} >
      <MapInit {...props}></MapInit>
    </Wrapper>
  )

}


export default Map