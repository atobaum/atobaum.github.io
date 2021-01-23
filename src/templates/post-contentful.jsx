import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.css";

function mapToMarkdownRemark(contentful) {
  return {
    html: contentful.content.childMarkdownRemark.html,
    timeToRead: contentful.content.childMarkdownRemark.timeToRead,
    excerpt: contentful.content.childMarkdownRemark.excerpt,
    frontmatter: {
      title: contentful.title,
      date: contentful.createdAt,
      tags: contentful.tags,
      // todo
      latex: false,
    },
  };
}

export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = mapToMarkdownRemark(data.contentfulBlogPost);
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  useEffect(() => {
    if (!post.latex) return;
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = `
		MathJax = {
		  tex: {
			inlineMath: [['$', '$'], ['\\(', '\\)']]
		  }
		};
    `;
    document.body.appendChild(s);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
        {post.latex && (
          <script
            id="MathJax-script"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
          />
        )}
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div className="post-container">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <PostTags tags={post.tags} />
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <UserInfo config={config} />
        <Disqus postNode={postNode} />
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     contentfulBlogPost(slug: { eq: $slug }) {
//       tags
//       title
//       createdAt
//       content {
//         childMarkdownRemark {
//           html
//           excerpt
//           timeToRead
//         }
//       }
//       slug
//     }
//   }
// `;
