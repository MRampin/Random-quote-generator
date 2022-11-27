
const newQuote = document.querySelector('#new-quote');
const text = document.querySelector('#text');
const author = document.querySelector('#author');
const tweetQuote = document.querySelector('#tweet-quote');

const alpha = '40%'; //alpha value for rgba
//calculating a random rgb color
const rgbColor = (array) => {
  for (let i=0; i<3; i++) {
    let value = parseInt(Math.random()*50);
    array.push(value);
  }
  array.push(alpha);
}


//concatenating the rgb values in a syntactically valid variable
const rgbString = (array) => {
  let app = 'rgb('+array.join('%,')+')';
  return app;
}

const backgroundColor = () => {
  const color = [];
  rgbColor(color);
  const rgb = rgbString(color);
  $('html').css('background', rgb);
  $('.button').css('background', rgb);
}

//selecting a quote in the 'db'
const quoteSelector = () => {
  $.getJSON('https://type.fit/api/quotes', function(data){
    //selecting a random quote
    const n = parseInt(Math.random() * data.length);
    text.textContent = data[n].text;
    //in case the author is null it get replaced by Anonymous
    if (data[n].author != null){
      author.textContent = data[n].author;
    }
    else {
      author.textContent = 'Anonymous';
    }
    //tweet button
    $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?text="'+encodeURIComponent(text.textContent+'" - '+author.textContent+' https://codepen.io/mrampin/full/bGKWYpQ')+'&hashtags=quotes,freeCodeCamp');
  });
}

//calling both functions at the page load and with button call
const functions = () => {
  backgroundColor();
  quoteSelector();
}


window.addEventListener('load', functions);
newQuote.addEventListener('click', functions);
