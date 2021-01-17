/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

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
  const postPage = path.resolve("src/templates/post.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");
  const landingPage = path.resolve("./src/templates/landing.jsx");

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

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }
  const markdownNodes = markdownQueryResult.data.allMarkdownRemark.edges.map(
    (edge) => ({ ...edge.node, source: "file" })
  );

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
  if (contentfulBlogPostResult.errors) {
    console.error(contentfulBlogPostResult.errors);
    throw contentfulBlogPostResult.errors;
  }
  const contentfulNodes = contentfulBlogPostResult.data.allContentfulBlogPost.edges.map(
    (edge) => ({
      source: "contentful",
      fields: {
        slug: "/" + edge.node.slug,
      },
      frontmatter: {
        title: edge.node.title,
        tags: edge.node.tags,
        category: "",
        date: edge.node.createdAt,
      },
    })
  );

  const tagSet = new Set();
  const categorySet = new Set();

  const postsNodes = [...markdownNodes, ...contentfulNodes];

  // Sort posts
  postsNodes.sort((postA, postB) => {
    console.log(postB);
    const dateA = moment(postA.frontmatter.date, siteConfig.dateFromFormat);

    const dateB = moment(postB.frontmatter.date, siteConfig.dateFromFormat);

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

  // Post page creating
  postsNodes.forEach((node, index) => {
    // Generate a list of tags
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (node.frontmatter.category) {
      categorySet.add(node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsNodes.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsNodes.length - 1;
    const nextNode = postsNodes[nextID];
    const prevNode = postsNodes[prevID];

    createPage({
      path: `/post${node.fields.slug}`,
      component: postPage,
      context: {
        source: node.source,
        slug: node.fields.slug,
        contentful_slug: node.fields.slug.slice(1),
        nexttitle: nextNode.frontmatter.title,
        nextslug: nextNode.fields.slug,
        prevtitle: prevNode.frontmatter.title,
        prevslug: prevNode.fields.slug,
      },
    });
  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};
