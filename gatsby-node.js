/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
const crypto = require("crypto");

const MD = "MD";
const CONTENTFUL = "CONTENTFUL";

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField, createNode, createParentChildLink } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    if (node.frontmatter.title) {
      const fileNode = getNode(node.parent);
      const parsedFilePath = path.parse(fileNode.relativePath);
      if (
        Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
      ) {
        slug = `/${_.kebabCase(node.frontmatter.title)}`;
      } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
      } else if (parsedFilePath.dir === "") {
        slug = `/${parsedFilePath.name}/`;
      } else {
        slug = `/${parsedFilePath.dir}/`;
      }

      if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
        if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
          slug = `/${_.kebabCase(node.frontmatter.slug)}`;
        if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
          const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
          if (!date.isValid)
            console.warn(`WARNING: Invalid date.`, node.frontmatter);

          createNodeField({ node, name: "date", value: date.toISOString() });
        }
      }
      createNodeField({ node, name: "slug", value: slug });

      const data = {
        title: node.frontmatter.title,
        tags: node.frontmatter.tags,
        excerpt: node.frontmatter.summary || "",
        latex: node.frontmatter.latex,
        date: node.frontmatter.date,
        slug,
      };

      const blogPostNode = {
        ...data,
        id: node.id + "blogpost",
        parent: node.id,
        internal: {
          type: "BlogPost",
          contentDigest: crypto
            .createHash("md5")
            .update(JSON.stringify(data))
            .digest("hex"),
        },
      };
      createNode(blogPostNode);
      createParentChildLink({ parent: node, child: blogPostNode });
      return;
    }

    const parentNode = getNode(node.parent);
    if (parentNode.internal.type === "contentfulBlogPostContentTextNode") {
      const contentfulNode = getNode(parentNode.parent);
      const data = {
        title: contentfulNode.title,
        tags: contentfulNode.tags,
        excerpt: contentfulNode.summary || "",
        latex: !!contentfulNode.latex,
        date: contentfulNode.createdAt,
        slug: "/" + contentfulNode.slug,
      };

      const blogPostNode = {
        ...data,
        id: node.id + "blogpost",
        parent: node.id,
        internal: {
          type: "BlogPost",
          contentDigest: crypto
            .createHash("md5")
            .update(JSON.stringify(data))
            .digest("hex"),
        },
      };
      createNode(blogPostNode);
      createParentChildLink({ parent: node, child: blogPostNode });

      return;
    }
  }
};

/**
 * needs title, slug, tags, excerpt, timeToRead, createdAt(date) to create page
 */
async function getMdNodes(graphql) {
  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { title: { ne: "" } } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              date
            }
          }
        }
      }
    }
  `);

  function mapFromMd({ node }) {
    return {
      source: MD,
      title: node.frontmatter.title,
      slug: node.fields.slug,
      tags: node.frontmatter.tags,
      excerpt: "",
      timeToRead: 0,
      date: node.frontmatter.date,
    };
  }

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const nodes = markdownQueryResult.data.allMarkdownRemark.edges.map(mapFromMd);

  return nodes;
}

async function getContentfulNodes(graphql) {
  const contentfulBlogPostResult = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            contentful_id
            slug
            tagblogPostNodes
            content {
              childMarkdownRemark {
                excerpt
                timeToRead
              }
            }
            title
            createdAt
          }
        }
      }
    }
  `);

  function mapFromContentful({ node }) {
    return {
      contentful_id: node.contentful_id,
      source: CONTENTFUL,
      title: node.title,
      slug: "/" + node.slug,
      tags: node.tags,
      excerpt: node.content.childMarkdownRemark.excerpt,
      timeToRead: node.content.childMarkdownRemark.timeToRead,
      date: node.createdAt,
    };
  }

  if (contentfulBlogPostResult.errors) {
    console.error(contentfulBlogPostResult.errors);
    throw contentfulBlogPostResult.errors;
  }
  const nodes = contentfulBlogPostResult.data.allContentfulBlogPost.edges.map(
    mapFromContentful
  );

  return nodes;
}

function createPostPages(nodes, actions) {
  const { createPage } = actions;
  const mdPostPage = path.resolve("src/templates/post-md.jsx");
  const contentfulPostPage = path.resolve("src/templates/post-contentful.jsx");

  const tagSet = new Set();

  nodes.forEach((node, index) => {
    // Generate a list of tags
    if (node.tags) {
      node.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    // if (node.frontmatter.category) {
    //   categorySet.add(node.frontmatter.category);
    // }

    // Create post pages
    const nextID = index + 1 < nodes.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : nodes.length - 1;
    const nextNode = nodes[nextID];
    const prevNode = nodes[prevID];

    createPage({
      path: `/post${node.slug}`,
      component: node.source === MD ? mdPostPage : contentfulPostPage,
      context: {
        slug: node.slug,
        contentful_id: node.contentful_id,
        nexttitle: nextNode.title,
        nextslug: nextNode.slug,
        prevtitle: prevNode.title,
        prevslug: prevNode.slug,
      },
    });
  });

  return { tagSet };
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const tagPage = path.resolve("src/templates/tag.jsx");
  // const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");

  const tagSet = new Set();
  // const categorySet = new Set();

  const blogPostQueryResult = await graphql(`
    query BlogPosts {
      allBlogPost {
        edges {
          node {
            title
            tags
            slug
            date
          }
        }
      }
    }
  `);

  if (blogPostQueryResult.errors) {
    console.error(blogPostQueryResult.errors);
    throw blogPostQueryResult.errors;
  }

  const blogPostNodes = blogPostQueryResult.data.allBlogPost.edges.map(
    (edge) => edge.node
  );

  // Sort posts
  blogPostNodes.sort((postA, postB) => {
    const dateA = moment(postA.date, siteConfig.dateFromFormat);
    const dateB = moment(postB.date, siteConfig.dateFromFormat);

    // if (dateA.isBefore(dateB)) retur 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(blogPostNodes.length / postsPerPage);

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
      component: listingPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1,
        posts: blogPostNodes.slice(
          pageNum * postsPerPage,
          (pageNum + 1) * postsPerPage
        ),
      },
    });
  });

  const postPage = path.resolve("src/templates/post.jsx");

  blogPostNodes.forEach((node, index) => {
    // Generate a list of tags
    if (node.tags) {
      node.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Create post pages
    const nextID = index + 1 < blogPostNodes.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : blogPostNodes.length - 1;
    const nextNode = blogPostNodes[nextID];
    const prevNode = blogPostNodes[prevID];

    createPage({
      path: `/post${node.slug}`,
      component: postPage,
      context: {
        slug: node.slug,
        contentful_id: node.contentful_id,
        nexttitle: nextNode.title,
        nextslug: nextNode.slug,
        prevtitle: prevNode.title,
        prevslug: prevNode.slug,
      },
    });
  });

  //  Create tag pages
  // tagSet.forEach((tag) => {
  //   createPage({
  //     path: `/tags/${_.kebabCase(tag)}/`,
  //     component: tagPage,
  //     context: { tag },
  //   });
  // });

  // Create category pages
  // categorySet.forEach((category) => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}/`,
  //     component: categoryPage,
  //     context: { category },
  //   });
  // });
};
