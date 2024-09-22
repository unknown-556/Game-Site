import News from '../models/newsModel.js'

export const addNews = async (req,res) => {
    try {
        const { title, content, image } = req.body;

        let imageUrl = "";
            if (image) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    resource_type: 'auto',
                });
                imageUrl = uploadResponse.secure_url;
            }

        const news = new News ({
            image: imageUrl,
            title, 
            content
        }) ;   

        await news.save()
        return res.status(201).send(news);    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server Error" }); 
    }
}

export const getAll = async (req,res) => {
    try {
        const news = await News.find().sort({  createdAt: -1 });
        if(!news){
            res.status(400).json ({message:'No News found in database'})
        }else {
            console.log({message:'news found successfully',news})
            return res.json({news})
        }
    } catch (error) {
        console.error ('Error while getting all News')
        res.status(500).json({message:error.message})
        console.error(error);
    }
}

export const getSingle = async (req,res) => {
    try {
        const Id = req.params.id
        const news = await News.findbyId(Id)
        if(!news){
            res.status(400).json ({message:'News not found in database'})
        }else {
            console.log({message:'news found successfully',news})
            return res.json({news})
        }
    } catch (error) {
        console.error ('Error while getting news')
        res.status(500).json({message:error.message})
        console.error(error);
    }
}