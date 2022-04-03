import { ReactComponent as QuestionImage } from "../assets/question.svg";
import "./Header.css";
import "./ButtonStylings.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const dropDownRef = useRef(null);
  const [dropDownActive, setDropDownActive] = useState(false);
  const dropDownClick = () => {
    setDropDownActive((dropDownActive) => {
      return !dropDownActive;
    });
  };
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {
        setDropDownActive(!dropDownActive);
      }
    };

    if (dropDownActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [dropDownActive]);
  return (
    <div className="header">
      <div className="headerTop">
        <div className="contactButton"></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="headerText">DACA | Processing Times</div>
        </Link>
        <Link to="/infoPage" style={{ textDecoration: "none" }}>
          <button className="infoButton">
            <svg id="questionImageButton" height="33px" width="33px">
              <QuestionImage />
            </svg>
          </button>
        </Link>
      </div>
      <div className="informationLinks">
        <Link to="/">
          <button className="latestRenewalTimeButton">Latest renewal</button>
        </Link>
        <div ref={dropDownRef} className="averageDropDownMenuContainer">
          <button className="averageRenewalTimeButton" onClick={dropDownClick}>
            Average renewal
            <div className="dropDownIcon">⌄</div>
          </button>
          <div className={dropDownActive ? "averageDropDownMenuShow" : "averageDropDownMenu"}>
            <Link to="/averageRenewal/oneMonth">
              <button
                className="oneMonthButton"
                onClick={() => {
                  setDropDownActive(false);
                }}
              >
                &nbsp;&nbsp;&nbsp;1 Month
              </button>
            </Link>
            <Link to="/averageRenewal/threeMonth">
              <button
                className="threeMonthButton"
                onClick={() => {
                  setDropDownActive(false);
                }}
              >
                &nbsp;&nbsp;&nbsp;3 Month
              </button>
            </Link>
            <Link to="/averageRenewal/sixMonth">
              <button
                className="sixMonthButton"
                onClick={() => {
                  setDropDownActive(false);
                }}
              >
                &nbsp;&nbsp;&nbsp;6 Month
              </button>
            </Link>
          </div>
        </div>
        <Link to="/allRenewal">
          <button className="allRenewalTimeButton">All renewals</button>
        </Link>
      </div>
      <div className="alertContainer">
        <div className="welcomeAlert">
          <h1>
            <b>Notice</b>: This site aggregates form I-821D and form I-765 DACA (deferred action for childhood arrivals)
            renewal case processing times to provide time estimates for renewal applicants.
          </h1>
        </div>
        <div className="officialUscisAlert">
          <b>Info</b>: The information here is obtained from Reddit submissions and is <b>not</b> official. Use the
          information here with official USCIS case processing times presented&nbsp;
          <a href="https://egov.uscis.gov/processing-times/" alt="USCIS Link" target="_blank" rel="noreferrer">
            here
          </a>
        </div>
      </div>
    </div>
  );
}
