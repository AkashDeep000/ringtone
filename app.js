const http = require('http')
//const page = require('./.next/serverless/pages/ringtone/browse/[searchTerm].js')
const page = require('./.next/serverless/pages/api/test.js')
const server = new http.Server((req, res) => { const data = page.default(req, res)
   return data
})
server.listen(4000, () => console.log('Listening on http://localhost:4000'))