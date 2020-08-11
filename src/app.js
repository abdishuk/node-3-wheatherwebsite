const path=require('path')
const express=require('express')

const app=express()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// define paths for express config
const publicDirpath=path.join(__dirname,'../index')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// setting static directory to serve
app.use(express.static(publicDirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Wheather App',
        name:'Andrew Mead'
    })

})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
    name:'Abdishukriyu'  })


})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext :'call us on 0722234455 for assistance',
        title:'Help page'
      })


})
app.get('/wheather',(req,res)=>{
    if(!req.query.address){
      return   res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error:error})
        }
        forecast(latitude,longitude,(error,data2)=>{
            if(error){
                return res.send({error:error})
            }
            
            res.send({
                forecast:data2,
                location:location,
                address:req.query.address
             })
            })
           
        })
    })
    
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return   res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
   })

app.get('/help/*',(req,res)=>{
    res.render('404pag',{title:404, errormessage:'article not found'})
   })

app.get('*',(req,res)=>{
 res.render('404pag',{
     title:404,
    errormessage:'page not found'
 })
})

app.listen(port,()=>{
    console.log('server up and running and listening on ' + port)
})