import Filter from './Filter';

export default class NoiseFilter extends Filter {
    constructor(canvas) {
        super(canvas);
    }

    rand(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    update(pixel) {
        this.updateData((pixel) => {
            
            let random = this.rand(0, 100) > 50;
            let newPixel = pixel;

            if(random) {
                let to = { r:255, g:255, b:255 };
                let intensity = 0.15;

                newPixel = {
                    r: this.interpolate(newPixel.r, to.r, intensity),
                    g: this.interpolate(newPixel.g, to.g, intensity),
                    b: this.interpolate(newPixel.b, to.b, intensity)
                }
            }

            return newPixel;
        });
    }
}