import { DataTypes, Model } from"sequelize";
import { sequelize } from"./../db/db.js";

class Category extends Model {}
Category.init({
    title:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Category"
});
// Category.sync().then(()=>{
//     Category.build({title:"Food"}).save();
//     Category.build({title:"Tools"}).save();
//     Category.build({title:"Cleaner"}).save();
//     Category.build({title:"Furnitures"}).save();
// });

export default Category;
