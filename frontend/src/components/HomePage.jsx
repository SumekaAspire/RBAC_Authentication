import "../App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate("/SignUp");
  };
  const handleNavigateToLogin = () => {
    navigate("/Login");
  };
   

  return (
    <div
      style={{
         textAlign: "center",
         //backgroundColor: "peachpuff",
         padding: "30px"
      }}
    >
      <div >
        <h2>WEBSITE !!</h2>
      </div>

      <div style={buttonContainerStyle}>
        <button onClick={handleNavigateToSignUp} style={buttonStyle}>
          Register
        </button>
        <button onClick={handleNavigateToLogin} style={buttonStyle}>
          Login
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>ABOUT US</h2>
        <p>
          At our Company, we are dedicated to providing top-notch
          products/services that cater to the unique needs of our clients.
          Founded in [Year], we have built a reputation for quality, innovation,
          and customer satisfaction. Our team of experts is passionate about
          what they do, ensuring that every interaction with our brand is a
          positive one.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>MISSION</h2>
        <p>
          Our mission is to empower our customers by delivering exceptional
          products/services that enhance their lives and businesses. We strive
          to create value through innovation, integrity, and a commitment to
          excellence in everything we do.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>VISION</h2>
        <p>
          We envision a world where everyone has access to sustainable and
          innovative solutions that improve their quality of life. At our
          Company, we aim to lead the way in our industry by setting new
          standards for quality and service.
        </p>
      </div>
    
    </div>
  );
}

const buttonStyle = {
  padding: "7px 15px",
  fontSize: "13px",
  cursor: "pointer",
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  margin: "10px",
};

const buttonContainerStyle = {
  position: "absolute",
  top: "50px",
  right: "100px",
  display: "flex",
  gap: "10px",
};

const contentStyle = {
  textAlign: "center",
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "40px",
  fontWeight: "italic",
  marginBottom: "60px",
};

const sectionStyle = {
  margin: "50px auto",
  padding: "20px",
  maxWidth: "600px",
  textAlign: "center",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

export default HomePage;
