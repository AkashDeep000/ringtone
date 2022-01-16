import ytdl from "ytdl-core"

export default async function handler(req,res){
  const { id } = req.query;
  
  const head = {
            
            'Content-Type': 'audio/webm',
            'Cache-Control': 'max-age=2592000'
        };
        
 const audio = ytdl("http://www.youtube.com/watch?v=" + id, {
         
         filter: "audioonly",
      }).on('error', (err) => {
          res.send("Error")
      })
  
  audio.on('data', function(chunk){
    //res.setHeader('Cache-Control', 'max-age=86400')
    //res.writeHead(200, head);
  });
  audio.pipe(res);

}