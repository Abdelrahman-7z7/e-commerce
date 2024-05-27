import {Router} from 'express'
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler'
import { FoodModel } from '../models/food.model';

const router = Router();

router.get("/seed", asyncHandler(
   async (req , res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount> 0){
            res.send("Seed is already done!");
            return;
        }
        
        // in case if the foods didn't get loaded inside the database
        await FoodModel.create(sample_foods);
        res.send("Seed is Done!")
    }
))

router.get("/", asyncHandler(
    async (req , res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
))

//we need to build our food.service.ts
router.get("/search/:searchTerm",  asyncHandler(
    async (req, res) => {
        // i === case insensitive
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({name: {$regex:searchRegex}});
        res.send(foods);
    }
)) 

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            // unwind functionality: assume you have 2 foods and each food has 3 tags, after unwind with the tags => you are going to have 6 foods that each food has tags property with only 1 item
            // so it converts the tags that is an array into just a normal field with only one value. in this way we can make groups and find similar ones and count them 
            {
            $unwind:'$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },{
                $project:{
                    // doesn't have any id so we set the id = 0
                    _id: 0,
                    name:'$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1}); // -1 means descending order 

        // we need to have all that counts all the document inside the database
        const all={
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        // we need to add the all at the beginning of tags 
        tags.unshift(all);

        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({tags: req.params.tagName})
        res.send(foods);
    }
))

router.get("/:foodId", asyncHandler(
    async (req, res) =>{
        const food = await FoodModel.findById(req.params.foodId)
        res.send(food);
    
    } 
))

export default router;