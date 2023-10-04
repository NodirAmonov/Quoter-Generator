const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];
// Show New Quote
function newQuote() {
  loading();
  // Pick a Random Quote
  const Quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if author unknown
  if (!Quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = Quote.author;
  }
  quoteText.textContent = Quote.text;
  complete();
}
// get Quotes from api

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //error catch
  }
}

//Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listner

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
