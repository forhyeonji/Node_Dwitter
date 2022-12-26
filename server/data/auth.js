// 1 password 'abcd1234' : $2b$12$4n5x1Uv3m2uJhmRdyWraRuUQcInaeQ5fdhmFIc7dKetfeEFAF.p.y
// 2 password 'aaaa94' :  $2b$12$TxxKCE6qcYxJjald45dtFu/OarFJmzTWukJK0Xhx5FQ9672KC/j.2


let users = [
    {   
        id:"1",
        username:"hyeonji",
        password:"$2b$12$4n5x1Uv3m2uJhmRdyWraRuUQcInaeQ5fdhmFIc7dKetfeEFAF.p.y",
        name:"Hyeonji",
        email:"hyeonni1907@naver.com",
        url:"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
    },
];

export async function findByUsername(username){
    return users.find((user) => user.username === username);
};

export async function findById(id){
    return users.find((user) => user.id === id);
}

export async function createUser (user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
};


