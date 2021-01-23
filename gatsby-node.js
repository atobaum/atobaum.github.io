/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

const MD = "MD";
const CONTENTFUL = "CONTENTFUL";

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
    console.log(node);
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
            tags
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
  // const contentfulPostPage = path.resolve("src/templates/post-contentful.jsx");

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
        nexttitle: nextNode.title,
        nextslug: nextNode.slug,
        prevtitle: prevNode.title,
        prevslug: prevNode.slug,
      },
    });
  });

  return { tagSet };
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark" && node.frontmatter.title) {
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
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const tagPage = path.resolve("src/templates/tag.jsx");
  // const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");

  // const categorySet = new Set();

  // const postsNodes = [...(await getMdNodes(graphql)), ...(await getContentfulNodes(graphql))];
  const postsNodes = [...(await getMdNodes(graphql))];

  // Sort posts
  postsNodes.sort((postA, postB) => {
    const dateA = moment(postA.date, siteConfig.dateFromFormat);
    const dateB = moment(postB.date, siteConfig.dateFromFormat);

    // if (dateA.isBefore(dateB)) retur 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(postsNodes.length / postsPerPage);

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
      component: listingPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1,
        posts: postsNodes.slice(
          pageNum * postsPerPage,
          (pageNum + 1) * postsPerPage
        ),
      },
    });
  });

  const { tagSet } = createPostPages(postsNodes, actions);

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  // categorySet.forEach((category) => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}/`,
  //     component: categoryPage,
  //     context: { category },
  //   });
  // });
};
