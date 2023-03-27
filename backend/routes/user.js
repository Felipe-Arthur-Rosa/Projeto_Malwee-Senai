const Joi = require("joi");
const md5 = require("../utils/md5-pass");
const knl = require("../knl");
const securityConsts = require("../consts/security-consts");
const { Op } = require("sequelize");


knl.post('user_client', async(req, resp) => {
  const schema = Joi.object({
      name : Joi.string().min(1).max(100).required(),
      username : Joi.string().min(1).max(100).required(),
      password : Joi.string().min(6).max(16).required(),
      cpassword : Joi.string().min(6).max(16).required(),
  })

  knl.validate(req.body, schema);

  const result = await knl.sequelize().models.Usuario.findAll({
      where : {
          username : req.body.username
      }
  });

  knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  knl.createException('0007', '', req.body.password != req.body.cpassword);

  const user = knl.sequelize().models.Usuario.build({
      name : req.body.name,
      username : req.body.username,
      password : md5(req.body.password),
      rules : 4,
      status   : 1
  });

  await user.save();
  resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.post('user', async(req, resp) => {
  const schema = Joi.object({
      name : Joi.string().min(1).max(100).required(),
      username : Joi.string().min(1).max(100).required(),
      password : Joi.string().min(6).max(16).required(),
      cpassword : Joi.string().min(6).max(16).required(),
      rules : Joi.number().required(),
  })

  knl.validate(req.body, schema);

  const result = await knl.sequelize().models.Usuario.findAll({
      where : {
          username : req.body.username
      }
  });

  knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  knl.createException('0007', '', req.body.password != req.body.cpassword);

  const user = knl.sequelize().models.Usuario.build({
      name : req.body.name,
      username : req.body.username,
      password : md5(req.body.password),
      rules : req.body.rules,
      status   : 1
  });

  await user.save();
  resp.end();
}, )


knl.get("user", async (req, resp) => {
  const result = await knl.sequelize().models.Usuario.findAll({
    where: {
      status: 1,
    },
  });
  resp.send(result);
  resp.end();
});

knl.get("usersearch/:username", async (req, resp) => {
  const query = `%${req.params.username}%`;

  const result = await knl.sequelize().models.Usuario.findAll({
    where: { name: { [Op.like]: query }, status: 1 },
  });

  resp.json(result);
});

knl.patch("user", async (req, resp) => {
  if (req.body.status == 1) {
    await knl.sequelize().models.Usuario.update(
      {
        status: "1",
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    resp.send("Ativado");
  } else {
    await knl.sequelize().models.Usuario.update(
      {
        status: "0",
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    resp.send("Desativado");
  }
});

knl.put("user", async (req, resp) => {
  const result = await knl.sequelize().models.Usuario.update(
    {
      name: req.body.name,
      username: req.body.username,
      password: md5(req.body.password),
      roles: req.body.roles,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  resp.send(result);
});
