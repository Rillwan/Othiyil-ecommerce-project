import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import SubCategoryModel from "../models/SubCategoryModel.js";
import VideoModel from "../models/VideoModel.js";
import fs from "fs";
import {
  FindImageUploadDirectory,
  FindVideoUploadDirectory,
} from "../config/storage.js";

// CREATE CATEGORY CONTROLLER
export const CreateCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    // const image = req?.file?.key || "";
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    }
    // Category Exist
    const categoryExist = await CategoryModel.findOne({
      slug: slugify(category),
    });
    // Existing Category
    if (categoryExist) {
      return res.status(403).send({
        success: false,
        message: "Category already exists",
      });
    }
    const filename = req?.file?.filename;
    // save database
    const newCategory = new CategoryModel({
      name: category,
      slug: slugify(category),
      image: filename || "",
    });
    await newCategory.save();

    return res.status(201).send({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Creating Category",
      error: error.message,
    });
  }
};

// CREATE SUB CATEGORY CONTROLLER
export const CreateSubCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Sub-Category is required",
      });
    } else if (!req?.params?.cid) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    }
    // Category Exist
    const subCategoryExist = await SubCategoryModel.findOne({
      slug: slugify(name),
    });
    // Existing Category
    if (subCategoryExist) {
      return res.status(403).send({
        success: false,
        message: "Sub-Category already exists",
      });
    }
    const filename = req?.file?.filename;
    // save database
    const newSubCategory = new SubCategoryModel({
      name: name,
      slug: slugify(name),
      description: description,
      image: filename || "",
      category: req.params.cid,
    });
    await newSubCategory.save();

    return res.status(201).send({
      success: true,
      message: "Sub-Category created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Creating Category",
      error: error.message,
    });
  }
};

// GET CATEGORY DETAILS - ADMIN
export const AdminCategoryController = async (req, res) => {
  try {
    // category and products count and add subcategories
    const categories = await CategoryModel.aggregate([
      // Lookup subcategories for each category
      {
        $lookup: {
          from: "subcategories", // Collection name of the "SubCategory" model
          localField: "_id", // Field in "Category" to match
          foreignField: "category", // Field in "SubCategory" to match
          as: "subcategories", // Alias for the joined data
        },
      },
      // Lookup products for each category
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      // Add count fields
      {
        $addFields: {
          // List of subcategories
          Subcategories: "$subcategories",
          subcategoryCount: { $size: "$subcategories" },
          productCount: { $size: "$products" },
        },
      },
      {
        $project: {
          name: 1, // Include category name
          image: 1,
          active: 1,
          subcategories: 1, // Include subcategories
          subcategoryCount: 1, // Include subcategory count
          productCount: 1, // Include product count
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

// GET SUBCATEGORY DETAILS - ADMIN
export const GetSubCategoriesController = async (req, res) => {
  try {
    const subcategories = await SubCategoryModel.find({}).populate(
      "category",
      "name _id"
    );
    return res.status(200).send({
      success: true,
      message: "Subcategories fetched successfully",
      result: subcategories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching categories",
      error: error.message,
    });
  }
};

// DELETE CATEGORY CONTROLLER
export const DeleteCategoryController = async (req, res) => {
  try {
    const { id } = req?.params;
    // EXIST CATEGORY PRODUCTS AND SUBCATEGORIES
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }
    // check existing category
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    // check existing products and subcategories
    const existingProducts = await ProductModel.findOne({ category: id });
    if (existingProducts) {
      return res.status(400).send({
        success: false,
        message: "Cannot delete category with existing products",
      });
    }
    const existingSubCategories = await SubCategoryModel.findOne({
      category: id,
    });
    if (existingSubCategories) {
      return res.status(400).send({
        success: false,
        message: "Cannot delete category with existing sub-categories",
      });
    }
    // finally delete category
    if (!existingProducts && !existingSubCategories) {
      // const category = await CategoryModel.findByIdAndDelete(id);
      // file delete from multer if image exist
      if (category?.image) {
        const filePath = FindImageUploadDirectory(category.image);
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Delete the file
          fs.unlink(filePath, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error deleting file.");
            }
            await CategoryModel.findByIdAndDelete(id);
            return res.status(200).send({
              success: true,
              message: "Product Deleted Successfully",
            });
          });
        } else {
          await CategoryModel.findByIdAndDelete(id);
          return res.status(404).send({
            success: false,
            message: "File not found, but category will be deleted",
          });
        }
      } else {
        await CategoryModel.findByIdAndDelete(id);
        return res.status(200).send({
          success: true,
          message: "Category deleted successfully",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message:
          "Cannot delete category with existing products or sub-categories",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Deleting Category",
      error: error.message,
    });
  }
};

// DELETE SUB-CATEGORY CONTROLLER
export const DeleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req?.params;
    // EXISTING SUB-CATEGORY PRODUCTS
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Sub-Category ID is required",
      });
    }
    // check existing sub-category
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub-Category not found",
      });
    }
    // check existing products and subcategories
    const existingProducts = await ProductModel.findOne({ subcategory: id });
    if (existingProducts) {
      return res.status(400).send({
        success: false,
        message: "Cannot delete sub-category with existing products",
      });
    }
    // finally delete sub-category
    if (!existingProducts) {
      // const category = await CategoryModel.findByIdAndDelete(id);
      // file delete from multer if image exist
      if (subCategory?.image) {
        const filePath = FindImageUploadDirectory(subCategory.image);
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Delete the file
          fs.unlink(filePath, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error deleting file.");
            }
            await SubCategoryModel.findByIdAndDelete(id);
            return res.status(200).send({
              success: true,
              message: "Sub-Category Deleted Successfully",
            });
          });
        } else {
          await SubCategoryModel.findByIdAndDelete(id);
          return res.status(404).send({
            success: false,
            message: "File not found, but sub-category will be deleted",
          });
        }
      } else {
        await SubCategoryModel.findByIdAndDelete(id);
        return res.status(200).send({
          success: true,
          message: "Sub-Category deleted successfully",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Cannot delete sub-category with existing products",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Deleting Sub-Category",
      error: error.message,
    });
  }
};

