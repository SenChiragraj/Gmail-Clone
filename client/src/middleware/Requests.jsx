
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

export const sendUserMail = async (token, mailInfo) => {
  try {
    const resp = await fetch("http://localhost:8000/mail/user/new", {
    method : 'POST',
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body : JSON.stringify({...mailInfo})
    }).then((resp) => resp.json());
    return resp.success;
  } catch (error) {
    return error;
  }
}

export const getMailsFormUser = async (token, keyword) => {
  try {
   const response = await fetch(
     `http://localhost:8000/mail/user/inbox`,
     {
       headers: {
         Authorization: "Bearer " + token,
         "Content-Type": "application/json",
       },
     }
   ).then((response) => response.json());
   console.log(response.mails.mails);
   return response.mails.mails;
  } catch (error) {
    return error;
  }
}

export const changeMailType = async (token, type, id) => {
  console.log(token, type, id);
  try {
    const response = await fetch(
      `http://localhost:8000/mail/user/${type}/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }), // Create an object with id property
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData.success;
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false or handle the error as needed
  }
};


export { getResults, getMails };
