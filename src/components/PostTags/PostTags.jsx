import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import "./PostTags.css";

function PostTags({ tags }) {
  return (
    <div className="post-tag-container">
      {tags &&
        tags.map((tag) => (
          <Link
            key={tag}
            style={{ textDecoration: "none" }}
            to={`/tags/${_.kebabCase(tag)}`}
          >
            <span className="tag">{tag}</span>
          </Link>
        ))}
    </div>
  );
}

export default PostTags;
