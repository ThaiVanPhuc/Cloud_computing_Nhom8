const New = require("../models/news");

class NewController {
  // [GET]  /api/news
  async getNews(req, res) {
    try {
      const pageParams = req.query.page;
      const limit = parseInt(req.query.limit) || 10;
      if (pageParams === "all") {
        const news = await New.find();
        return res.json({
          currentPage: "all",
          totalNews: news.length,
          news: news,
        });
      } else {
        const page = parseInt(pageParams) || 1;
        const skip = (page - 1) * limit;
        const total = await New.countDocuments();
        const news = await New.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        res.json({
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalNews: total,
          news: news,
        });
      }
    } catch (error) {
      console.error("Server error while getting news", error);
      res.status(500).json({ message: "Server error while getting news" });
    }
  }

  // [GET]  /api/news/:id
  async getNewById(req, res) {
    try {
      const newbyid = await New.findById(req.params.id);
      if (!newbyid) {
        return res.status(404).json({ message: "New not found" });
      }
      res.status(200).json(newbyid);
    } catch (error) {
      console.error("Server error while getting new by id", error);
      res.status(500).json({ message: "Server error while getting new by id" });
    }
  }

  // [POST]   /api/news
  async addNew(req, res) {
    try {
      const { title, content } = req.body;
      const imgStory = req.file ? `/uploads/${req.file.filename}` : "";
      const newStory = new New({
        title,
        content,
        imgStory,
      });
      await newStory.save();
      res.status(200).json({ message: "News Created successfully", newStory });
    } catch (error) {
      console.error("Server error while adding news", error);
      res.status(500).json("Server error whlie adding news");
    }
  }

  // [Delete]  /api/news/:id
  async deleteNew(req, res) {
    try {
      const newStory = await New.findByIdAndDelete(req.params.id);
      if (!newStory) {
        return res.status(404).json("New not found");
      }
      res.status(200).json("New deleted successfully", newStory);
    } catch (error) {
      console.error("Server error while deleting new", error);
      res.json("Server error while deleting new");
    }
  }

  // [PATCH]  /api/news/:id
  async updateNew(req, res) {
    try {
      const { title, content } = req.body;
      const updateData = {
        title,
        content,
      };

      if (req.file) {
        updateData.imgStory = `/uploads/${req.file.filename}`;
      }

      const updatedNew = await New.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedNew) {
        return res.status(404).json({ message: "New not found" });
      }

      res
        .status(200)
        .json({ message: "Updated news successfully", updatedNew });
    } catch (error) {
      console.error("Server error while updating new", error);
      res.status(500).json({ message: "Server error while updating new" });
    }
  }
}

module.exports = new NewController();
