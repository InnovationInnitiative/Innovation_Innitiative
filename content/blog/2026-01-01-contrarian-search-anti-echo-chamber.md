---
title: '"Contrarian Search": Engineering an Anti-Echo Chamber News Engine'
date: '2026-01-01T18:30:00.000Z'
author: Avigyan Das
category: Backend Engineering
excerpt: >-
  The whole internet is optimized for relevance and clicks but to get these
  relevance and clicks the search engines promote and prioritize positive storis
  and official press release and miss the negative stories that may have huge
  impact.
---
### Abstract:



The whole internet is optimized for relevance and clicks but  to get these relevance and clicks the search engines promote and prioritize positive storis and official press release and miss the negative  stories that may have huge impact. In our case our complete vibescore calculation gets biased towards positive news we solved that problem in our news search



### Body:



while extracting news and testing the vibe score for our finsense web app we found out a major flaw the news we were getting were mostly positive no negative or bad news were being taken by the news scraper which led to the vibe score being very high at all occasion despite there being few negative news.



what we realized was that the news we were getting was the regular news ment for  people to read wich is intentionally optimized for relevance and clicks but for finsense we needed  raw unfiltered news that was not only positive but also gave all relevant negative news. For this we implemented a solution where when a user search for a stock lets say Tata Motors we implement the **Contrarian search protocol**



#### **Contrarian Search Protocol:**



every time user search a stock like Tata Motors finsense actually tiggers two simultaneous parallel search:



1. **The Bull Search :** 'q=Tata Motors' (standard news, volume, price action)
2. **The Bear Search :** `q=Tata Motors (fraud OR scam OR investigation OR decline OR plunge OR court)`



we use JavaScript's 'Promise.all' to fire  these requests concurrently, ensuringg zero latency penalty for user. 



then comes the merge and dedupe phase



```typescript

// The "Risk Hunter" Pattern

const riskKeywords = " (fraud OR investigation OR drop OR loss OR scam)";

const [standardResults, riskResults] = await Promise.all([

 &nbsp;   fetchNews(query),

 &nbsp;   fetchNews(query + riskKeywords) // The Contrarian Query

]);

```





To merge and dedupelicate a simple url chck iss i=not enough because same story may be output of normal search and negative search but also same news may appear in multiple websites the  same blog in different url for that



we implementerd **Jaccard Similarity Index** for text based deduplication



1. Tokenize titles into sets of words.
2. Calculate Intersection over Union (IoU).
3. If Similarity > 0.6, treat as duplicate.





```typescript

function calculateSimilarity(str1, str2) {

 &nbsp;   const words1 = new Set(str1.toLowerCase().split(/\\s+/));

 &nbsp;   const words2 = new Set(str2.toLowerCase().split(/\\s+/));

 &nbsp;   // ... intersection logic ...

 &nbsp;   return overlap / union;

}

```



### Conclusion:

this system is made to ensure we dont saturate the vibescore with same news over and over again and all news are treated acording to their content we also solved the multiple source duplication so same news is not picked from yahoo and google and we have alsolutely unbiased news
