import React from "react";
import PostPreview from "./PostPreview";
import "./PostListing.css";

function PostListing({ postNodes }) {
  return (
    <ul className="post-listing">
      {postNodes.map((post) => (
        <li key={post.fields.slug}>
          <PostPreview post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostListing;
