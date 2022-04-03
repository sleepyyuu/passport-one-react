async function requestData() {
  let allResponses = [];
  let lastRenewalObject;
  let getSubmission = async function (url) {
    try {
      let response;
      let dataUrl = url;
      do {
        response = await fetch(dataUrl, {
          mode: "cors",
        });
        response = await response.json();
        response = response.data.children;
        for (let submission of response) {
          submission.data.postedDate = new Date(1000 * submission.data.created_utc);
          allResponses.push(submission.data);
        }
        //utiilize api "after" to get more than 100 results
        lastRenewalObject = response[response.length - 1].data;
        let count = 100;
        let lastID = lastRenewalObject.id;
        dataUrl = url + "&count=" + count + "&after=t3_" + lastID;
        count += 100;
      } while (response.length === 100);
    } catch (error) {
      return allResponses;
    }
  };

  Promise.all([
    await getSubmission(
      "https://old.reddit.com/r/DACA/search/.json?sort=new&restrict_sr=on&q=flair%3AApplication%2BTimeline&limit=100"
    ),
  ]);
  return allResponses;
}

export default requestData;
