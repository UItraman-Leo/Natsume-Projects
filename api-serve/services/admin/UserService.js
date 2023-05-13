const UserModel = require("../../models/UseModel");
/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const UserService = {
    // 将传递过来的数据解构
    login: async ({username, password}) => {
        return UserModel.find({
            username,
            password
        })
    },
    enroll: async ({nickname,username,password}) =>{
        console.log(nickname,username,password)
        return UserModel.findOneAndUpdate({username}, {
            $setOnInsert: {
                nickname,
                username,
                password,
                role:1
            }
            // rawResult: true  开启返回mongdb原生结果
        }, {upsert: true, rawResult: true})
    },
    upload: async ({
                       _id,
                       nickname,
                       gender,
                       introduction,
                       avatar
                   }) => {

        if (avatar) {
            return UserModel.updateOne({_id}, {
                nickname,
                gender,
                introduction,
                avatar
            })
        } else {
            return UserModel.updateOne({_id}, {
                nickname,
                gender,
                introduction
            })
        }

    },
    useradd: async (
        {
            nickname,
            username,
            password,
            role,
            gender,
            introduction,
            avatar
        }) => {
        return UserModel.findOneAndUpdate({username}, {
            $setOnInsert: {
                nickname,
                username,
                password,
                role,
                gender,
                introduction,
                avatar
            }
            // rawResult: true  开启返回mongdb原生结果
        }, {upsert: true, rawResult: true})
    },
    list: async ({id}) => {
        return id ? UserModel.find({_id: id}, [
                'nickname',
                'username',
                'password',
                'role'
            ]) :
            UserModel.find({}, [
                'nickname',
                'username',
                'role',
                'gender',
                'introduction',
                'avatar',
                'date'
            ])
    },
    delete: async ({_id}) => {
        return UserModel.deleteOne(
            {
                _id
            }
        )
    },
    put: async (body) => {
        return UserModel.updateOne({_id: body._id}, body)

    }
}

module.exports = UserService

