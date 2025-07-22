import { addCategoryService, addMainCategoryService, adminLoginService, allCategoriesService, allMainCategoriesService, deleteCategoryService, editCategoryService, updateCategoryService } from "../../services/admin/index.js";
import { addToCookie } from "../../utils/addToCookie.js";

export const adminLogin = async(req,res)=>{
    res.render('admin/login');
}

export const adminLoginPost = async(req,res)=>{
    const {admin,generatedToken} = await adminLoginService(req);
    // console.log('Admin:', admin);
    // console.log('Generated Token:', generatedToken);
    if(!admin){
        return res.redirect('api/admin/login');
    }
    addToCookie(res, generatedToken);
    res.redirect('/api/admin/all');
    // res.render('admin/AddCategory');
};

export const addCategoryPage = async(req,res)=>{
    res.render('admin/AddCategory');
};

export const addCategory = async(req,res)=>{
   
    const savedCategory = await addCategoryService(req);
    if(!savedCategory){
        return res.status(400).json({message: 'Failed to add category'});
    }
    res.redirect('/api/admin/all');
    // res.render('admin/AllCategories', {categories: savedCategory});
};

export const allCategories = async(req,res)=>{
    try {
        
        const categories = await allCategoriesService(req);
        if(!categories){
            return res.status(404).json({message: 'No categories found'});
        }
        res.render('admin/AllCategories', {categories});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};

export const editCategory = async(req,res)=>{
    try {
        const category = await editCategoryService(req);
        if(!category){
            return res.redirect('/api/admin/all');
        }
        res.render('admin/EditCategory', {category});
        
    } catch (error) {
        
    }
};

export const updateCategory = async(req,res)=>{
    try {
        
        const updatedCategory = await updateCategoryService(req);
        console.log('Updated Category:', updatedCategory);
        
        if(!updatedCategory){
            return res.status(400).json({message: 'Failed to update category'});
        }
        res.redirect('/api/admin/all');
    } catch (error) {
        
    }
};

export const deleteCategory = async(req,res)=>{
    try {
        const deletedCategory = await deleteCategoryService(req);
        if(!deletedCategory){
            return res.status(400).json({message: 'Failed to delete category'});
        }
        res.redirect('/api/admin/all');
    } catch (error) {
        
    }
};

export const addMainCategoryPage = async(req,res)=>{
    res.render('admin/Main/AddMain');
};

export const addMainCategory = async(req,res)=>{
    try {
        const mainCategory = await addMainCategoryService(req);
        if(!mainCategory){
            return res.status(400).json({message: 'Failed to add main category'});
        }
        res.render('admin/Main/AllMainCategories',{mainCategory});
    } catch (error) {
        
    }
}

export const allMainCategories = async(req,res)=>{
    try {
        const mainCategories = await allMainCategoriesService();
        if(!mainCategories){
            return res.status(404).json({message: 'No main categories found'});
        }
        res.render('admin/Main/AllMainCategories', {mainCategories});
    } catch (error) {
        
    }
}