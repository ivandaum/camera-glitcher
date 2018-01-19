import Filter from './Filter';

export default class SepiaFilter extends Filter {
    constructor(canvas) {
        super(canvas);
    }

    update(pixel) {
        this.updateData((pixel) => {
            let dark = { r:41, g:10, b:89 },
            light = { r:255, g:124, b:0 };

            let median = ( pixel.r + pixel.g + pixel.b ) / 3;
            let percent = median  / 255;
            let atenuate = 1.2;

            let r = this.interpolate(dark.r, light.r, percent);
            let g = this.interpolate(dark.g, light.g, percent);
            let b = this.interpolate(dark.b, light.b, percent);

            return {
                r:pixel.r + r / atenuate,
                g:pixel.g + g / atenuate,
                b:pixel.b + b / atenuate
            };
        });
    }
}