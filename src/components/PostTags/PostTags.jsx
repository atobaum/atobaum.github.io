import React from "react";
import _ from "lodash";
import { Link as span } from "gatsby";
import "./PostTags.css";

function PostTags({ tags }) {
  return (
    <div className="post-tag-container">
      {tags &&
        tags.map((tag) => (
          <span
            key={tag}
            style={{ textDecoration: "none" }}
            to={`/tags/${_.kebabCase(tag)}`}
          >
            <span className="tag">{tag}</span>
          </span>
        ))}
    </div>
  );
}

export default PostTags;
