const { insertNote } = require("../../repositories/notes");

const createNote = async (req, res, next) => {
  try {
    // const { id: userId } = req.auth;
    console.log(req, auth);
    
    const userId = req.auth.id; //trae el req.auth(objeto del tokenInfo).id(el id q hay dentro del objeto tokenInfo), q es el id del usuario

    const { title,
          description,
          category,} = req.body;
    
    const insertId = await insertNote({ //despues agregar image,
      title,
      description,
      category,
      userId,
    });

    res.status(201).send({
      status: "ok",
        data: {
            id: insertId,
            title,
            description,
            category,
            userId
        },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createNote;