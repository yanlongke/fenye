import Mock from "mockjs"
let data=Mock.mock({
    statu:200,
    "list|50":[{
        "id|+1":1,
        "name":"@cname",
        "title":"@ctitlet"
    }]
})

Mock.mock("/list","post",function(val){
    let {page,pagesize}=JSON.parse(val.body)
    let num=Math.ceil(data.list.length/pagesize)
    let arr=data.list.slice((page-1)*pagesize,page*pagesize)
    return {data:arr,num:num} 
})
