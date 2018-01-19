import Camera from './Camera';

export default class Scene {
    constructor(opt) {
        this.canvas = document.querySelector(opt.canvas);

        if(!this.canvas) {
            console.warn(opt.canvas + ' : not a valid DOM element.');
            return false;
        }


        this.canvas.width = opt.width || window.innerWidth;
        this.canvas.height = opt.height || window.innerHeight;
        this.context = this.canvas.getContext('2d');
        this.render = this.render.bind(this);

        this.filters = opt.filters || [];
        this.forEachFilter((ind) => {
            this.filters[ind] = new this.filters[ind](this.canvas); 
        });
        
        this.camera = new Camera({
            width:opt.width,
            height:opt.height,
            success: () => {
                this.render();
            }
        });
    }

    render(delta = 0) {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.drawVideoWithFilters();
        requestAnimationFrame(this.render);
    }

    drawVideoWithFilters() {
        this.context.beginPath();

        this.context.drawImage(this.camera.video,0,0);
        this.forEachFilter((ind, filter) => {
            this.filters[ind].update();
        });

        this.context.closePath();
    }

    createImageFromVideo(callback) {
        let image = new Image();
        image.onload = callback(image);
        image.src = this.canvas.toDataURL('image/jpeg');
    }

    forEachFilter(callback) {
        for(let ind = 0; ind<this.filters.length; ind++) {
            callback(ind, this.filters[ind]);
        }
    }
    
}