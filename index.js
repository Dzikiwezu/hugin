const baseUrl = "https://zadania.aidevs.pl";
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const getAuthToken = async () => {
  const apiKey = document.getElementById("apikeyInput").value;
  const token = document.getElementById("tokenInput").value;
  const response = await fetch(/*proxyUrl + */`${baseUrl}/token/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ apikey: apiKey })
  });

  if (!response.ok) {
    throw new Error("Błąd podczas autoryzacji.");
  }

  const data = await response.json();
  return data.token;
};

const getTask = async (token) => {
  const response = await fetch(/*proxyUrl + */`${baseUrl}/task/${token}`);
  if (!response.ok) {
    throw new Error("Błąd podczas pobierania zadania.");
  }

  const data = await response.json();
  return data;
};

const sendAnswer = async (token, answer) => {
  const response = await fetch(/*proxyUrl + */`${baseUrl}/answer/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answer })
  });

  if (!response.ok) {
    throw new Error("Błąd podczas zgłaszania odpowiedzi.");
  }

  const data = await response.json();
  return data;
};

const solveTask = async () => {
  try {
    const token = await getAuthToken();
    const taskData = await getTask(token);
    const cookie = taskData.cookie;
    const result = await sendAnswer(token, cookie);
    console.log("Wynik:", result);
    let stringResult = ``;
    for (const key in result) {
      stringResult += `${key}: ${result[key]}\n`;
    }
    document.getElementById("responseText").value = stringResult;
  } catch (error) {
    console.error("Błąd:", error.message);
  }
};

document.getElementById("sendButton").addEventListener("click", solveTask);