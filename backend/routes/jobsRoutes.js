const express = require("express");
const router = express.Router();

router.get("/jobsInfo",async(req,res)=>{
    try{
        // const jobCategoryItems = db.collection('jobs_info');
        // const jobCategory = await jobCategoryItems.find().toArray();
        // global.jobCategory = jobCategory;
        // console.log(global.jobCategory);
        res.json({success:true,data:global.jobCategory});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
});
module.exports = router;