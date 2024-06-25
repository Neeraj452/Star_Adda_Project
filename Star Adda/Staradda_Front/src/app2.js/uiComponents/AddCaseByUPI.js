import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../css/landing.css";
import style from "../css/gamehis.module.css";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import io from "../Components/socket";
import socket from "../Components/socket";

const EndPoint = process.env.REACT_APP_API_URL;
let access_token = localStorage.getItem("token");

const AddCaseByUPI = () => {
  const initialFormData = {
    upi: "874847454@paytm",
    User_id: null,
    amount: "",
    payment_gatway: "UPI Payment",
    status: "pending",
    Req_type: "deposit",
    order_token: "",
    paymentImage: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [copied, setCopied] = useState(false);
  const [userAllData, setUserAllData] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleCopy = (e) => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Hide the message after 3 seconds
  };
  const getUserData = () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    axios
      .get(`${EndPoint}/me`, { headers })
      .then((res) => {
        setUserAllData(res.data);
      })
      .catch((e) => {
        if (e.response.status == 401) {
          localStorage.removeItem("token");
          window.location.reload();
          history.push("/login");
        }
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    socket.on("updateWallet", () => {
      getUserData();
    });
  }, [socket]);
  const handleApiSubmit = async (data) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      // Make the API call
      const response = await axios.post(
        `${EndPoint}/manual/deposit/utr`,
        data,
        {
          headers,
        }
      );
      Swal.fire({
        title: "Success!",
        text: response.data?.message,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setFormData(initialFormData);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: error?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  };
  const validateUTR = (utr) => {
    // UTR number should be exactly 22 characters long
    if (utr.length !== 22) {
      return false;
    }
    // UTR number should contain only alphanumeric characters
    const utrRegex = /^[A-Za-z0-9]{22}$/;
    return utrRegex.test(utr);
  };

  const handleSubmit = () => {
    if (!formData?.amount) {
      Swal.fire({
        title: "Error!",
        text: "Please Enter Amount",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!formData?.order_token) {
      Swal.fire({
        title: "Error!",
        text: "Please Enter UTR No.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!validateUTR(formData?.order_token)) {
      Swal.fire({
        title: "Error!",
        text: "Please Enter valid UTR Number.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!formData?.paymentImage) {
      Swal.fire({
        title: "Error!",
        text: "Please Upload Payment Screenshot ",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const data = { ...formData, User_id: userAllData?._id };
      const formDataToSend = new FormData();
      for (const key in data) {
        if (formData.hasOwnProperty(key)) {
          formDataToSend.append(key, data[key]);
        }
      }
      handleApiSubmit(formDataToSend);
    }
  };
  return (
    <>
      <Header user={userAllData} />
      <div className="leftContainer mb_space p-2">
        <div className="pt-5 mt-5  Orher_page_main_section">
          <h2 className="profile_headings">Deposit Now</h2>
          <div className="form">
            <div>
              <label htmlFor="upi-id">Copy UPI ID & Make Payment</label>
              <div className="copy_upi_field">
                <input
                  type="text"
                  id="upi-id"
                  name="upi-id"
                  placeholder="38434445@ybl"
                  disabled
                />
                <CopyToClipboard text={formData?.upi} onCopy={handleCopy}>
                  <FiCopy style={{ fontSize: "2rem" }} />
                </CopyToClipboard>
                {copied && (
                  <span className="copied" style={{ position: "absolute" }}>
                    Copied!
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="Amount">Amount</label>
              <input
                type="text"
                id="Amount"
                value={formData?.amount}
                onChange={(e) => {
                  e.persist();
                  setFormData((prev) => ({
                    ...prev,
                    amount: e?.target?.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="UTR_No">UTR No</label>
              <input
                type="text"
                id="UTR_No"
                value={formData.order_token}
                onChange={(e) => {
                  e.persist();
                  setFormData((prev) => ({
                    ...prev,
                    order_token: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="Payment">Payment Screenshot</label>
              <input
                type="file"
                id="Payment"
                onChange={(e) => {
                  e.persist();
                  setFormData((prev) => ({
                    ...prev,
                    paymentImage: e.target.files[0],
                  }));
                }}
              />
            </div>
          </div>
          <div className="btn_align">
            <button
              className="submit_btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCaseByUPI;