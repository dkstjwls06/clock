"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //express
const promises_1 = __importDefault(require("fs/promises"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const core_1 = require("@js-joda/core");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const path_1 = __importDefault(require("path"));
app.use(/.+\.js$/, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = path_1.default.resolve(__dirname, '..', '..', 'frontend', `dist${req.originalUrl}`);
    try {
        yield promises_1.default.access(result);
        res.sendFile(path_1.default.basename(result), {
            root: path_1.default.dirname(result)
        });
    }
    catch (err) {
        next();
    }
}));
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
})
    .get('/clockimg', (req, res) => {
    res.sendFile('clock.png', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/img')
    });
});
let random = 0;
app.get('/background', (req, res) => {
    random++;
    if (random >= 5)
        random = 1;
    res.sendFile(`${random}.jpg`, {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/img/background')
    });
});
const weekendTime = [810, 850, 900, 1020, 1040, 1200, 1400, 1600, 1620, 1800, 2000, 2100, 2120, 2230];
const weekendTimetable = [
    '아침식사',
    '인원점검',
    '자습 T1',
    '휴식',
    '자습 T2',
    '점심식사',
    '자습 T3',
    '휴식',
    '자습 T4',
    '저녁식사',
    '자습 T5',
    '휴식',
    '자습 T6',
    '생활관'
];
const weekdaystime = [740, 815, 845, 900, 950, 1000, 1050, 1100, 1050, 1200, 1250, 1350, 1440, 1450, 1540, 1550, 1640, 1700, 1710, 1750, 1755, 1835, 1950, 2110, 2130, 2140, 2230];
const weekdaysTimetable = [
    '아침식사',
    '아침자습',
    '담임조회',
    '1교시',
    '쉬는시간',
    '2교시',
    '쉬는시간',
    '3교시',
    '쉬는시간',
    '4교시',
    '쉬는시간',
    '점심식사',
    '5교시',
    '쉬는시간',
    '6교시',
    '쉬는시간',
    '7교시',
    '청소',
    '종례',
    '오후자습 1',
    '휴식',
    '오후자습 2',
    '저녁식사',
    '아갼자습 1',
    '휴식',
    '야간자습 2',
    '생활관'
];
const weekends = ['토', '일'];
const isweek = (arr, val) => {
    return arr.some(function (arrVal) {
        return val === arrVal;
    });
};
app.post('/getWhatToDo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const raw = core_1.LocalTime.now();
    if (Number(raw._hour < 10))
        raw._hour = '0' + String(raw._hour);
    if (Number(raw._minute) < 10)
        raw._minute = '0' + String(raw._minute);
    const now = Number(String(raw._hour) + String(raw._minute));
    const dayOfWeek = req.body.dayOfWeek;
    if (!isweek(weekends, dayOfWeek)) {
        if (now > 740 && now < 2230) { //형식 : 할일, 이전 일, 끝난 시간, 다음일, 다음일 시작 시간
            for (let i = 0; i < weekdaystime.length - 1; i++) {
                if (now >= weekdaystime[i] && now < weekdaystime[i + 1]) {
                    if (i == 0) {
                        res.json({ work: weekdaysTimetable[i], prework: '생활관', start: `${weekdaystime[i]}`, postwork: weekdaysTimetable[i + 1], end: `${weekdaystime[i + 1]}` });
                        return;
                    }
                    // else if(i == weekdaystime.length-2){
                    //     res.json({work:weekdaysTimetable[i],prework:weekdaysTimetable[i-1],start:`${weekdaystime[i]}` ,postwork:weekdaysTimetable[i+1],end:`${weekdaystime[i+1]}`})
                    //     return
                    // }
                    res.json({ work: weekdaysTimetable[i], prework: weekdaysTimetable[i - 1], start: `${weekdaystime[i]}`, postwork: weekdaysTimetable[i + 1], end: `${weekdaystime[i + 1]}` });
                    return;
                }
            }
        }
        else {
            if (dayOfWeek == '금') {
                res.json({ work: '생활관', prework: '야간자습 2', start: '2230', postwork: '아침식사', end: '810' });
                return;
            }
            res.json({ work: '생활관', prework: '야간자습 2', start: '2230', postwork: '아침식사', end: '740' });
            return;
        }
    }
    else {
        if (now > 810 && now < 2230) {
            for (let i = 0; i < weekendTime.length - 1; i++) {
                if (now >= weekendTime[i] && now < weekendTime[i + 1]) {
                    if (i == 0) {
                        res.json({ work: weekendTimetable[i], prework: '생활관', start: `${weekendTime[i]}`, postwork: weekendTimetable[i + 1], end: `${weekendTime[i + 1]}` });
                        return;
                    }
                    // else if(i == weekendTime.length-2){
                    //     res.json({work:weekendTimetable[i],prework:weekendTimetable[i-1],start:`${weekendTime[i]}` ,postwork:weekendTimetable[i+1],end:`${weekendTime[i+1]}`})
                    //     return
                    // }
                    res.json({ work: weekendTimetable[i], prework: weekendTimetable[i - 1], start: `${weekendTime[i]}`, postwork: weekendTimetable[i + 1], end: `${weekendTime[i + 1]}` });
                    return;
                }
            }
        }
        else {
            if (dayOfWeek == '토') {
                res.json({ work: '생활관', prework: '야간자습 2', start: '2230', postwork: '아침식사', end: '810' });
                return;
            }
            if (dayOfWeek == '일') {
                res.json({ work: '생활관', prework: '야간자습 2', start: '2230', postwork: '아침식사', end: '740' });
                return;
            }
        }
    }
}));
app.listen(80, () => { console.log('Server ready'); });
//# sourceMappingURL=index.js.map