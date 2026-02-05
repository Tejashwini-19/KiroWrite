let contents = []; // temporary storage

exports.createContent = (req, res) => {
  try {

    const { title, body } = req.body;

    const content = {
      id: contents.length + 1,
      userId: req.user.id,
      title,
      body
    };

    contents.push(content);

    res.json({
      message: "Content created successfully",
      content
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getMyContent = (req, res) => {

  const userContents = contents.filter(
    content => content.userId === req.user.id
  );

  res.json(userContents);
};

