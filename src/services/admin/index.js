import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";
import { Category } from "../../models/category.model.js";
import { generateRefreshToken } from "../../utils/token.js";
import { MainCategory } from "../../models/mainCategory.model.js";

export const adminLoginService = async (req) =>{
    try {
        
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error('Email and password are required');
        }
        const admin = await User.findOne({email, role: 'admin'});
        if(!admin){
            throw new Error('Admin not found');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            throw new Error('Invalid credentials');
        }
        const generatedToken = generateRefreshToken(admin._id);
        if(!generatedToken){
            throw new Error('Failed to generate token');
        }

        admin.refreshToken = generatedToken;
        await admin.save();

        req.user = admin;
        req.token = generatedToken;
        // console.log(admin, generatedToken,'in service');
        
       
        return {admin,generatedToken};

    } catch (error) {
        throw new Error(error.message);
        
    }
}

export const addCategoryService = async (req) => {
    try {
        const { categoryName, subCategory ,gender} = req.body;
        console.log('Category Name:', categoryName
        , 'Sub Category:', subCategory
        );
        
        if(!categoryName){
            throw new Error('Category is required');
        }
        
        // Here you would typically save the category to the database
        const newCategory = await Category.create({
            name: categoryName,
            gender:gender,
            subCategory: subCategory 
        });

        const savedCategory = newCategory.save();
        
       
        return savedCategory;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const allCategoriesService = async (req) => {
    try {
        const categories = await Category.find();
        if(!categories){
            throw new Error('No categories found');
        }
        return categories;
    } catch (error) {
        throw new Error(error.message);
        
    }
};

export const editCategoryService = async (req) => {
    try {
        const categoryId = req.params.id;

        if (!categoryId) {
            throw new Error('Category ID is required');
        }
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        
        return category;

    } catch (error) {
        throw new Error(error.message);
        
    }
};

export const updateCategoryService = async (req) => {
    try {
        
        const categoryId = req.params.id;
        if (!categoryId) {
            throw new Error('Category ID is required');
        }
        const {categoryName,gender, subCategory} = req.body;
        if (!categoryName) {
            throw new Error('Category name is required');
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name: categoryName,
              gender:gender,
              subCategory: subCategory
            },
            { new: true }
        );
        if (!updatedCategory) {
            throw new Error('Failed to update category');
        }
        return updatedCategory;


    } catch (error) {
        throw new Error(error.message);
        
    }
};

export const deleteCategoryService = async (req) => {
    try {
        
        const categoryId = req.params.id;
        if (!categoryId) {
            throw new Error('Category ID is required');
        }
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new Error('Failed to delete category');
        }
        return deletedCategory;

    } catch (error) {
        throw new Error(error.message);
        
    }
};

export const addMainCategoryService = async (req) => {
    try {
        
        const { name } = req.body;
        if (!name) {
            throw new Error('Main category name is required');
        }
        
        const newMainCategory = await MainCategory.create({ name });
        if (!newMainCategory) {
            throw new Error('Failed to create main category');
        }
        await newMainCategory.save();
        
        
        return newMainCategory;
    } catch (error) {
        throw new Error(error.message);
        
    }
};

export const allMainCategoriesService = async () => {
    try {
        
        const mainCategories = await MainCategory.find();
        if (!mainCategories) {
            throw new Error('No main categories found');
        }
        return mainCategories;
    } catch (error) {
        throw new Error(error.message);
        
    }
}