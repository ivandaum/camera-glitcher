import Filter from './Filter';

export default class GlitchFilter extends Filter {
    constructor(canvas) {
        super(canvas);

        this.randomValue = this.rand(this.canvas.height/8,this.canvas.height/3);
        this.counter = 0;
    }

    rand(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    update(delta) {
        this.counter++;
        if(this.counter > 60) this.counter = 0;

        // trigger 1 time each 60fps
        if(this.counter < 30) return false; 


        for(let y=0; y<this.canvas.height; y+=this.randomValue) {

            if(this.rand(1,100) < 80) continue;

            let putTo = y;
            let datas = this.context.getImageData(0, putTo, this.canvas.width, this.randomValue);

            for (let i=0;i<datas.data.length;i+=4) {

                let jump = 8 * 10 //this.rand(0,10);
                datas.data[i]   = datas.data[i+jump];
                datas.data[i+1] = datas.data[i+jump+1];
                datas.data[i+2] = datas.data[i+jump+2];
            }
            
            this.context.putImageData(datas,0,putTo);
        }
    }
}