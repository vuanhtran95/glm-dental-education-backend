// Load the /posts routes
app.use('/posts', posts);

// Get a list of 50 posts
router.get('/', async (req, res) => {
  let collection = await db.collection('posts');
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});
