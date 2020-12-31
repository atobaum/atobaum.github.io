import React from "react";
import PostPreview from "./PostPreview";
import "./PostListing.css";

function PostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.frontmatter.summary || postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
    });
  });

  return (
    <ul className="post-listing">
      {
        /* Your post list here. */
        postList.map((post) => (
          <li key={post.title}>
            <PostPreview post={post} />
          </li>
        ))
      }
    </ul>
  );
}

export default PostListing;
