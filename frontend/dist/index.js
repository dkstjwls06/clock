/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
const deg = 6;
const hr = document.getElementById("hr");
const mn = document.getElementById("mn");
const sc = document.getElementById("sc");
const clock = setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
});
setInterval(function () {
    document.getElementById('body').style.backgroundImage = 'url(/background)';
    document.getElementById('body').style.backgroundSize = 'cover';
}, 1000);
const work = document.getElementById('work'); //현재 일
const time = document.getElementById('time'); //남은 시간
const prework = document.getElementById('prework'); // 이전 일
const pretime = document.getElementById('pretime'); // 끝난 시간
const postwork = document.getElementById('postwork'); // 다음 일
const posttime = document.getElementById('posttime'); // 시작 시간
let getdata;
setInterval(() => {
    console.log('hi');
    const date = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const day = date.getDay();
    const dayOfWeek = week[day];
    const fetchWhatToDo = async () => {
        const res = await fetch('/getwhatToDo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dayOfWeek: dayOfWeek })
        });
        getdata = await res.json();
        console.log(getdata);
        let startarr = [];
        let endarr = [];
        if (getdata.start.length == 3) {
            startarr.push(getdata.start.slice(0, 1), getdata.start.slice(1));
            getdata.start = [getdata.start.slice(0, 1), ':', getdata.start.slice(1)].join('');
        }
        else {
            startarr.push(getdata.start.slice(0, 2), getdata.start.slice(2));
            getdata.start = [getdata.start.slice(0, 2), ':', getdata.start.slice(2)].join('');
        }
        if (getdata.end.length == 3) {
            endarr.push(getdata.end.slice(0, 1), getdata.end.slice(1));
            getdata.end = [getdata.end.slice(0, 1), ':', getdata.end.slice(1)].join('');
        }
        else {
            endarr.push(getdata.end.slice(0, 2), getdata.end.slice(2));
            getdata.end = [getdata.end.slice(0, 2), ':', getdata.end.slice(2)].join('');
        }
        console.log(startarr, endarr);
        let comparedate = new Date();
        comparedate.setHours(Number(endarr[0]));
        comparedate.setMinutes(Number(endarr[1]));
        comparedate.setSeconds(0);
        comparedate.setMilliseconds(0);
        let left = new Date();
        left.setHours(comparedate.getHours() - date.getHours());
        left.setMinutes(comparedate.getMinutes() - date.getMinutes());
        left.setSeconds(comparedate.getSeconds() - date.getSeconds());
        console.log(left);
        time.innerHTML = `${left.getHours()}시간 ${left.getMinutes()}분 ${left.getSeconds()}초 남음`;
        /*
        JSON Data :
        {
            work:string,
            time:string,
            etc.
        }
        */
        work.innerHTML = `${getdata.work}`;
        prework.innerHTML = `${getdata.prework}`;
        pretime.innerHTML = `${getdata.start} 종료`;
        postwork.innerHTML = `${getdata.postwork}`;
        posttime.innerHTML = `${getdata.end} 시작`;
    };
    fetchWhatToDo();
}, 1000);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNkLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3pDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNyQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzdCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDaEMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUdoQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuRCxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFXLEVBQUUsTUFBTSxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRSxNQUFNLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBRUYsV0FBVyxDQUFDO0lBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGtCQUFrQjtJQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FB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QVcsQ0FBQyxRQUFRLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxHQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU07UUFDdEY7Ozs7Ozs7VUFPRTtRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBRWxDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLO1FBRXpDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxLQUFLO0lBQzNDLENBQUM7SUFDRCxhQUFhLEVBQUUsQ0FBQztBQUNwQixDQUFDLEVBQUMsSUFBSSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVnID0gNjtcclxuY29uc3QgaHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhyXCIpO1xyXG5jb25zdCBtbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW5cIik7XHJcbmNvbnN0IHNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY1wiKTtcclxuXHJcblxyXG5jb25zdCBjbG9jayA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGxldCBkYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGhoID0gZGF5LmdldEhvdXJzKCkgKiAzMDtcclxuICAgIGxldCBtbSA9IGRheS5nZXRNaW51dGVzKCkgKiBkZWc7XHJcbiAgICBsZXQgc3MgPSBkYXkuZ2V0U2Vjb25kcygpICogZGVnO1xyXG5cclxuXHJcbiAgICBoci5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigkeyhoaCkrKG1tLzEyKX1kZWcpYDtcclxuICAgIG1uLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7bW19ZGVnKWA7XHJcbiAgICBzYy5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke3NzfWRlZylgO1xyXG59KVxyXG5cclxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jykuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgvYmFja2dyb3VuZCknXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJ1xyXG59LDEwMDApXHJcblxyXG5jb25zdCB3b3JrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmsnKSAvL+2YhOyerCDsnbxcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJykgLy/rgqjsnYAg7Iuc6rCEXHJcblxyXG5jb25zdCBwcmV3b3JrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXdvcmsnKSAvLyDsnbTsoIQg7J28XHJcbmNvbnN0IHByZXRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldGltZScpIC8vIOuBneuCnCDsi5zqsIRcclxuXHJcbmNvbnN0IHBvc3R3b3JrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3R3b3JrJykgLy8g64uk7J2MIOydvFxyXG5jb25zdCBwb3N0dGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0dGltZScpIC8vIOyLnOyekSDsi5zqsIRcclxuXHJcblxyXG5pbnRlcmZhY2UgZmV0Y2hqc29ue1xyXG4gICAgd29yazpzdHJpbmcsXHJcbiAgICBwcmV3b3JrOnN0cmluZyxcclxuICAgIHN0YXJ0OnN0cmluZyxcclxuICAgIHBvc3R3b3JrOnN0cmluZyxcclxuICAgIGVuZDogc3RyaW5nXHJcbn1cclxuXHJcbmxldCBnZXRkYXRhOmZldGNoanNvblxyXG5zZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgY29uc29sZS5sb2coJ2hpJylcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICBjb25zdCB3ZWVrID0gWyfsnbwnLCfsm5QnLCftmZQnLCfsiJgnLCfrqqknLCfquIgnLCfthqAnXVxyXG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKVxyXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gd2Vla1tkYXldXHJcbiAgICBjb25zdCBmZXRjaFdoYXRUb0RvID0gYXN5bmMgKCk9PntcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2dldHdoYXRUb0RvJyx7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoe2RheU9mV2VlazpkYXlPZldlZWt9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZ2V0ZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICBjb25zb2xlLmxvZyhnZXRkYXRhKVxyXG4gICAgICAgIGxldCBzdGFydGFyciA9IFtdXHJcbiAgICAgICAgbGV0IGVuZGFyciA9IFtdXHJcbiAgICAgICAgaWYoZ2V0ZGF0YS5zdGFydC5sZW5ndGggPT0gMyl7XHJcbiAgICAgICAgICAgIHN0YXJ0YXJyLnB1c2goZ2V0ZGF0YS5zdGFydC5zbGljZSgwLDEpLGdldGRhdGEuc3RhcnQuc2xpY2UoMSkpXHJcbiAgICAgICAgICAgIGdldGRhdGEuc3RhcnQgPSBbZ2V0ZGF0YS5zdGFydC5zbGljZSgwLDEpLCc6JyxnZXRkYXRhLnN0YXJ0LnNsaWNlKDEpXS5qb2luKCcnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3RhcnRhcnIucHVzaChnZXRkYXRhLnN0YXJ0LnNsaWNlKDAsMiksZ2V0ZGF0YS5zdGFydC5zbGljZSgyKSkgXHJcbiAgICAgICAgICAgIGdldGRhdGEuc3RhcnQgPSBbZ2V0ZGF0YS5zdGFydC5zbGljZSgwLDIpLCc6JyxnZXRkYXRhLnN0YXJ0LnNsaWNlKDIpXS5qb2luKCcnKVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdldGRhdGEuZW5kLmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgICAgIGVuZGFyci5wdXNoKGdldGRhdGEuZW5kLnNsaWNlKDAsMSksZ2V0ZGF0YS5lbmQuc2xpY2UoMSkpXHJcbiAgICAgICAgICAgIGdldGRhdGEuZW5kID0gW2dldGRhdGEuZW5kLnNsaWNlKDAsMSksJzonLGdldGRhdGEuZW5kLnNsaWNlKDEpXS5qb2luKCcnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZW5kYXJyLnB1c2goZ2V0ZGF0YS5lbmQuc2xpY2UoMCwyKSxnZXRkYXRhLmVuZC5zbGljZSgyKSkgXHJcbiAgICAgICAgICAgIGdldGRhdGEuZW5kID0gW2dldGRhdGEuZW5kLnNsaWNlKDAsMiksJzonLGdldGRhdGEuZW5kLnNsaWNlKDIpXS5qb2luKCcnKVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHN0YXJ0YXJyLGVuZGFycilcclxuICAgICAgICBsZXQgY29tcGFyZWRhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgY29tcGFyZWRhdGUuc2V0SG91cnMoTnVtYmVyKGVuZGFyclswXSkpXHJcbiAgICAgICAgY29tcGFyZWRhdGUuc2V0TWludXRlcyhOdW1iZXIoZW5kYXJyWzFdKSlcclxuICAgICAgICBjb21wYXJlZGF0ZS5zZXRTZWNvbmRzKDApXHJcbiAgICAgICAgY29tcGFyZWRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXHJcbiAgICAgICAgbGV0IGxlZnQgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgbGVmdC5zZXRIb3Vycyhjb21wYXJlZGF0ZS5nZXRIb3VycygpLWRhdGUuZ2V0SG91cnMoKSlcclxuICAgICAgICBsZWZ0LnNldE1pbnV0ZXMoY29tcGFyZWRhdGUuZ2V0TWludXRlcygpLWRhdGUuZ2V0TWludXRlcygpKVxyXG4gICAgICAgIGxlZnQuc2V0U2Vjb25kcyhjb21wYXJlZGF0ZS5nZXRTZWNvbmRzKCktZGF0ZS5nZXRTZWNvbmRzKCkpXHJcbiAgICAgICAgY29uc29sZS5sb2cobGVmdClcclxuICAgICAgICB0aW1lLmlubmVySFRNTCA9IGAke2xlZnQuZ2V0SG91cnMoKX3si5zqsIQgJHtsZWZ0LmdldE1pbnV0ZXMoKX3rtoQgJHtsZWZ0LmdldFNlY29uZHMoKX3stIgg64Ko7J2MYFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgSlNPTiBEYXRhIDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdvcms6c3RyaW5nLFxyXG4gICAgICAgICAgICB0aW1lOnN0cmluZyxcclxuICAgICAgICAgICAgZXRjLlxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgd29yay5pbm5lckhUTUwgPSBgJHtnZXRkYXRhLndvcmt9YFxyXG4gICAgICAgXHJcbiAgICAgICBwcmV3b3JrLmlubmVySFRNTCA9IGAke2dldGRhdGEucHJld29ya31gXHJcbiAgICAgICBwcmV0aW1lLmlubmVySFRNTCA9IGAke2dldGRhdGEuc3RhcnR9IOyiheujjGBcclxuXHJcbiAgICAgICBwb3N0d29yay5pbm5lckhUTUwgPSBgJHtnZXRkYXRhLnBvc3R3b3JrfWBcclxuICAgICAgIHBvc3R0aW1lLmlubmVySFRNTCA9IGAke2dldGRhdGEuZW5kfSDsi5zsnpFgXHJcbiAgICB9XHJcbiAgICBmZXRjaFdoYXRUb0RvKCk7XHJcbn0sMTAwMClcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==