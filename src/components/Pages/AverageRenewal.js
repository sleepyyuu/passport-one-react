import { useParams } from "react-router-dom";
import "./Renewal.css";
import uniqid from "uniqid";
import ExpeditedToggler from "../ExpeditedToggler";

export default function AverageRenewal(props) {
  const { submission, averageTime, loadingElement, loading, errorElement, hasError, expedited, setExpedited } = props;
  const { averageMonths } = useParams();
  let numMonth = 0;
  if (averageMonths === "oneMonth") {
    numMonth = 1;
  } else if (averageMonths === "threeMonth") {
    numMonth = 3;
  } else if (averageMonths === "sixMonth") {
    numMonth = 6;
  }
  if (hasError) {
    return errorElement;
  }
  return loading === null || loading ? (
    loadingElement
  ) : (
    <div className="informationContainer">
      <ExpeditedToggler expedited={expedited} setExpedited={setExpedited} />
      <div className="renewalContainer">
        <div className="renewalLengthTitle">{expedited ? "Expedited Renewal Length" : "Renewal Length"}</div>
        <div className="averageRenewalStatement">The average renewal in the past {numMonth} month(s) took</div>
        <div className="averageRenewalDays">{averageTime[averageMonths]} days</div>
        <div className="renewalDetailTitle">{expedited ? "Expedited Renewal Details" : "Renewal Details"}</div>
        <div className="renewalAmount">Pulled from {submission[averageMonths].length} data points</div>
        <table className="approvalLinkTable">
          <thead>
            <tr>
              <th>Length</th>
              <th>Approved</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {submission[averageMonths].map((post) => {
              return (
                <tr key={uniqid()}>
                  <td>{post.processingTime} days</td>
                  <td>{post.formattedApprovedDate}</td>
                  <td>
                    <a href={"https://www.reddit.com" + post.submissionData.permalink} target="_blank" rel="noreferrer">
                      view post
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
