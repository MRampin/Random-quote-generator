$(document).ready(function() {
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
    $.getJSON('https://api.quotable.io/quotes', function(data){
    	//Get total number of pages
    	const totalPages = data.totalPages;
    	//Select a random page
    	const randomPage = parseInt(Math.random() * totalPages);
    	//Go to the selected page
    	$.getJSON(`https://api.quotable.io/quotes?page=${randomPage}`, function(pageData){
    		//get the total number of quotes in the page
    		const totalQuotes = pageData.count;
    		//Select a random quote
    		const randomQuote = parseInt(Math.random() * totalQuotes);
    		text.textContent = pageData.results[randomQuote].content;
      	//in case the author is null it get replaced by Anonymous
      	if (pageData.results[randomQuote].author != null){
        		author.textContent = pageData.results[randomQuote].author;
      	}
      	else {
        		author.textContent = 'Anonymous';
      	}
      	//tweet button
      	$('#tweet-quote').attr('href','https://twitter.com/intent/tweet?text="'+encodeURIComponent(text.textContent+'" - '+author.textContent)+'&hashtags=quotes,freeCodeCamp');
    	});
    });
  }
  
  const resizeHeight = () => {
    $('.maxHeight').css('height', window.innerHeight+'px');
  }

  //calling both functions at the page load and with button call
  const functions = () => {
    backgroundColor();
    quoteSelector();
    resizeHeight();
  }

  window.addEventListener("resize", resizeHeight);
  window.addEventListener('load', functions());
  newQuote.addEventListener('click', functions, false);
});