export const DeleteVideoBySubCategoryController = async (req, res) => {
  try {
    const { id } = req?.params;
    // EXISTING SUB-CATEGORY PRODUCTS
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Sub-Category ID is required",
      });
    }
    // check existing sub-category
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub-Category not found",
      });
    }
    // finally delete video
    if (subCategory) {
      // file delete from multer if video exist
      if (subCategory?.video) {
        const filePath = FindVideoUploadDirectory(subCategory?.video);
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Delete the file
          fs.unlink(filePath, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error deleting file.");
            }
            // CLEAR VIDEO FIELD IN SUB-CATEGORY
            await SubCategoryModel.findByIdAndUpdate(id, {
              $unset: { video: "" },
            });
            return res.status(200).send({
              success: true,
              message: "Sub-Category Video Deleted Successfully",
            });
          });
        } else {
          await SubCategoryModel.findByIdAndUpdate(id, {
            $unset: { video: "" },
          });
          return res.status(404).send({
            success: false,
            message:
              "File not found, but sub-category video filename will be deleted",
          });
        }
      } else {
        await SubCategoryModel.findByIdAndUpdate(id, { $unset: { video: "" } });
        return res.status(200).send({
          success: true,
          message: "Sub-Category video filename deleted successfully",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Cannot delete sub-category with existing video",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Deleting Video By Sub-Category",
      error: error.message,
    });
  }
};

// ACTIVE STATUS UPDATE SUBCATEGORY CONTROLLER
export const ActiveSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "SubCategory ID is required",
      });
    } else if (!active) {
      return res.status(400).send({
        success: false,
        message: "Active status is required",
      });
    }
    const subcategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      { active: active },
      { new: true }
    );
    if (!subcategory) {
      return res.status(404).send({
        success: false,
        message: "SubCategory not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "SubCategory status updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching active status subcategories",
    });
  }
};

// GET CATEGORIES BY NAME CONTROLLER
export const GetCategoriesByNameController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching categories by name",
    });
  }
};

