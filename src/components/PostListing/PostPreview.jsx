import { Link } from "gatsby";
import React from "react";
import formatDate from "../../lib/formatDate";
import PostTags from "../PostTags/PostTags";

export default function PostPreview({ post }) {
  const { date, excerpt, tags, timeToRead, title, slug } = post;
  return (
    <Link to={`/post${slug}`} className="post-preview">
      <header className="post-preview__header">
        <h2>{title}</h2>
      </header>
      <section>{excerpt}</section>
      <footer>
        <time dateTime={date}>{formatDate(date)}</time>
        <PostTags tags={tags} />
      </footer>
    </Link>
  );
}
