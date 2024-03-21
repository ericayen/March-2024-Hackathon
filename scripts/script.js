// NASA IMAGE API :

const NASA_BASE_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "aZ9BoMcIqdlgcFezOn1bivrBXGxEJAdhC9SsvhJV";

const container = document.querySelector(".container__content");
const imgSrc = document.querySelector(".container__img");

const getImage = async () => {
  try {
    const getImg = await axios.get(`${NASA_BASE_URL}?api_key=${API_KEY}`);

    const imgUrl = getImg.data["url"];
    const imgAlt = getImg.data["title"];
    const imgSrc = document.querySelector(".container__img");
    imgSrc.setAttribute("src", imgUrl);
    imgSrc.setAttribute("alt", imgAlt);

    const desc = getImg.data["explanation"];
    const newDiv = document.createElement("div");
    newDiv.classList.add("container__description");
    newDiv.textContent = `Title: ${imgAlt}. ${desc}`;
    container.appendChild(newDiv);

    const imgDescription = document.querySelector(".container__description");

    imgSrc.addEventListener("mouseenter", () => {
      imgDescription.classList.add("container__description--hover");
    });
    imgSrc.addEventListener("mouseleave", () => {
      imgDescription.classList.remove("container__description--hover");
    });
  } catch (error) {
    console.error("Unable to get image :(", error.message);
  }
};

getImage();

// RANDOM ADVICE API :

const ADVICE_BASE_URL = "https://api.adviceslip.com/advice";

const adviceFunction = async () => {
  try {
    const adviceResponse = await axios.get(ADVICE_BASE_URL);
    populateAdvice(adviceResponse.data.slip.advice);
  } catch (err) {
    console.error("No response from the API", err);
  }
};
adviceFunction();

const populateAdvice = (advice) => {
  const adviceElement = document.querySelector(".container__advice");
  adviceElement.textContent = advice;
};

// Refresh Button
const button = document.querySelector(".container__button");
button.addEventListener("click", adviceFunction);
