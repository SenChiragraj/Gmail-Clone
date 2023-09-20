
async function getResults(route, data) {
  console.log({ ...data });
  const response = await fetch(`http://localhost:8000/auth/user/${route}`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: { "Content-Type": "application/json" },
  });

  const resp = await response.json();
  console.log(resp);
  return JSON.stringify(resp);
}

async function getMails(token, keyword) {
  // console.log(keyword);
  // const { userInfo } = await UserState(); // Access context here
  const response = await fetch(`http://localhost:8000/mails/${keyword}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp);
  return resp;
}

export { getResults, getMails };
