import getTop from '../../ytMusic/getTop'
export default async function handler(req,res){
 // res.send("hello world")
  const a = await getTop();
  res.send(a)
}