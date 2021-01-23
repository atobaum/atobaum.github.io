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

export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const post = data.blogPost;
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
      <SEO postPath={slug} postNode={post} postSEO />
      <div className="post-container">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <PostTags tags={post.tags} />
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: post.parent.html }} />
        <UserInfo config={config} />
        {/* <Disqus postNode={post} /> */}
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      latex
      parent {
        internal {
          content
          description
          ignoreType
          mediaType
        }
        ... on MarkdownRemark {
          html
        }
      }
      slug
      tags
      title
      excerpt
      date
    }
  }
`;
