import Filter from './Filter';

export default class BlackAndWhiteFilter extends Filter {
    constructor(canvas) {
        super(canvas);
    }

    update(pixel) {
        this.updateData((pixel) => {

            let median = (pixel.r + pixel.g + pixel.b) / 3;
            return {
                r:median,
                g:median,
                b:median
            };
        });
    }
}