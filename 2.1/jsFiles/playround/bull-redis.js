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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bull_1 = __importDefault(require("bull"));
var redisUrl = 'redis://127.0.0.1:6379';
var hitApi = [];
var hitApiQueue = new bull_1.default('last-login', redisUrl);
hitApiQueue.process(function (job, done) { return __awaiter(void 0, void 0, void 0, function () {
    var apiUrl, index;
    return __generator(this, function (_a) {
        apiUrl = job.data.apiUrl;
        index = hitApi.findIndex(function (v) { return apiUrl.includes(v.api); });
        if (index === -1) {
            hitApi.push({ api: apiUrl, inc: 1 });
        }
        else
            hitApi[index].inc++;
        done(null, apiUrl);
        return [2 /*return*/];
    });
}); });
var hitApiAdd = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var list;
    return __generator(this, function (_a) {
        list = request.url.pathname.split('/');
        hitApiQueue.add({ apiUrl: list[list.length - 1] });
        hitApiQueue.on('waiting', function (jobId) {
            console.log(jobId);
        });
        return [2 /*return*/, h.continue];
    });
}); };
exports.default = hitApiAdd;
// const videoQueue = new Queue('Video transcoding', { redis: { port: 6379, host: '127.0.0.1' } })
// const audioQueue = new Queue('Audio transcoding', redisUrl)
// const imageQueue = new Queue('Image transcoding');
// const pdfQueue = new Queue('PDF transcoding')
// pdfQueue.process(function (job) {
//     // Processors can also return promises instead of using the done callback
//     return Promise.resolve('pdf ok');
// });
// videoQueue.process((job, done) => {
//     // job.data contains the custom data passed when the job was created
//     // job.id contains id of this job.
//     // transcode video asynchronously and report progress
//     job.progress(42);
//     // call done when finished
//     done();
//     // or give a error if error
//     done(new Error('error transcoding'));
//     // or pass it a result
//     done(null, { framerate: 29.5 /* etc... */ });
//     // If the job throws an unhandled exception it is also handled correctly
//     throw new Error('some unexpected error');
// })
// audioQueue.process(function (job, done) {
//     // transcode audio asynchronously and report progress
//     job.progress(42);
//     // call done when finished
//     done();
//     // or give a error if error
//     done(new Error('error transcoding'));
//     // or pass it a result
//     done(null, { samplerate: 48000 /* etc... */ });
//     // If the job throws an unhandled exception it is also handled correctly
//     throw new Error('some unexpected error');
// });
// imageQueue.process(function (job, done) {
//     // transcode image asynchronously and report progress
//     job.progress(42);
//     // call done when finished
//     done();
//     // or give a error if error
//     done(new Error('error transcoding'));
//     // or pass it a result
//     done(null, { width: 1280, height: 720 /* etc... */ });
//     // If the job throws an unhandled exception it is also handled correctly
//     throw new Error('some unexpected error');
// });
// videoQueue.add({ video: 'http://example.com/video1.mov' });
// audioQueue.add({ audio: 'http://example.com/audio1.mp3' });
// imageQueue.add({ image: 'http://example.com/image1.tiff' });