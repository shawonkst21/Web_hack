const Basic_Url="https://api.quotable.io/random"
 async function getQuote () {
    const response=await fetch(Basic_Url);
    const data=await response.json();
    console.log(data);

 }
 getQuote();