
const Nodecache = require('node-cache');

const cache = new Nodecache();

module.exports = (duration) => (req,res,next) =>{ 
  
         if(req.method != 'GET')
         {
            console.error('cannot cache for other methods than GET method');
            return next();
         }

         const key = req.originalUrl;
         const cache_res = cache.get(key)
         // If exists send cache result
          if(cache_res)
          {
            console.log('cache is hitted '+key)
            res.send(cache_res)
          }
          else{
            console.log('cache is missing '+key)

//                res.OriginalSend = res.send
//                res.send = body =>{
//                    res.OriginalSend(body)
//                    cache.set(key,body,duration)
//                }

res.originalJson = res.json;
res.json = (body) => {
    cache.set(key, body, duration);
    res.originalJson(body);
};
               next();

          }
}

// nodecache.js
// const NodeCache = require('node-cache');
// const cache = new NodeCache();

// module.exports = (duration) => (req, res, next) => {
//     const key = req.originalUrl;
//     const cachedData = cache.get(key);

//     if (cachedData) {
//         console.log('Cache hit for ' + key);
//         res.json(cachedData);
//     } else {
//         console.log('Cache miss for ' + key);
//         console.log('Fetching data and storing it in the cache');
        
//         // Override res.json to cache the response
//         res.originalJson = res.json;
//         res.json = (body) => {
//             cache.set(key, body, duration);
//             res.originalJson(body);
//         };

//         // Continue processing the request
//         next();
//     }
// };
