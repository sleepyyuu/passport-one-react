import "./Renewal.css";

export default function InfoPage(props) {
  return (
    <div className="informationContainer">
      <div className="renewalContainer">
        <div className="renewalLengthTitle">What is this?</div>
        <div className="questionBody">
          This site was created in hopes of presenting information regarding passport renewals in a more accessible
          manner. The official travel.gov passport processing times, while helpful, is incredibly broad. This site
          parses submissions from Reddit and processes posts that have usable information regarding application
          timelines.
        </div>
        <div className="contactHeader">Contact information</div>
        <div className="contactBody">For all inquiries please email k28143995@gmail.com</div>
      </div>
    </div>
  );
}