// CATEGORY DETAILS CONTROLLER
export const CategoryDetailsController = async (req, res) => {
  try {
    var Products = [];
    const id = req.params.id;
    const category = await CategoryModel.findById(id).select(
      "-active -__v -slug"
    );
    // Exist category
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    } else {
      // Category Products
      const catProducts = await ProductModel.find({
        category: category?._id,
      }).select("-__v -createdAt -updatedAt");
      if (catProducts?.length > 0) {
        // Products Signed URLs (IMAGES)
        Products = await Promise.all(
          catProducts?.map(async (product) => {
            // if Product images
            if (product?.imagesURL?.length > 0) {
              // get signed url
              const signedURL = await GenerateSignedImageUrl({
                imageURL: product?.imagesURL[0]?.low, // low image URL
              });
              // Update product with signed URLs
              return {
                ...product._doc,
                image: signedURL,
              };
            } else {
              return product._doc;
            }
          })
        );
      }
      if (category?.imageURL?.low) {
        // Get Signed url
        const signURL = await GenerateSignedImageUrl({
          imageURL: category?.imageURL?.low, // image URL
        });

        return res.status(200).send({
          success: true,
          message: "Category details fetched successfully",
          result: {
            category: {
              name: category?.name,
              image: signURL,
              _id: category?._id,
              title: category?.title,
              description: category?.description,
            },
            products: Products,
          },
        });
      } else {
        // Category Without Signed URL (IMAGE)
        return res.status(200).send({
          success: true,
          message: "Category details fetched successfully",
          result: {
            category: {
              name: category?.name,
              image: "",
              description: category?.description,
              _id: category?._id,
            },
            products: Products,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching category details",
    });
  }
};

// UPDATE CATEGORY IMAGE CONTROLLER
export const UpdateCategoryImageController = async (req, res) => {
  try {
    const id = req?.params?.id;
    const file = req?.file;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID",
      });
    } else if (!file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    } else {
      // Delete File S3
      if (category?.imageURL?.low) {
        await DeleteFile({ key: category.imageURL.low });
      }
      if (category?.imageURL?.hd) {
        await DeleteFile({ key: category.imageURL.hd });
      }
      // Upload Image (S3) & Compressing
      const imageURL = await ResizeImageAndUpload(file);
      // Update MongoDB
      await CategoryModel.findByIdAndUpdate(
        id,
        {
          $set: {
            imageURL: {
              low: imageURL?.low,
              hd: imageURL?.hd,
            },
          },
        },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Category image updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in updating category image",
    });
  }
};

// UPDATE CATEGORY CONTROLLER
export const UpdateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Invalid request",
      });
    }
    // Category Exist
    const categoryExist = await CategoryModel.findOne({
      slug: slugify(category),
    });
    // Existing Category
    if (categoryExist && categoryExist._id.toString() !== id) {
      return res.status(403).send({
        success: false,
        message: "Category already exists",
      });
    }
    // Delete old image if new image is uploaded
    const oldCategory = await CategoryModel.findById(id);
    if (!oldCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    const filename = req?.file?.filename;
    if (filename && oldCategory?.image) {
      const filePath = FindImageUploadDirectory(oldCategory.image);
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error deleting file.");
          }
        });
      }
    }
    // Update
    const Category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: category,
          slug: slugify(category),
          image: filename || oldCategory?.image || "",
        },
      },
      {
        new: true,
      }
    );
    if (!Category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Category updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in updating category",
    });
  }
};

// UPDATE SUBCATEGORY CONTROLLER
export const UpdateSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { subcategory } = req.body;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Invalid request",
      });
    }
    // SubCategory Exist
    const subcategoryExist = await SubCategoryModel.findOne({
      slug: slugify(subcategory),
    });
    // Existing SubCategory
    if (subcategoryExist && subcategoryExist._id.toString() !== id) {
      return res.status(403).send({
        success: false,
        message: "SubCategory already exists",
      });
    }
    // Delete old image if new image is uploaded
    const oldSubcategory = await SubCategoryModel.findById(id);
    if (!oldSubcategory) {
      return res.status(404).send({
        success: false,
        message: "SubCategory not found",
      });
    }
    const filename = req?.file?.filename;
    if (filename && oldSubcategory?.image) {
      const filePath = FindImageUploadDirectory(oldSubcategory.image);
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error deleting file.");
          }
        });
      }
    }
    // Update
    const SubCategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: subcategory,
          slug: slugify(subcategory),
          image: filename || oldSubcategory?.image || "",
        },
      },
      {
        new: true,
      }
    );
    if (!SubCategory) {
      return res.status(404).send({
        success: false,
        message: "SubCategory not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "SubCategory updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in updating SubCategory",
    });
  }
};

