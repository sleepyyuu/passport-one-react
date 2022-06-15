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
        response = response.data;
        allResponses = allResponses.concat(response);
        // response = await response.json();
        // response = response.data.children;
        // for (let submission of response) {
        //   submission.data.postedDate = new Date(1000 * submission.data.created_utc);
        //   allResponses.push(submission.data);
        // }
        //utiilize api "after" to get more than 100 results
        // lastRenewalObject = response[response.length - 1].data;
        // let count = 100;
        // let lastID = lastRenewalObject.id;
        // dataUrl = url + "&count=" + count + "&after=t3_" + lastID;
        // count += 100;
        lastRenewalObject = response[response.length - 1];
        let count = 100;
        let lastTime = lastRenewalObject.created_utc;
        dataUrl = url + "&before=" + lastTime;
        count += 100;
      } while (response.length > 20);
    } catch (error) {
      return allResponses;
    }
  };

  //api endpoint https://old.reddit.com/r/Passports/search/.json?sort=new&restrict_sr=on&q=timeline&limit=100

  Promise.all([
    await getSubmission("https://api.pushshift.io/reddit/search/submission/?q=timeline&subreddit=passports&limit=100&sort=desc"),
  ]);
  return allResponses;
}

export default requestData;
