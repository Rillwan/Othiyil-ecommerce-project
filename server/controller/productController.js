import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
import UserModel from "../models/UserModel.js";
import { FindImageUploadDirectory } from "../config/storage.js";
import fs from "fs";

// CREATE PRODUCT CONTROLLER
export const CreateProductController = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      description,
      brand,
      measurement,
      color,
    } = req.body;

    const images = await req.files.map((element) => {
      return element.filename;
    });
    // Parse subcategory
    const parsedSubCategory = JSON.parse(subCategory);
    // validation
    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "Name is required",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "Category is required",
        });
      case !brand:
        return res.status(400).send({
          success: false,
          message: "Brand is required",
        });
    }

    // Products Details
    const products = new ProductModel({
      name,
      slug: slugify(name),
      category,
      subcategory: parsedSubCategory,
      description,
      brand,
      measurement,
      color,
      images,
    });
    //save to mongoose
    await products.save();

    return res.status(201).send({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ADMIN GET PRODUCTS CONTROLLER
export const GetProductListController = async (req, res) => {
  try {
    var page = parseInt(req?.query?.page) || 1;
    var limit = parseInt(req?.query?.limit) || 10;
    var skip = (page - 1) * limit;
    // Get products with pagination
    const Products = await ProductModel.find({})
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subcategory", "name")
      .select("-createdAt -updatedAt");
    // Total Products Count
    const totalProducts = await ProductModel.countDocuments();
    return res.status(200).send({
      success: true,
      message: "Products Retrieved Successfully",
      result: {
        products: Products,
        total: totalProducts,
        // showing: {
        //   start: signedProducts?.length != 0 ? skip + 1 : 0,
        //   end: signedProducts?.length != 0 ? skip + signedProducts?.length : 0,
        // },
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT CONTROLLER
export const UpdateProductController = async (req, res) => {
  try {
    const { name, description, brand, measurement, color } = req.body;
    const { pid } = req.params;
    // validation
    switch (true) {
      case !pid:
        return res.status(400).send({
          success: false,
          message: "Product Id is required",
        });
      case !name:
        return res.status(400).send({
          success: false,
          message: "Name is required",
        });
      case !brand:
        return res.status(400).send({
          success: false,
          message: "Brand is required",
        });
    }

    if (req?.files[0]?.buffer && req?.files && req?.files?.length > 0) {
      const newImages = await req.files.map((element) => {
        return element.filename;
      });

      // UPDATE PRODUCT WITH IMAGES
      const ProductData = await ProductModel.findByIdAndUpdate(
        {
          _id: pid,
        },
        {
          $set: {
            name,
            slug: slugify(name),
            description,
            brand,
            measurement,
            color,
          }, // Update field Values
          $push: { images: { $each: newImages } }, // Add new images to the array
        },
        {
          new: true, // Return the updated document
        }
      );

      // Product exist
      if (!ProductData) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      // Return Success Response
      return res.status(201).send({
        success: true,
        message: "Product Updated successfully",
      });
    } else {
      // No File Exist
      // Update Product By Id
      const ProductData = await ProductModel.findByIdAndUpdate(
        {
          _id: pid,
        },
        {
          $set: {
            name,
            slug: slugify(name),
            description,
            brand,
            measurement,
            color,
          }, // Update field Values
        },
        {
          new: true, // Return the updated document
        }
      );
      if (!ProductData) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      // Response
      return res.status(200).send({
        success: true,
        message: "Product Updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error || Error in updating product",
      error: error.message,
    });
  }
};

// DELETE PRODUCT SELECTED IMAGE CONTROLLER
export const DeleteProductSelectedImageController = async (req, res) => {
  try {
    const { imageId } = req.body;
    const { id } = req?.params;
    const imageKey = JSON.parse(imageId);
    // validation
    if (!imageKey || !id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Request",
      });
    }
    // Remove the image from the array
    const productData = await ProductModel.findByIdAndUpdate(
      {
        _id: id,
        "imagesURL.low": imageKey?.low,
        "imagesURL.hd": imageKey?.hd,
      },
      {
        // Remove the specific image
        $pull: {
          imagesURL: {
            low: imageKey?.low,
            hd: imageKey?.hd,
          },
        },
      },
      {
        new: true, // Return the updated document
      }
    );
    // Exist
    if (!productData) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    } else {
      // Delete S3 File
      if (imageKey?.low) {
        await DeleteFile({ key: imageKey.low });
      }
      if (imageKey?.hd) {
        await DeleteFile({ key: imageKey.hd });
      }
      // Response
      return res.status(200).send({
        success: true,
        message: "Image Deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// DELETE PRODUCT CONTROLLER
export const DeleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }
    const Product = await ProductModel.findById(id);
    if (Product) {
      // Image Exist
      if (Product?.images && Product?.images?.length > 0) {
        // Delete All Images Array Promise
        await Promise.all(
          Product.images?.map(async (imageName) => {
            // Deleting Images
            const filePath = FindImageUploadDirectory(imageName);
            if (fs.existsSync(filePath)) {
              // Delete the file
              await fs.unlink(filePath, async (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("Error deleting file.");
                }
              });
            }
          })
        );
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).send({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).send({
          success: true,
          message: "Product deleted successfully, Image Not Included",
        });
      }
    } else {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET PRODUCT ATTRIBUTE (BRANDS & CATEGORIES) CONTROLLER
export const GetProductAttributesController = async (req, res) => {
  try {
    // Get all categories with subcategories
    const category = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "subcategories", // collection name (lowercase + plural)
          localField: "_id",
          foreignField: "category",
          as: "subCategories",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1, // only include subcategory name
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1, // only include category name
          subCategories: 1, // include subcategories (already filtered)
        },
      },
    ]);
    return res.status(200).send({
      success: true,
      result: category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Getting Product Attributes",
      error: error.message,
    });
  }
};

// PUBLIC GET PRODUCTS CONTROLLER
export const GetProductsController = async (req, res) => {
  try {
    var page = parseInt(req?.query?.page) || 1;
    var limit = parseInt(req?.query?.limit) || 10;
    var skip = (page - 1) * limit;
    // Get products with pagination
    const Products = await ProductModel.find({})
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .select("-createdAt -updatedAt");
    // Total Products Count
    const total = await ProductModel.countDocuments();
    // Total Pages
    return res.status(200).send({
      success: true,
      message: "Products Retrieved Successfully",
      result: Products,
      total: total,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// ADMIN - GET PRODUCT CONTROLLER ID
export const AdminProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name")
      .select("-__v");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    // Return product with signed URL
    return res.status(200).send({
      success: true,
      message: "Product Details Retrieved Successfully",
      result: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting product details",
    });
  }
};

// GET PRODUCT CONTROLLER ID
export const GetProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name")
      .select("-__v -updatedAt -createdAt");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    // Return product with signed URL
    return res.status(200).send({
      success: true,
      message: "Product Details Retrieved Successfully",
      result: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting product details",
    });
  }
};

// SEARCH PRODUCTS CONTROLLER
export const SearchProductsController = async (req, res) => {
  var Products = [];
  try {
    const { category, search } = req.query;
    if (category) {
      // Exist Category
      const ExistCategory = await CategoryModel.findById({
        _id: category,
      });
      if (ExistCategory) {
        // Get products by category
        const products = await ProductModel.find({
          category: category,
          name: { $regex: search, $options: "i" },
        })
          .select("-__v -createdAt -updatedAt")
          .populate("category", "name");
        // Products Signed URLs (IMAGES)
        Products = await Promise.all(
          products?.map(async (product) => {
            // if Product images
            if (product?.imagesURL?.length > 0) {
              // Get signed url
              const signedURL = await GenerateSignedImageUrl({
                imageURL: product?.imagesURL[0]?.low, // low image URL
              });
              // Update product with signed URLs
              return {
                ...product._doc,
                imagesURL: signedURL,
              };
            } else {
              return product._doc;
            }
          })
        );
      } else {
        return res.status(404).send({
          success: false,
          message: "Category Not Found",
        });
      }
    } else {
      // No Category
      const products = await ProductModel.find({
        name: { $regex: search, $options: "i" },
      })
        .select("-__v -createdAt -updatedAt")
        .populate("category", "name");
      // Products Signed URLs (IMAGES)
      Products = await Promise.all(
        products?.map(async (product) => {
          // if Product images
          if (product?.imagesURL?.length > 0) {
            // Get signed url
            const signedURL = await GenerateSignedImageUrl({
              imageURL: product?.imagesURL[0]?.low, // low image URL
            });
            // Update product with signed URLs
            return {
              ...product._doc,
              imagesURL: signedURL,
            };
          } else {
            return product._doc;
          }
        })
      );
    }
    // Response
    return res.status(200).send({
      success: true,
      products: Products,
      countTotal: Products.length,
      showing: {
        start: 1,
        end: Products?.length,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in searching products",
    });
  }
};

// CART PRODUCTS CONTROLLER
export const CartProductsController = async (req, res) => {
  try {
    const { uid } = req?.params;
    // Find user
    const user = await UserModel.findById(uid)
      .select("cart")
      .populate("cart.product", "name price discount imagesURL sizes colors");
    // If user not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Get All Products images convert to Signed Images
    if (user?.cart?.length > 0) {
      // Products Signed URLs (IMAGES)
      const CartProducts = await Promise.all(
        user?.cart?.map(async (ct) => {
          // if Product images
          if (ct?.product?.imagesURL?.length > 0) {
            // Get signed url
            const signedURL = await GenerateSignedImageUrl({
              imageURL: ct?.product?.imagesURL[0]?.low, // low image URL
            });
            // Update product with signed URLs
            return {
              product: {
                ...ct.product._doc,
                imagesURL: signedURL,
              },
              color: ct?.color,
              size: ct?.size,
              quantity: ct?.quantity,
            };
          } else {
            return {
              product: {
                ...ct.product._doc,
              },
              color: ct?.color,
              size: ct?.size,
              quantity: ct?.quantity,
            };
          }
        })
      );

      // Response
      return res.status(200).send({
        success: true,
        message: "Cart Products found",
        cart: CartProducts,
      });
    } else {
      // No products in cart
      return res.status(400).send({
        success: false,
        message: "Cart Empty",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting cart products",
    });
  }
};

// ----------------------------------------------------
// SEARCH PRODUCT
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const searching = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
        ],
      })
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Search result",
      countTotal: searching.length,
      searching,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in searching products",
      error: error.message,
    });
  }
};

// GET FILTER PRODUCTS
export const getFilterProductsController = async (req, res) => {
  try {
    const { category, price, rating } = req.body;
    const filter = {};
    if (category) filter.category = category;
    if (price.minPrice && price.maxPrice) {
      filter.price = { $gte: price.minPrice, $lte: price.maxPrice };
    } else if (price.minPrice) {
      filter.price = { $gte: price.minPrice };
    } else if (price.maxPrice) {
      filter.price = { $lte: price.maxPrice };
    }
    console.log(filter);
    const filterProducts = await productModel.find(filter);
    return res.status(200).send({
      success: true,
      message: "Filter result",
      filterProducts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting filter products",
      error: error.message,
    });
  }
};
