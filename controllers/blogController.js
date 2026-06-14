import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
};

export const getBlogs = async (req, res) => {
  const filter = req.query.all === "true" ? {} : { status: "published" };
  const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });

  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Blog deleted" });
};
