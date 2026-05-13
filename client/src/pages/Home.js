import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleBuyNow = () => {
    window.open(
      "https://www.amazon.in/HANK-Harness-Reflective-Oxford-control/dp/B09M57CXHS/ref=sr_1_1_sspa?crid=3MQ468HEK6927&dib=eyJ2IjoiMSJ9.kCxRevbo5zaInisayV_7zyKdGKvSFsPg7NqedWhsTSlv-gs-bmyGIx7zNZVaKR50Q6WcPoEps_HEcaDL0g1jpH9AeHz1PgL3i9bGboxXbVLERCpip5c3XKLoxe13WvjqvjwIpdyJy5St4PScBLawHp90swU8GyHclMM2Xp4rA4k6zpst_mHGW8VIV50El5dbzSft13pkaN1FQ-Wcy8ylbtb0VSk9FGLwdR4aV_1xZrtEoCFfj-dXdxx9D2z9ZEMXppRzvDCcVx8htgV4qCAuq79zOG8poxOmsjkMeiKvd4Y.-C6lm9ep-9loqUrzZBXDT99EuesK9DV18437rkMD8V8&dib_tag=se&keywords=dog+belts+for+track&qid=1750151557&sprefix=dog+belts+for+track%2Caps%2C240&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      "_blank"
    );
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Pet Health Tracer</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <a href="#how" className="nav-link">
            How It Works
          </a>
          <a
            href="https://www.ncbi.nlm.nih.gov/books/NBK500439/#sec31_3"
            target="_blank"
            className="nav-link"
          >
            Health Manager
          </a>
          <a
            href="https://health.economictimes.indiatimes.com/news/industry/indias-pet-healthcare-industry-from-ruff-beginnings-to-pawsome-prospects/98843641"
            className="nav-link"
            target="_blank"
          >
            News
          </a>
          <a
            href="https://www.amazon.in/s?k=dog+care"
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop
          </a>
          {!user ? (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          ) : (
            <>
              <span className="welcome-msg">Welcome, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-card">
          <h1>Track Your Pet’s Health Anytime</h1>
          <div className="hero-actions">
            <button className="hero-btn">Track Pet</button>
            <button className="hero-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="companies-section">
        <h2>Innovative Pet Companies</h2>
        <div className="company-animation-wrapper">
          <div className="company-animation">
            <div className="company-card">Company 1</div>
            <div className="company-card">Company 2</div>
            <div className="company-card">Company 3</div>
            <div className="company-card">Company 4</div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="media-section">
        <div className="media-block">
          <h3 style={{ fontFamily: "sans-serif", fontSize: "28px" }}>
            Pet Band Video
          </h3>
          <iframe
            className="media-video"
            width={500}
            height={500}
            src="https://www.youtube.com/embed/Nf2xCtAKoqg?si=VsJeM_FESv5GH8Z4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="media-block">
          <h3 style={{ fontFamily: "sans-serif", fontSize: "28px" }}>
            Pet Image
          </h3>
          <img
            className="media-image"
            src="https://th.bing.com/th/id/OIP.5ykM9aEcYmmj-lyjdjZJPwHaHa"
            alt="Pet"
          />
        </div>
      </section>

      {/* Table Section */}
      <section className="table-section">
        <h3 style={{ marginBottom: "20px", fontSize: "32px" }}>
          Pet Service Information
        </h3>
        <table className="service-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vaccination</td>
              <td>Required yearly</td>
            </tr>
            <tr>
              <td>Grooming</td>
              <td>Once a month</td>
            </tr>
            <tr>
              <td>Dental Check</td>
              <td>Every 6 months</td>
            </tr>
            <tr>
              <td>Nutrition Plan</td>
              <td>Personalized for each pet</td>
            </tr>
            <tr>
              <td>Exercise Tracker</td>
              <td>Daily walk record</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;
