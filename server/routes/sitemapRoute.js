// routes/sitemap.route.js
import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import SubCategoryModel from "../models/SubCategoryModel.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");

  const sitemap = new SitemapStream({
    hostname: "https://othiyil.com",
  });

  // Static pages
  sitemap.write({ url: "/", changefreq: "daily", priority: 1 });
  sitemap.write({ url: "/about", changefreq: "weekly", priority: 0.9 });
  sitemap.write({ url: "/contact", changefreq: "monthly", priority: 0.7 });
  sitemap.write({ url: "/all-products", changefreq: "monthly", priority: 0.7 });

  // Dynamic category pages
  const categories = await SubCategoryModel.find({}, "slug updatedAt");
  categories.forEach((category) => {
    sitemap.write({
      url: `/category/${category.slug}`,
      changefreq: "weekly",
      lastmod: category.updatedAt,
      priority: 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  res.send(xml);
});

export default router;
