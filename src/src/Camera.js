export default class Camera {
    constructor(opt) {
        this.video = null;
        this.width = opt.width;
        this.height = opt.height;
        this.success = opt.success;
        this.fail = opt.fail;
        this.capture();
    }

    capture() {
        this.video = document.createElement('video');
        let getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
        
        this.video.addEventListener('canplay', () => {
            this.success();
        });
    
        navigator.mediaDevices.getUserMedia({ video: { width: this.width, height: this.height } })
        .then((stream) => {
            this.video.src = URL.createObjectURL(stream);
            this.video.play();
        })
        .catch((err) => {
            this.fail(err);
        });
  }
}