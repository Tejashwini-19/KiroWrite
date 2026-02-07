
const pool = require("../config/db");


// CREATE CONTENT
exports.createContent = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO content (user_id, title, body) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, body]
    );

    res.status(201).json({
      message: "Content created successfully",
      content: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY CONTENT
exports.getMyContent = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM content WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE CONTENT
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE content SET title = $1, body = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, body, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Content not found or unauthorized" });
    }

    res.json({
      message: "Content updated successfully",
      content: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM content WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Content not found or unauthorized" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 🔹 Random AI-style variations
    const variations = [
      "This topic is shaping the future of technology.",
      "It has a strong impact on modern digital solutions.",
      "Understanding this helps build smarter applications.",
      "This plays a crucial role in innovation today.",
      "It is becoming increasingly important in real-world use cases."
    ];

    const randomInsight =
      variations[Math.floor(Math.random() * variations.length)];

    // 🔹 Mock AI-generated content
    const aiText = `
AI Generated Content

Prompt:
${prompt}

Insight:
${randomInsight}

Conclusion:
Exploring this topic helps individuals grow their skills and stay relevant in the tech industry.
`;

    const content = {
      id: Date.now(),
      userId: req.user.id,
      title: "AI Generated Content",
      body: aiText.trim()
    };

    res.status(200).json({
      message: "Content generated successfully",
      content
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

