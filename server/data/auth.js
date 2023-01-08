import {db} from '../db/database.js';

export async function findByUsername(username){
    return db.execute('SELECT * FROM user WHERE username=?', [username])
    .then((result) => result[0][0]);
};

export async function findById(id){
    return db.execute('SELECT * FROM user WHERE id=?', [id])
    .then((result) => result[0][0]);
};

export async function createUser (user) {
    const { username, password, name, email, url } = user;
    return db
    .execute(
        'INSERT INTO user (username, password, name, email,url) VALUES (?,?,?,?,?)', 
        [username, password, name, email, url]
    )
    .then((result)=>{
        return result[0].insertId;
    });
};


