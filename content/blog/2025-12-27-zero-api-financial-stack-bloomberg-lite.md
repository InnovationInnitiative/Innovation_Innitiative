---
title: >-
  The "Zero-API" Financial Stack: Building a Bloomberg-Lite without the $24k
  Price Tag
date: '2025-12-27T18:30:00.000Z'
author: Avigyan Das
category: Financial Analysis
excerpt: >-
  The whole financial world is based on one very important thing that is free
  and fair news. We aimed to provide our users with authentic financial news
  without the $24k Bloomberg API cost by using advanced scraping and Google News
  RSS.
---
#### abstract:

The whole financial world is based on one very important thing that is free and fair news we aimed to provide our  users with news all cross domains sectors each and everything that affect the financial market and the stocks directly but getting a  source of this news was a problem the most prominent source of news the **Bloomberg api** has a huge cost thats **$24k** an impossible amount to invest as a small student research group who are just trying to get into developing new and innovative web app. The solve was rather interesting we used scraping along with **google news RSS** that too was noisy so we custom made a strict query to get each and every detailed relevant news.



#### body:





###### The Problem:

Innovation initiative is a student group of 5 engineering students in 3rd year we specialize in AI\&ML we wanted to make a smart web app low cost but that really works on authentic data so we figured out making a stock news sentiment analysis app was our best bet we set out to make the app from scratch without prior knowledge of how to make it what kind of dashboard to use even what to do to start our project we endured and made the dashboard a ui we were happy about now came the challenge we had  a nice dashboard a working sentiment meter that we tested on manually added dummy news but we didn't have the main key ingredient the real time authentic news. Through research a bit of help from google  and other sources here and there we found out the best source is the Bloomberg api that's the biggest source of the news but that's when we realized that every good thing has a equally high cost the cost of api $24000

after this we felt that the feat of adding Realtime news is out of question we even though of creating section where we manually add news everyday but all this failed as its not humanly possible to maintain news of whole world.





 

###### The Solution:

The solution we got was closely related to one of out 2nd year project where we directly scraped data from the webpage and use the information so we implemented that data scraping we scraped data directly from the xml of webpage we also applied advanced rss query to stop the noisy bad news that are irrelevant now we had the perfect news source that we could freely use to get the market or a specific stock's vibe score.



The news was good but still it was lacking it needed to be refined more so we applied the rss query properly into the news fetch 

below given is the rss query we used to get proper news that's usable:



```typescript

function getSearchUrl(query: string, days: string, strict: boolean) {

   const encodedQuery = encodeURIComponent(query);

   const timeFilter = `when:${days}`; // e.g., '7d' for 7 days

   

   // In strict mode, we force financial context

   if (strict) {

      return `https://news.google.com/rss/search?q=${encodedQuery}+stock+finance+${timeFilter}\&hl=en-IN`;

   }

   return `https://news.google.com/rss/search?q=${encodedQuery}...`;

}

```

in the code block that we have added we can see that we forced the use of keywords like "stock", "finance", etc. and then we used 'when:' operator using this we have filtered out 90% of nonrelevant noisy news even if a very fer noisy news are left the vibe score algorithm isn't affected by those as we have added more keyword filters to stop the excess or wrongly scoring the news 



##### Conclusion:

The web scraping along with the rss query is a simple yet very useful tool for small developers and student researchers who cant afford costly api we successfully implemented it in an working webapp that is very accurate and useful we aim to make improvements to this 

stay tuned to our blogs as we aim to provide further details about both our own projects, researches as well as topics that are related neural network and our field of study
