{posts.map((post) => (
  <div key={post._id}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>

    {/* ✅ CONDITIONAL IMAGE */}
    {post.coverImage && (
      <img
        src={post.coverImage}
        alt={`Cover image for ${post.title}`}
        style={{ width: "200px" }}
      />
    )}
  </div>
))}