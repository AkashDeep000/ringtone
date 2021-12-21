import YoutubeMusicApi from '../../ytMusic/getNext'

export default async function handler(req,res){
 // res.send("hello world")
 const responce = await YoutubeMusicApi()
 res.json(responce)
}