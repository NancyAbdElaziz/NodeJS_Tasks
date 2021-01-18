const { response } = require('express')
const https = require('https')
 getPostId = (postId)=>{
const url = `https://jsonplaceholder.typicode.com/posts/${postId}`
const apiPost = https.request(url, postId, (response)=>{
    let data =''
    response.on('data', (chunck)=>{
        data+=chunck.toString()
    })
    postData = response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(body)
        return body
    })
    return postData
})
apiPost.on('error',(err)=>{console.log(err)})
apiPost.end()
return apiPost
}
console.log(getPostId(1))