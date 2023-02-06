const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");
const adress = require('../models/adress');
const { object } = require('joi');
const moment = require('moment');

knl.post('order', async(req, resp) => {
    const schema = Joi.object({
        fkclient   : Joi.number().integer().required(),
        DTemission : Joi.string().min(1).max(100).required(),
        DTdelivery : Joi.string().min(1).max(100).required(),
        fkadress   : Joi.number().integer().required(),
        total      : Joi.number().required(),
        ProdOrder : Joi.array().items(Joi.object({
            fkproduct   : Joi.number().integer().required(),
            amount      : Joi.number().required(),
            UNITvalue   : Joi.number().required(),
            descont     : Joi.number().allow(0),
            addition    : Joi.number().allow(0),
            total       : Joi.number().required()
        }))
    });

    knl.validate(req.body, schema);

    req.body.DTemission = moment(req.body.DTemission, 'DD/MM/YYYY').toDate();
    req.body.DTdelivery = moment(req.body.DTdelivery, 'DD/MM/YYYY').toDate();    

    // Salvar a tabela de cliente
    //------------------------------------------------------------------------------------------------
    const order = knl.sequelize().models.Order.build({
        fkclient     : req.body.fkclient,
        DTemission   : req.body.DTemission,
        DTdelivery   : req.body.DTdelivery,
        fkadress     : req.body.fkadress,
        total        : req.body.total,
        status       : 1
    });
    await order.save();
    const result = {id : order.id};
    //------------------------------------------------------------------------------------------------

    // Se não tem endereços vazamos
    //------------------------------------------------------------------------------------------------    
    if (knl.objects.isEmptyArray(req.body.ProdOrder)){
        resp.json(result);
        return;
    }
    //------------------------------------------------------------------------------------------------  
    
    // Agora vamos salvar os endereços
    //------------------------------------------------------------------------------------------------      
    for (const prod of req.body.ProdOrder){
        const record = knl.sequelize().models.ProdOrder.build({
            fkorder     : order.id,
            fkproduct   : prod.fkproduct,
            amount      : prod.amount,
            UNITvalue   : prod.UNITvalue,
            descont     : prod.descont,
            addition    : prod.addition,
            total       : prod.total,
            status     : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.json(result);
});

knl.put('order', async(req, resp) => {
    debugger
    
    
    const schema = Joi.object({
        id : Joi.number().integer(),
        fkclient   : Joi.number().integer(),
        DTemission : Joi.string().raw(),
        DTdelivery : Joi.string().raw(),
        fkadress   : Joi.number().integer(),
        total      : Joi.number(),
        ProdOrder : Joi.array().items(Joi.object({
            fkorder     : Joi.number().integer(),
            fkproduct   : Joi.number().integer(),
            amount      : Joi.number(),
            UNITvalue   : Joi.number(),
            descont     : Joi.number().allow(0),
            addition    : Joi.number().allow(0),
            total       : Joi.number()
        }))
    });

    knl.validate(req.body, schema);    

    // Deleta todos os enderecos
    //------------------------------------------------------------------------------------------------    
    await knl.sequelize().models.ProdOrder.destroy({
        where : {fkorder : req.body.id}
    });
    //------------------------------------------------------------------------------------------------    

    // Atualiza a tabela de cliente
    //------------------------------------------------------------------------------------------------
    
    await knl.sequelize().models.Order.update({
        fkclient    : req.body.fkclient,
        DTemission  : req.body.DTemission, 
        DTdelivery  : req.body.DTdelivery,
        fkadress    : req.body.fkadress,
        total       : req.body.total,
        status      : 1
    },
    {
        where : {id : req.body.id}
    });
    //------------------------------------------------------------------------------------------------

    // Se não tem endereços vazamos
    //------------------------------------------------------------------------------------------------    
    if (knl.objects.isEmptyArray(req.body.ProdOrder)){
        resp.status(200);
        resp.end();
        return;
    }
    //------------------------------------------------------------------------------------------------  
    
    // Agora vamos salvar os endereços
    //------------------------------------------------------------------------------------------------      
    for (const ProdOrderunit of req.body.ProdOrder){
        const record = knl.sequelize().models.ProdOrder.build({
            fkorder     : req.body.id,
            fkproduct   : ProdOrderunit.fkproduct,
            amount      : ProdOrderunit.amount,
            UNITvalue   : ProdOrderunit.UNITvalue,
            descont     : ProdOrderunit.descont,
            addition    : ProdOrderunit.addition,
            total       : ProdOrderunit.total,
            status : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.status(200);
    resp.end();
})

////////////

knl.get('order', async (req, resp) => {

    const orders =  knl.objects.copy(await knl.sequelize().models.Order.findAll({
        where: {
            status: 1
        }
    }));

    // DROP DE ADRESS
    if(!knl.objects.isEmptyArray(orders)){
        for(const order of orders){
            const adress = await knl.sequelize().models.Adress.findAll({
                where : {
                    id : order.fkadress
                }
            })
            if(!knl.objects.isEmptyArray(adress)){
                order.adress_street = adress[0].street
            }
            
        }
     }

     // DROP DE CLIENT
     if(!knl.objects.isEmptyArray(orders)){
        for(const order of orders){
            const client = await knl.sequelize().models.Client.findAll({
                where : {
                    id : order.fkclient
                }
            })



            if(!knl.objects.isEmptyArray(client)){
                order.client_nameFantasy = client[0].nameFantasy
                
            }
        }
     }

    resp.json(orders);
    resp.end();

});

knl.get('order/:id', async (req, resp) => {

    const customers =  knl.objects.copy(await knl.sequelize().models.Order.findAll({
        where: {
            id : req.params.id,
            status: 1
        }
    }));

    for(const customer of customers){
        const products = knl.objects.copy(await knl.sequelize().models.ProdOrder.findAll({
            where: {
                fkorder : customer.id,
                status: 1
            }
        }))

        customer.products = products;
    }

    resp.json(customers[0]);
})

knl.patch('order', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Order.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
        await knl.sequelize().models.Order.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
       
});

knl.get("ordersearch/:fkclient", async (req, resp) => {
    const query = `%${req.params.fkclient}%`; 

    const result = await knl.sequelize().models.Order.findAll({
      where: { Order: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})

