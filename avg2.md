# The Proxy Cascade





### Abstract



while making the finsense webapp we used a free zero api solution where we didn't use any costly api to fetch news rather we fetched news directly from the frontend but this had a major issue that this heavy frontend fetching is usually blocked so we need proxy but most proxy that's fast are still unreliable and get blocked and those are reliable are slow  we solved it in an interesting way without compromising anything 





### Body



We made the finsense web app with out any costly api like the Bloomberg as they are very costly something we cant even think about affording in the current state we solved the problem by scraping data directly from the frontend 
the process is shown in our detailed blog given [here](https://www.innovationinnitiative.in/blog/zero-api-financial-stack-bloomberg-lite) but this direct request to rss feeds is usually blocked by the browser  to solve this we implemented a **Resilient Proxy Cascade** 



we can divide this Proxy Cascade into three parts:



1. **Attempt 1: Direct fetch :** this is the fastest and our original plan but this is also the most uncertain its often blocked by the browser
2. **Attempt 2: CorsProxy.io :** this is the proxy that is used when the direct fetch fails this is also super fast and more  reliable but this is also to an extent uncertain and may fail sometimes 
3. **Attempt 3: AllOrigins :** this is the fall back ultimate final option that never fails its super reliable but the fetch is a bit slow  this is the final support that ensure news is shown no matter what but its slow



this three phase attempt structure can be compared to waterfall structure fetch is attempted at every step and if that step fail it goes to next step until last step which is like the ocean where there has to be a result 





this is mainly implemented to make sure our webapp gives the most optimum user experience user doesn't have to refresh or do any thing if one method fails it  automatically switches to next method until there is a result we deliver news and vibe score every single time. 

