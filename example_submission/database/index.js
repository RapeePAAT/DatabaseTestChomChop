const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING(50),
        allowNull:true
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:true ,
        unique :true ,
    }
},{});

const UserCard = sequelize.define('UserCard',{
    card_id :{
        type:DataTypes.STRING(16),
        allowNull:true
    },
    maskpan:{
        type:DataTypes.STRING(255),
        allowNull:true,
    }
})

const Product = sequelize.define('Product',{
    name:{
        type:DataTypes.STRING(60), 
        allowNull:false , 
    },
    description:{
        type:DataTypes.STRING(150),
        allowNull:true ,
    },
    price:{
        type:DataTypes.DECIMAL(10,2)
    },
    delete_at:{
        type:DataTypes.DATE,
    },
})

const Promotion = sequelize.define('Promotion',{
    discount_amount :{
        type :DataTypes.DECIMAL(10,2)
    },
    description:{
        type:DataTypes.STRING(150),
        allowNull:true ,
    },
    delete_at:{
        type:DataTypes.DATE,
    },

})

const Bundle = sequelize.define('Bundle',{
    quanity:{
        type: DataTypes.INTEGER
        
    },
    discount:{
        type:DataTypes.INTEGER 
    },
    discount_type :{
        type:DataTypes.ENUM("percent","baht"),
        defaultValue:"baht"
    },
    description:{
        type:DataTypes.STRING(150),
        allowNull:true ,
    },
    delete_at:{
        type:DataTypes.DATE,
    },
})

const Transaction = sequelize.define('Transaction' , {
    quanity:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    total_amount :{
        type :DataTypes.DECIMAL(10,2),
        allowNull:false 
    },
    discount_amount :{
        type:DataTypes.DECIMAL(10,2),
        allowNull:true
    },
    summary :{
        type:DataTypes.DECIMAL(10,2) ,
        allowNull:false
    },
    code :{
        type :DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,

    }

})
User.hasMany(UserCard, {onDelete:'CASCADE' })
UserCard.belongsTo(User)

Product.hasMany(Promotion , {onDelete:'CASCADE' })
Promotion.belongsTo(Product)

Product.hasMany(Promotion, {onDelete:'CASCADE'})
Bundle.belongsTo(Product)

Product.hasMany(Transaction , {onDelete:"CASCADE"})
Transaction.belongsTo(Product)


Promotion.hasMany(Transaction ,{onDelete :"CASCADE"})
Transaction.belongsTo(Promotion)

Bundle.hasMany(Transaction ,{onDelete :"CASCADE"})
Transaction.belongsTo(Bundle)

UserCard.hasMany(Transaction , {onDelete:'CASCADE'})
Transaction.belongsTo(UserCard)

