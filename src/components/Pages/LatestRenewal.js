import "./Renewal.css";
import "./LatestRenewal.css";

export default function LatestRenewal(props) {
  const { submission, loadingElement, loading, expedited } = props;
  return loading ? (
    loadingElement
  ) : (
    <div className="informationContainer">
      <div className="renewalContainer">
        <div className="renewalLengthTitle">{expedited ? "Expedited Renewal Length" : "Renewal Length"}</div>
        <div className="latestRenewalStatement">The latest renewal took</div>
        <div className="averageRenewalDays">{submission[0].processingTime} days</div>
        <div className="renewalDetailTitle">{expedited ? "Expedited Renewal Details" : "Renewal Details"}</div>
        <div className="renewalAmount">Card produced/approved on {submission[0].formattedApprovedDate}</div>
        <div className="latestRenewalLink">
          <a href={"https://www.reddit.com" + submission[0].submissionData.permalink} target="_blank" rel="noreferrer">
            view post
          </a>
        </div>
      </div>
    </div>
  );
}
