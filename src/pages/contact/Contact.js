import { useState } from "react"
import "./Contact.scss"
import Card from "../../components/card/Card";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("")
  const data = {
    subject,
    message,
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`${BACKEND_URL}/api/contactus`, data)
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card className="card">
            <label>Subject</label>
            <input type="text" name="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <label>Message</label>
            <textarea cols="30" rows="10" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Contact Information</h3>
            <p>Fill the form below or contact us via the other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>+12345678</p>
              </span>
              <span>
                <FaEnvelope />
                <p>fake@address.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Manchester, United Kingdom</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact
