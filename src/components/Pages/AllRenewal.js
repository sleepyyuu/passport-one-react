import "./Renewal.css";
import uniqid from "uniqid";

export default function AllRenewal(props) {
  const { submission, averageTime, loadingElement, loading, errorElement, hasError } = props;
  if (hasError) {
    return errorElement;
  }
  return loading ? (
    loadingElement
  ) : (
    <div className="informationContainer">
      <div className="renewalContainer">
        <div className="renewalLengthTitle">Renewal Length</div>
        <div className="averageRenewalStatement">The average renewal from ALL obtainable submissions took</div>
        <div className="averageRenewalDays">{averageTime} days</div>
        <div className="renewalDetailTitle">Renewal Details</div>
        <div className="renewalAmount">Pulled from {submission.length} data points</div>
        <table className="approvalLinkTable">
          <thead>
            <tr>
              <th>Length</th>
              <th>Approved</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {submission.map((post) => {
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
