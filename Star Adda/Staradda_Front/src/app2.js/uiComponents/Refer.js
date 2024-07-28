import React, { useEffect, useState } from "react";
import css from "../css/Refer.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import { BsWhatsapp } from "react-icons/bs";
import { BsTelegram, BsInstagram } from "react-icons/bs";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";

const Refer = () => {
  const [user, setUser] = useState();
  const EndPoint = process.env.REACT_APP_API_URL;
  const Cashheader = () => {
    let access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    axios
      .get(`${EndPoint}/me`, { headers })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
        Allgames(res.data.referral_code);
      })
      .catch((e) => {
        // alert(e.msg)
      });
  };
  const copyLink = (e) => {
    Swal.fire({
      position: "center",
      icon: "success",
      type: "success",
      title: "Referal Link Copied",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const [cardData, setGame] = useState([]);

  const Allgames = async (id) => {
    const access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await axios
      .get(`${EndPoint}/referral/code/${id}`, { headers })
      .then((res) => {
        setGame(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    Cashheader();
    //eslint-disable-next-line
  }, []);

  if (user === undefined) {
    return null;
  }

  // const referralText = `Play Ludo and earn ₹10000 daily.  http://ZUSS.in/login/${user.referral_code}  Register Now, My refer code is ${user.referral_code}.`;

  const referralText = `ZUSS  लूडो खेल कर या दोस्तों को शेयर कर के पैसा जीतो और तुरंत अपने Bank या UPI में ट्रांसफर कर सकते है।
दोस्तो को शेयर करने पर उनका आपको लाइफ टाइम 2% कमीशन दिया जाएगा  

  100% भरोसेमंद प्लेटफार्म। 24 hours support http://ZUSS.in/login/${user.referral_code}

Your ReferralCode is - ${user.referral_code}.`;
  return (
    <>
      <Header user={user} />
      <div>
        <div className="leftContainer" style={{ height: "100vh" }}>
          {/* <div className={`${css.center_xy} pt-5 refer_page`}>
            <picture className='mt-1'>
              <img
                alt='img'
                width='226px'
                src={process.env.PUBLIC_URL + 'Images/refer/refer.png'}
                className='snip-img'
              />
            </picture>
            <div className='mb-1'>
              <div className=''>
                <h1>
                  {' '}
                  Earn now unlimited
                  <span aria-label='party-face'>🥳</span>
                </h1>
              </div>
              <div className='d-flex justify-content-center'>
                <p className='Refer_your'> Refer your friends now!</p>
              </div>
              <div className='mt-3 text-center font-9'>
                <h3>
                  {' '}
                  Current Earning:
                  <b>{user.referral_wallet}</b>
                  <Link className='ml-2' to='/Redeem'>
                    Redeem
                  </Link>
                </h3>
              </div>
              <div className='text-center font-9'>
                Total Earned:
                <b>{user.referral_earning}</b>
              </div>
              <div className={`${css.progress}`}>
                <div
                  className={`${css.progress_bar} ${css.progress_bar_striped} ${css.bg_success}`}
                  aria-valuenow={user.referral_earning}
                  aria-valuemax={10000}
                  style={{ width: `${(user.referral_earning * 100) / 10000}%` }}
                ></div>
              </div>
              <div className='font-9'>
                <span>Max: ₹10,000</span>
                <Link className='float-right' to='/update-pan'>
                  Upgrade Limit
                </Link>
              </div>
              <div className={`${css.text_bold} mt-3 text-center`}>
                Your Refer Code: {user.referral_code}
                <i
                  className='ri-clipboard-fill ml-2 '
                  style={{ fontSize: '20px', color: '#007bff' }}
                  onClick={e => copyCode(e)}
                ></i>
              </div>

              <div className='d-flex justify-content-center'>
                Total Refers:&nbsp;
                <b>{cardData && cardData}</b>
              </div>
            </div>
          </div>

          <div className='mx-3 my-3 refer_page_bottom'>
            <div className={`${css.font_11} ${css.text_bold}`}>
              <h1> Refer &amp; Earn Rules</h1>
            </div>
            <div className='d-flex align-items-center m-3'>
              <picture>
                <img
                  alt='img'
                  width='82px'
                  src={process.env.PUBLIC_URL + 'Images/refer/giftbanner.png'}
                  className='snip-img'
                />
              </picture>
              <div className={`${css.font_9} mx-3 `} style={{ width: '100%' }}>
                <p>
                  When your friend signs up on khelo Hub from your referral
                  link,
                </p>
                <div className={`${css.font_8} ${css.c_green} mt-2`}>
                  You get
                  <strong>1% Commission</strong>
                  on your
                  <strong> referral's winnings.</strong>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center m-3'>
              <picture>
                <img
                  alt='img'
                  width='82px'
                  src={process.env.PUBLIC_URL + 'Images/refer/banner.png'}
                  className='snip-img'
                />
              </picture>
              <div className={`${css.font_9} mx-3 `} style={{ width: '63%' }}>
                <p>Suppose your referral plays a battle for ₹10000 Cash,</p>
                <div className={`${css.font_8} ${css.c_green} mt-2`}>
                  You get
                  <strong>₹100 Cash</strong>
                  <strong></strong>
                </div>
              </div>
            </div>
          </div>

          <div className={`${css.refer_footer} pt-2 `}>
            <a
              href={`whatsapp://send?text=Play Ludo and earn ₹10000 daily.  http://ZUSS.in/login/${user.referral_code}  Register Now, My refer code is ${user.referral_code}.`}
              style={{ width: '100%' }}
            >
              <button className='bg-green refer-button cxy w-100'>
                Share in Whatsapp
              </button>
            </a>
          </div> */}

          <section className="refer_page_main_section">
            <div className="refer_page_top_main_box_outer mb-5">
              <div className="refer_page_top_main_box">
                <h2>Your Referral Earnings</h2>
              </div>
              <div className="refer_page_top_main_box_inner">
                <div className="refer_page_top_main_box_inner_single bo_le">
                  <h3>Referred Players</h3>
                  <h4>{cardData && cardData}</h4>
                </div>
                <div className="refer_page_top_main_box_inner_single">
                  <h3>Referral Earning</h3>
                  <h4>₹{user.referral_earning}</h4>
                </div>
              </div>
            </div>

            <div className="refer_page_top_main_box_outer">
              <div className="refer_page_top_main_box">
                <h2>Referral Code</h2>
              </div>
              <div>
                <div className="Refer_code">
                  <h3>{user.referral_code}</h3>
                  <button>Copy</button>
                </div>
                <div className="or_div">
                  {" "}
                  <h2>OR</h2>{" "}
                </div>
                <div className="whatsapp_share_btn">
                  {/* <a
                    href={`whatsapp://send?text=Play Ludo and earn ₹10000 daily.  http://ZUSS.in/login/${user.referral_code}  Register Now, My refer code is ${user.referral_code}.`}
                    style={{ width: '100%' }}
                  > */}
                  <a
                    href={`whatsapp://send?text=ZUSS%20%20%E0%A4%B2%E0%A5%82%E0%A4%A1%E0%A5%8B%20%E0%A4%96%E0%A5%87%E0%A4%B2%20%E0%A4%95%E0%A4%B0%20%E0%A4%AF%E0%A4%BE%20%E0%A4%A6%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%82%20%E0%A4%95%E0%A5%8B%20%E0%A4%B6%E0%A5%87%E0%A4%AF%E0%A4%B0%20%E0%A4%95%E0%A4%B0%20%E0%A4%95%E0%A5%87%20%E0%A4%AA%E0%A5%88%E0%A4%B8%E0%A4%BE%20%E0%A4%9C%E0%A5%80%E0%A4%A4%E0%A5%8B%20%E0%A4%94%E0%A4%B0%20%E0%A4%A4%E0%A5%81%E0%A4%B0%E0%A4%82%E0%A4%A4%20%E0%A4%85%E0%A4%AA%E0%A4%A8%E0%A5%87%20Bank%20%E0%A4%AF%E0%A4%BE%20UPI%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A4%AB%E0%A4%B0%20%E0%A4%95%E0%A4%B0%20%E0%A4%B8%E0%A4%95%E0%A4%A4%E0%A5%87%20%E0%A4%B9%E0%A5%88%E0%A5%A4%0A%E0%A4%A6%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%20%E0%A4%95%E0%A5%8B%20%E0%A4%B6%E0%A5%87%E0%A4%AF%E0%A4%B0%20%E0%A4%95%E0%A4%B0%E0%A4%A8%E0%A5%87%20%E0%A4%AA%E0%A4%B0%20%E0%A4%89%E0%A4%A8%E0%A4%95%E0%A4%BE%20%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%8B%20%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%AB%20%E0%A4%9F%E0%A4%BE%E0%A4%87%E0%A4%AE%202%25%20%E0%A4%95%E0%A4%AE%E0%A5%80%E0%A4%B6%E0%A4%A8%20%E0%A4%A6%E0%A4%BF%E0%A4%AF%E0%A4%BE%20%E0%A4%9C%E0%A4%BE%E0%A4%8F%E0%A4%97%E0%A4%BE%20%20%0A%0A%20%20100%25%20%E0%A4%AD%E0%A4%B0%E0%A5%8B%E0%A4%B8%E0%A5%87%E0%A4%AE%E0%A4%82%E0%A4%A6%20%E0%A4%AA%E0%A5%8D%E0%A4%B2%E0%A5%87%E0%A4%9F%E0%A4%AB%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A5%A4%2024%20hours%20support%20https://zuss.in/login%2F${user.referral_code}%0A%0AYour%20ReferralCode%C2%A0is%C2%A0-%C2%A0${user.referral_code}.`}
                    style={{ width: "100%" }}
                  >
                    <BsWhatsapp /> Share On Whatsapp
                  </a>
                </div>
                <div className="whatsapp_share_btn">
                  <a
                    href={`https://telegram.me/share/url?url?text=Play Ludo and earn ₹10000 daily.  http://ZUSS.in/login/${user.referral_code}  Register Now, My refer code is ${user.referral_code}.`}
                    style={{ width: "100%" }}
                  >
                    <BsTelegram /> Share On Telegram
                  </a>
                </div>
                {/* <div className="whatsapp_share_btn">
                  <a
                    href={`https://www.instagram.com/RKZONESofficial/`}
                    style={{ width: "100%" }}
                  >
                    <BsInstagram /> Share On Instagram
                  </a>
                </div> */}
                <div className="whatsapp_share_btn">
                  <CopyToClipboard text={referralText}>
                    <button
                      style={{ width: "100%" }}
                      onClick={(e) => copyLink(e)}
                    >
                      <FiCopy />
                      Copy Link
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            <div className="refer_page_top_main_box_outer mt-5">
              <div className="refer_page_top_main_box">
                <h2>How It Works</h2>
              </div>
              <div className="refer_page_top_main_box_inner">
                <div className="refer_rules">
                  <p>
                    1. You can refer and Earn 2% of your referral winning, every
                    time
                  </p>
                  <p>
                    2. Like if your player plays for ₹10000 and wins, You will
                    get ₹200 as referral amount.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Refer;