// CATEGORY PRODUCTS SEARCH CONTROLLER
export const CategoryProductsSearchController = async (req, res) => {
  try {
    var Products = [];
    const { category, search } = req.query;
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    } else if (!search && search.length < 3) {
      return res.status(400).send({
        success: false,
        message: "Search key must be at least 3 characters",
      });
    }
    const products = await ProductModel.find({
      category: category,
      name: { $regex: search, $options: "i" },
    }).select("-__v -createdAt -updatedAt");
    if (products?.length > 0) {
      // Products Signed URLs (IMAGES)
      Products = await Promise.all(
        products?.map(async (product) => {
          // if Product images
          if (product?.imagesURL?.length > 0) {
            // get signed url
            const signedURL = await GenerateSignedImageUrl({
              imageURL: product?.imagesURL[0]?.low, // low image URL
            });
            // Update product with signed URLs
            return {
              ...product._doc,
              image: signedURL,
            };
          } else {
            return product._doc;
          }
        })
      );
    } else {
      return res.status(404).send({
        success: false,
        message: "No products found",
        result: {
          products: Products,
        },
      });
    }
    return res.status(200).send({
      success: true,
      message: "Products found",
      result: {
        products: Products,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in searching category products",
    });
  }
};

// UPLOAD VIDEO BY SUB-CATEGORY CONTROLLER
export const UploadVideoBySubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id is required",
      });
    }
    // SubCategory Exist
    const subCategoryExist = await SubCategoryModel.findById(id);
    // Existing Category
    if (!subCategoryExist) {
      return res.status(403).send({
        success: false,
        message: "Sub-Category Not Found",
      });
    }
    const filename = req?.file?.filename;
    // Update
    const SubCategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          video: filename || "",
        },
      },
      {
        new: true,
      }
    );
    if (!SubCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub Category not found",
      });
    } else {
      await new VideoModel({
        video: filename,
        subcategory: SubCategory?._id,
      }).save();
      return res.status(200).send({
        success: true,
        message: "Video uploaded successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Uploading Video",
      error: error.message,
    });
  }
};

// GET CATEGORIES BY NAME CONTROLLER
export const GetSubCategoryNameController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id not found",
      });
    }
    const subCategory = await SubCategoryModel.findById(id).select(
      "-__v -createdAt -updatedAt -category"
    );
    if (!subCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub-category not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Sub-category fetched successfully",
      result: subCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching categories by name",
    });
  }
};

// ------------------------------------------------
// GET CATEGORY CONTROLLER
export const getCategoryController = async (req, res) => {
  try {
    // category and products count
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "products", // Collection name of the "Product" model
          localField: "_id", // Field in "Category" to match
          foreignField: "category", // Field in "Product" to match
          as: "products", // Alias for the joined data
        },
      },
      {
        $addFields: {
          totalProducts: { $size: "$products" }, // Count the number of products
        },
      },
      {
        $project: {
          name: 1, // Include category name
          title: 1,
          description: 1,
          icon: 1,
          totalProducts: 1, // Include total product count
        },
      },
    ]);

    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Getting Category",
      error: error.message,
    });
  }
};

// UPDATE OR PUT CATEGORY
export const updateCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { category } = req.body;
    const cat = JSON.parse(category);
    if (categoryId) {
      const category = await categoryModel.findByIdAndUpdate(
        categoryId,
        {
          $set: {
            name: cat?.name,
            icon: cat?.icon || "",
            title: cat?.title || "",
            description: cat?.description || "",
            active: cat?.active || false,
          },
        },
        {
          new: true,
        }
      );
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Updating Category",
      error: error.message,
    });
  }
};
