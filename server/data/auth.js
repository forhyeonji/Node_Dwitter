import { DataTypes } from 'sequelize';
import {db, sequelize} from '../db/database.js';

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    url: DataTypes.TEXT,
}, { timestamps:false })


export async function findByUsername(username){

    return User.findOne({ where: { username } })
    // return db.execute('SELECT * FROM user WHERE username=?', [username])
    // .then((result) => result[0][0]);
};

export async function findById(id){

    return User.findByPk(id)
    // return db.execute('SELECT * FROM user WHERE id=?', [id])
    // .then((result) => result[0][0]);
};

export async function createUser (user) {

    return User.create(user).then((data)=> data.dataValues.id);
    // const { username, password, name, email, url } = user;
    // return db
    // .execute(
    //     'INSERT INTO user (username, password, name, email,url) VALUES (?,?,?,?,?)', 
    //     [username, password, name, email, url]
    // )
    // .then((result)=>{
    //     return result[0].insertId;
    // });
};


