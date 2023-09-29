const express = require('express')
const app = express()
const axios = require('axios')

const cache = require('./NodeCache')
 
app.get('/data',cache(300),async(req,res) =>{
    try{
    const resp = await axios.get('https://jsonmock.hackerrank.com/api/tvseries')

    //console.log(resp.data)
     res.json(resp.data)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }

    
})
  




app.listen(4000,(req,res)=>{
    console.log("port is running")
})


// const express = require('express');
// const axios = require('axios');
// const app = express();
// app.use(express.json());
// const cache = require('./NodeCache'); // Pass the cache duration as a parameter

// app.get('/data', cache(300), async (req, res) => {
//     try {
//         const start = Date.now();
//         const result = await axios.get("https://jsonplaceholder.typicode.com/comments");
//         const end = Date.now();
//         console.log(end - start);
//         res.json(result.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching data' });
//     }
// });

// const PORT = 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));