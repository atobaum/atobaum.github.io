import { Link } from "gatsby";
import React from "react";
import formatDate from "../../lib/formatDate";
import PostTags from "../PostTags/PostTags";

export default function PostPreview({ post }) {
  const { date, excerpt, path, tags, timeToRead, title } = post;
  return (
    <Link to={`/post${path}`} className="post-preview">
      <header className="post-preview__header">
        <h2>{title}</h2>
        <div>
          <time dateTime={date}>{formatDate(date)}</time>
          <div>{timeToRead}분 걸려요</div>
        </div>
      </header>
      <section>{excerpt}</section>
      <footer>
        <PostTags tags={tags} />
      </footer>
    </Link>
  );
}
