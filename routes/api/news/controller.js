const {News} = require("./../../../models/News");

module.exports.getNews=(req,res,next)=>{
    News.find()
        .then(news=>res.status(200).json(news))
        .catch(err=>res.status(500).json(err))
}

module.exports.createNews=(req,res,next)=>{
    const {title,author,content,date,image} = req.body;
    const newNews = new News({
        title,
        author,
        content,
        date,
        image
    })
     newNews.save()
        .then(news=>res.status(200).json(news))
        .catch(err=>res.status(501).json(err))
}

module.exports.deleteNewsById=(req,res,next)=>{
    const {id}= req.params;
    News.deleteOne({_id:id})
        .then(()=>res.status(200).json({
            message:"News is deleted successfully"
        }))
        .catch(err=>res.status(500).json(err))
}

module.exports.updateNewsById=(req,res,next)=>{
    const {id} = req.params;
    const {author,title,content,date} = req.body;
    console.log(req.body)

    News.findById({_id:id})
        .then(news=>{
           if(author)   news.author = author;
           if(title)    news.title = title;
           if(content)   news.content = content;
           if(date)    news.date = date

           return news.save()
        })
        .then(news=>res.status(200).json(news))
        .catch(err=>res.status(500).json(err))
}