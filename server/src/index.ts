import express from 'express' //express
import fs from 'fs/promises'
const app = express()
import cookieParser from 'cookie-parser'
app.use(cookieParser());

app.use(express.json());
import path from 'path'


app.use(/.+\.js$/, async (req, res, next) => {
    const result = path.resolve(__dirname, '..', '..', 'frontend', `dist${req.originalUrl}`);
    try{
        await fs.access(result);
        res.sendFile(path.basename(result), {
            root:path.dirname(result)
        });
    } catch(err){
        next();
    }
})

app.get('/', (req, res) => {
    
    res.sendFile('index.html', {
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    });
})

.get('/clockimg',(req,res)=>{
    res.sendFile('clock.png',{
        root:path.resolve(__dirname,'..','..','frontend/img')
    })
})

app.listen(80,()=>{console.log('Server ready')});
 