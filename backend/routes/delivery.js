const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");
const securityConsts = require("../consts/security-consts");

knl.post('delivery', async (req, resp) => {
    const schema = Joi.object({
        price: Joi.number().required(),
        fkProduct: Joi.number().min(1).required(),
        porcent: Joi.number().required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.delivery.findAll({
        where: {
            price: req.body.price,
            status: 1,
            fkProduct : req.body.fkProduct,
            porcent : req.body.porcent
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const description = knl.sequelize().models.delivery.build({
        price: req.body.price,
        status: 1,
        fkProduct : req.body.fkProduct,
        porcent : req.body.porcent
    });

    await description.save();
    resp.end();
}, )

knl.get('delivery', async (req, resp) => {
    const result = await knl.sequelize().models.delivery.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.put('delivery', async (req, resp) => {
    const result = await knl.sequelize().models.delivery.update({
        price: req.body.price,
        fkProduct : req.body.fkProduct,
        porcent : req.body.porcent
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})


knl.patch('delivery', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.delivery.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
         await knl.sequelize().models.delivery.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
       
});

knl.get("deliverysearch/:deliveryid", async (req, resp) => {
    const query = `%${req.params.deliveryid}%`; 

    const result = await knl.sequelize().models.delivery.findAll({
      where: { id: { [Op.like]: query },
      status : 1 }
    });

    resp.json(result);
})