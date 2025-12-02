import CategoryModel from "../models/CategoryModel.js";
import SubCategoryModel from "../models/SubCategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import MessageModel from "../models/MessageModel.js";

// GET PUBLIC HOME DATA
export const GetPublicHomeDataController = async (req, res) => {
  try {
    // category and subcategories
    const categories = await CategoryModel.aggregate([
      {
        $addFields: {
          SubCategories: {
            $filter: {
              input: await SubCategoryModel.find().select(
                "-__v -createdAt -updatedAt"
              ),
              as: "subCat",
              cond: { $eq: ["$$subCat.category", "$_id"] },
            },
          },
        },
      },
      {
        $project: {
          name: 1, // Include category name
          image: 1,
          active: 1,
          SubCategories: 1, // Include subcategories
          slug: 1,
        },
      },
    ]);
    // Find active subcategories
    const activeCategory = await SubCategoryModel.find({ active: true })
      .select("-__v -createdAt -updatedAt")
      .populate("category", "name")
      .limit(4);
    // Find Videos by sub category
    const Videos = await SubCategoryModel.find({
      video: { $exists: true, $ne: "" },
    })
      .limit(12)
      .populate("category", "name")
      .select("-__v -createdAt -updatedAt");

    // Get products with pagination
    const Products = await ProductModel.find({})
      .limit(3)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .select("-createdAt -updatedAt");
    return res.status(200).send({
      success: true,
      message: "Home Data Loaded",
      result: {
        category: categories,
        products: Products,
        videos: Videos,
        activeCategory,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Not Respond",
      error: error.message,
    });
  }
};

// GET CATEGORY DETAILS
export const GetPublicCategoryController = async (req, res) => {
  try {
    // category and products count and add subcategories
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "Products", // Collection name of the "Product" model
          localField: "_id", // Field in "Category" to match
          foreignField: "Category", // Field in "Product" to match
          as: "Products", // Alias for the joined data
        },
      },
      {
        $addFields: {
          totalProducts: { $size: "$Products" }, // Count the number of products
          SubCategories: {
            $filter: {
              input: await SubCategoryModel.find().select("-__v -slug"),
              as: "subCat",
              cond: { $eq: ["$$subCat.category", "$_id"] },
            },
          },
        },
      },
      {
        $project: {
          name: 1, // Include category name
          image: 1,
          totalProducts: 1, // Include total product count
          SubCategories: 1, // Include subcategories
        },
      },
    ]);
    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      result: categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching categories",
      error: error.message,
    });
  }
};

// GET SUB-CATEGORY BY PRODUCTS
export const GetPublicCategoryByProductsController = async (req, res) => {
  try {
    const { name } = req.params;
    var page = parseInt(req?.query?.page) || 1;
    var limit = parseInt(req?.query?.limit) || 10;
    var skip = (page - 1) * limit;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "invalid category name",
      });
    }

    // GET PRODUCT BY SUB-CATEGORY NAME
    const subcategory = await SubCategoryModel.findOne({ slug: name });
    if (!subcategory) {
      return res.status(404).send({
        success: false,
        message: "Sub-category not found",
      });
    }
    const Products = await ProductModel.find({
      subcategory: subcategory._id,
    })
      .select("-createdAt -updatedAt")
      .populate("category", "name")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await ProductModel.find({
      subcategory: subcategory._id,
    }).countDocuments();

    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      result: Products,
      total: total,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching products",
      error: error.message,
    });
  }
};

// SUBMIT MESSAGE
export const PublicMessageSubmitController = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    // const image = req?.file?.key || "";
    if (!name || !email || !mobile || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    await MessageModel.create({
      name,
      email,
      mobile,
      message,
    });
    return res.status(201).send({
      success: true,
      message: "Contact submitted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Creating Contact",
      error: error.message,
    });
  }
};
