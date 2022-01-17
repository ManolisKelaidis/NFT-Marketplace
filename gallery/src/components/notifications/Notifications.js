import image from "../../assets/img/OIP.png";
import { Image } from "react-bootstrap";
const Notifications = ({ notificationsNumber }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        marginLeft: "3px",
        position: "relative",
      }}
    >
      <Image
        src={image}
        style={({ width: "20px" }, { height: "20px" })}
      ></Image>
      <div
        style={{
          width: "15px",
          height: "15px",
          position: "absolute",
          top: "40%",
          left: "62%",
          transform: " translate(-50%, -50%) ",
          color:"black"
          ,
        }}
      >
        {notificationsNumber}
      </div>
    </div>
  );
};

export default Notifications;
