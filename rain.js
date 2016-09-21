/***************************
* Lets instantiate our audio context
***************************/
let audioCtx = new AudioContext();


/***************************
* fetch is sending a request to, in this case, our local webserver.
* arrayBuffer() is being called on our response letting it know we want,
* the data as a binary Array Buffer Object
***************************/

fetch('jackals.wav')
  .then(resp => resp.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    /***************************
    * Here we create a buffer node and pass our decoded audio in.
    * Then we connect it to the context destination and play it w/ start()
    * --- *
    * this is the basic Web Audio API flow
    * 2 node audio-processing graph
    ***************************/
    let srcNode = audioCtx.createBufferSource()
    srcNode.buffer = audioBuffer
    srcNode.connect(audioCtx.destination)
    srcNode.start()
  })
  .catch(err => console.log(err))
