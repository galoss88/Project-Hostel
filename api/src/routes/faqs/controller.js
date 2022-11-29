const { Faq } = require('../../db')

async function postFaq(req, res) {
      try {
        const {question, anwser} = req.body;
        if(!question && !anwser)  res.json({menssage: "quiestion or onwser empty"})  
        const faq = await Faq.findOne({where:{question: question}});
        if (!faq) {
                let newFaq = await Faq.create({
                    question,
                    anwser
                })
                res.status(201).json(newFaq)
        }else{
         res.status(400).json({menssage: "the question already exists"})
        }
      } catch (error) {
       res.status(400).json({error: error + ""})
    }
}


async function getFaq(req, res) {
    try {
       const faq = await Faq.findAll();
       if (faq) {
          res.status(200).json(faq)
       }else{
           res.status(404).json({menssage: "empty faqs"})
       }
    } catch (error) {
        res.status(400).json({error: error + ""})
    }
}

// async function updateFaq(req, res) {
//      const  {id} = req.query;
//      const {question, anwser} = req.body;
//      try {
//         const faq = await Faq.findOne({where: {id: id}});
//         await faq.update({
//           question,
//           anwser
//        });
//         await faq.save();
//         res.send(faq)

//      } catch (error) {
//         res.status(400).json({error: error + ""})
//      } 
// }


async function deleteFaq(req, res) {
        const { id } = req.query;
         try {
           await Faq.destroy({where: {id}});
          res.send(`eliminado correctamente`);                     
         } catch (error) {
            res.status(400).json({data: error + ""})
         }
}



module.exports =  {
    postFaq,
    getFaq,
    deleteFaq,

};