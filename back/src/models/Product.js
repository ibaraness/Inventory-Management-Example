import { DataTypes, Model } from"sequelize";
import { sequelize } from"./../db/db.js";
import Category from "./Category.js"

class Product extends Model {}
Product.init({
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
}, {
    sequelize,
    modelName: "product"
})


Category.hasMany(Product);
Product.belongsTo(Category);
//Product.sync();
export default Product;