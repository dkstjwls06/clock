const deg = 6;
const hr = document.getElementById("hr");
const mn = document.getElementById("mn");
const sc = document.getElementById("sc");


const clock = setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;


    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
})

setInterval(function(){
    document.getElementById('body').style.backgroundImage = 'url(/background)'
    document.getElementById('body').style.backgroundSize = 'cover'
},1000)

const work = document.getElementById('work') //현재 일
const time = document.getElementById('time') //남은 시간

const prework = document.getElementById('prework') // 이전 일
const pretime = document.getElementById('pretime') // 끝난 시간

const postwork = document.getElementById('postwork') // 다음 일
const posttime = document.getElementById('posttime') // 시작 시간


interface fetchjson{
    work:string,
    prework:string,
    start:string,
    postwork:string,
    end: string
}

let getdata:fetchjson
setInterval(()=>{
    console.log('hi')
    const date = new Date()
    const week = ['일','월','화','수','목','금','토']
    const day = date.getDay()
    const dayOfWeek = week[day]
    const fetchWhatToDo = async ()=>{
        const res = await fetch('/getwhatToDo',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({dayOfWeek:dayOfWeek})
        })
        getdata = await res.json()
        console.log(getdata)
        let startarr = []
        let endarr = []
        if(getdata.start.length == 3){
            startarr.push(getdata.start.slice(0,1),getdata.start.slice(1))
            getdata.start = [getdata.start.slice(0,1),':',getdata.start.slice(1)].join('')
            
        }else{
            startarr.push(getdata.start.slice(0,2),getdata.start.slice(2)) 
            getdata.start = [getdata.start.slice(0,2),':',getdata.start.slice(2)].join('')
             
        }
        if(getdata.end.length == 3) {
            endarr.push(getdata.end.slice(0,1),getdata.end.slice(1))
            getdata.end = [getdata.end.slice(0,1),':',getdata.end.slice(1)].join('')
            
        }
        else{
            endarr.push(getdata.end.slice(0,2),getdata.end.slice(2)) 
            getdata.end = [getdata.end.slice(0,2),':',getdata.end.slice(2)].join('')
             
        }
        console.log(startarr,endarr)
        let comparedate = new Date()
        comparedate.setHours(Number(endarr[0]))
        comparedate.setMinutes(Number(endarr[1]))
        comparedate.setSeconds(0)
        comparedate.setMilliseconds(0)
        let left = new Date()
        left.setHours(comparedate.getHours()-date.getHours())
        left.setMinutes(comparedate.getMinutes()-date.getMinutes())
        left.setSeconds(comparedate.getSeconds()-date.getSeconds())
        console.log(left)
        time.innerHTML = `${left.getHours()}시간 ${left.getMinutes()}분 ${left.getSeconds()}초 남음`
        /*
        JSON Data :
        {
            work:string,
            time:string,
            etc.
        }
        */
       work.innerHTML = `${getdata.work}`
       
       prework.innerHTML = `${getdata.prework}`
       pretime.innerHTML = `${getdata.start} 종료`

       postwork.innerHTML = `${getdata.postwork}`
       posttime.innerHTML = `${getdata.end} 시작`
    }
    fetchWhatToDo();
},1000)
