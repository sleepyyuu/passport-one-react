import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import processData from "./assets/processData";
import LatestRenewal from "./components/Pages/LatestRenewal";
import AverageRenewal from "./components/Pages/AverageRenewal";
import AllRenewal from "./components/Pages/AllRenewal";
import InfoPage from "./components/Pages/InfoPage";
import moment from "moment";

function App() {
  const [submissionArray, setSubmissionArray] = useState([
    {
      latest: [],
      averageMonth: { oneMonth: [], threeMonth: [], sixMonth: [] },
      allMonth: [],
    },
    {
      latest: [],
      averageMonth: { oneMonth: [], threeMonth: [], sixMonth: [] },
      allMonth: [],
    },
  ]);
  const [renewalAverage, setRenewalAverage] = useState([
    {
      averageMonth: { oneMonth: 0, threeMonth: 0, sixMonth: 0 },
      allMonth: 0,
    },
    {
      averageMonth: { oneMonth: 0, threeMonth: 0, sixMonth: 0 },
      allMonth: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [expedited, setExpedited] = useState(true);
  const loadingElement = (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  const [hasError, setHasError] = useState(false);
  const errorElement = <div className="errorBlock">Please refresh, error contacting Reddit</div>;
  useEffect(() => {
    async function fetchData() {
      let renewalArray = await processData();
      let processedSubmissionArray = [];
      let processedAverageArray = [];
      for (let renewalSubmission of renewalArray) {
        if (renewalSubmission.length === 0) {
          setHasError(true);
        } else {
          let latestRenewalArray = [];
          let oneMonthArray = [];
          let threeMonthArray = [];
          let sixMonthArray = [];
          let oneMonthSum = 0;
          let oneMonthCounter = 0;
          let threeMonthSum = 0;
          let threeMonthCounter = 0;
          let sixMonthSum = 0;
          let sixMonthCounter = 0;
          let allSum = 0;
          let allCounter = renewalSubmission.length;
          let todaysDate = moment();
          for (let submission of renewalSubmission) {
            let initialMoment = moment(submission.initialDate);
            let approvalMoment = moment(submission.approvedDate);
            let dateStaleness = todaysDate.diff(approvalMoment, "days");
            submission.processingTime = approvalMoment.diff(initialMoment, "days");
            submission.formattedApprovedDate = moment(submission.approvedDate).format("M/D/YY");
            if (dateStaleness < 31) {
              oneMonthSum += submission.processingTime;
              oneMonthCounter++;
              oneMonthArray.push(submission);
            }
            if (dateStaleness < 90) {
              threeMonthSum += submission.processingTime;
              threeMonthCounter++;
              threeMonthArray.push(submission);
            }
            if (dateStaleness < 180) {
              sixMonthSum += submission.processingTime;
              sixMonthCounter++;
              sixMonthArray.push(submission);
            }
            allSum += submission.processingTime;
          }
          let compareFunctionDate = (submission1, submission2) => {
            if (submission1.approvedDate.getTime() < submission2.approvedDate.getTime()) {
              return 1;
            }
            if (submission1.approvedDate.getTime() > submission2.approvedDate.getTime()) {
              return -1;
            }
            return 0;
          };
          renewalSubmission.sort(compareFunctionDate);
          oneMonthArray.sort(compareFunctionDate);
          threeMonthArray.sort(compareFunctionDate);
          sixMonthArray.sort(compareFunctionDate);
          latestRenewalArray.push(oneMonthArray[0]);
          let oneMonthAverage = Math.round(oneMonthSum / oneMonthCounter);
          let threeMonthAverage = Math.round(threeMonthSum / threeMonthCounter);
          let sixMonthAverage = Math.round(sixMonthSum / sixMonthCounter);
          let allMonthAverage = Math.round(allSum / allCounter);
          processedSubmissionArray.push({
            latest: latestRenewalArray,
            averageMonth: { oneMonth: oneMonthArray, threeMonth: threeMonthArray, sixMonth: sixMonthArray },
            allMonth: renewalSubmission,
          });
          processedAverageArray.push({
            averageMonth: { oneMonth: oneMonthAverage, threeMonth: threeMonthAverage, sixMonth: sixMonthAverage },
            allMonth: allMonthAverage,
          });
        }
      }
      setSubmissionArray(processedSubmissionArray);
      setRenewalAverage(processedAverageArray);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Header expedited={expedited} setExpedited={setExpedited}></Header>
      {hasError ? (
        errorElement
      ) : (
        <div className="mainBody">
          <Routes>
            <Route
              path="/"
              index
              element={
                <LatestRenewal
                  submission={expedited ? submissionArray[0].latest : submissionArray[1].latest}
                  loadingElement={loadingElement}
                  loading={loading}
                  expedited={expedited}
                  setExpedited={setExpedited}
                />
              }
            />
            <Route
              path="/averageRenewal/:averageMonths"
              element={
                <AverageRenewal
                  submission={expedited ? submissionArray[0].averageMonth : submissionArray[1].averageMonth}
                  averageTime={expedited ? renewalAverage[0].averageMonth : renewalAverage[1].averageMonth}
                  loadingElement={loadingElement}
                  loading={loading}
                  errorElement={errorElement}
                  hasError={hasError}
                  expedited={expedited}
                  setExpedited={setExpedited}
                />
              }
            />
            <Route
              path="/allRenewal"
              element={
                <AllRenewal
                  submission={expedited ? submissionArray[0].allMonth : submissionArray[1].allMonth}
                  averageTime={expedited ? renewalAverage[0].allMonth : renewalAverage[1].allMonth}
                  loadingElement={loadingElement}
                  loading={loading}
                  errorElement={errorElement}
                  hasError={hasError}
                  expedited={expedited}
                  setExpedited={setExpedited}
                />
              }
            />
            <Route path="/infoPage" element={<InfoPage />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
