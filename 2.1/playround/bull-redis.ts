import Queue from 'bull'
import { Request, ResponseToolkit, Lifecycle } from '@hapi/hapi'
const redisUrl = 'redis://127.0.0.1:6379'

interface HitApi {
    api: string
    inc: number
}
let hitApi: HitApi[] = []

const hitApiQueue = new Queue('last-login', redisUrl)

hitApiQueue.process(async (job, done) => {
    const { apiUrl } = job.data
    const index = hitApi.findIndex(v => apiUrl.includes(v.api))
    if (index === -1) {
        hitApi.push({ api: apiUrl, inc: 1 })
    }
    else hitApi[index].inc++

    done(null, apiUrl)
})

const hitApiAdd: Lifecycle.Method = async (request, h) => {
    const list = request.url.pathname.split('/')
    hitApiQueue.add({ apiUrl: list[list.length - 1] })
    hitApiQueue.on('waiting', (jobId) => {
        console.log(jobId);
    })
    return h.continue
}

export default hitApiAdd
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