import "./Renewal.css";

export default function InfoPage(props) {
  return (
    <div className="informationContainer">
      <div className="renewalContainer">
        <div className="renewalLengthTitle">What is this?</div>
        <div className="questionBody">
          With the importance of making informed decisions regarding form I-821D and I-765 renewals, this site was
          created in hopes of presenting information regarding renewals in a more accessible manner. The official USCIS
          case processing times, while helpful, is incredibly broad. Many times, I found myself needing to look up and
          compare case times to that of other DACA recipients to make sure my case was still within the acceptable
          limits of processing time or to make a decision on when to send my renewal. This site parses submissions from
          Reddit and processes posts that have usable information regarding application timelines.
        </div>
        <div className="contactHeader">Contact information</div>
        <div className="contactBody">For all inquiries please email k28143995@gmail.com</div>
      </div>
    </div>
  );
}
