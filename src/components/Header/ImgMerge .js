class ImgMerge {

    constructor(imgs = [], options) {
        // 图片数组默认配置项
        let defaultImgsItem = {
            url: '',
            x: 0,
            y: 0
        };
        // 导出图片的格式与压缩程度默认配置项
        let defaultOpts = {
            type: 'image/jpeg',
            compress: 1
        };

        try {
            imgs.forEach((item, i, arr) => {
                arr[i] = Object.assign({}, defaultImgsItem, item)
            });
        } catch (e) {
            console.error(e);
        }

        this.imgs = imgs;   // 图片数组配置项
        this.opts = Object.assign({}, defaultOpts, options);   // 其他配置项
        this.imgObjs = [];   // 图片对象数组

        this.createCanvas();  // 创建画布
        return this.outputImg();  // 导出图片

    }

    // 创建画布
    createCanvas() {

        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        let w = this.imgs[0].width, h = this.imgs[0].height;
        if (!w) {
            console.error("the first img doesn't set width")
        }
        if (!h) {
            console.error("the first img doesn't set height")
        }

        canvas.width = w;
        canvas.height = h;
        this.ctx = ctx;
    }

    // 绘制图片
    drawImg(i) {

        let img = new Image();
        img.src = this.imgs[i].url;
        this.imgObjs.push(img);

        return new Promise((resolve) => {
            img.onload = resolve;
        });

    }

    drawTextOn(t, position, w, font) {
        const chr = t.split("");
        let temp = "";
        let row = [];
        const x = position.left;
        const y = position.top;
        const {
            font_family = "Microsoft YaHei",
            font_size = 12,
            font_color = "rgb(0, 0, 0, .65)",
            hasFontItalic,
            hasFontWeight,
            text_align = "center",
            outline_color,
            shadow_color,
            outline_size,
            shadow_size
        } = font;
        this.ctx.font = `${font_size}px ${font_family} ${hasFontItalic ? "italic" : ""} ${hasFontWeight ? "bold" : ""}`;
        this.ctx.fillStyle = font_color;
        this.ctx.textAlign = text_align;
        this.ctx.shadowOffsetX = shadow_size;
        this.ctx.shadowOffsetY = shadow_size;
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = shadow_color;

        for (let a = 0; a < chr.length; a++) {
            if (this.ctx.measureText(temp).width < w) {
                ;
            }else {
                row.push(temp);
                temp = "";
            }
            temp += chr[a];
        }

        row.push(temp);

        for (let b = 0; b < row.length; b++) {
            this.ctx.fillText(row[b], x+(w/2), y + (b + 1) * (font_size+3));
            if (outline_size && outline_color) {
                this.ctx.strokeStyle = outline_color;
                this.ctx.lineWidth = outline_size;
                this.ctx.strokeText(row[b], x+(w/2), y + (b + 1) * (font_size+3))
            }
        }
    }

    // 导出图片
    async outputImg() {

        let imgArr = [];
        // 将单张图片的Promise对象存入数组
        this.imgs.forEach((item, i) => {
            imgArr.push(this.drawImg(i));
        });

        // 所有图片加载成功后将图片绘制于Canvas中，后将Canvas导出为图片
        await Promise.all(imgArr);
        this.imgs.forEach((item, i_1) => {
            let drawPara = [this.imgObjs[i_1], this.imgs[i_1].x, this.imgs[i_1].y];
            // 此处判断参数中图片是否设置了宽高，若宽高均设置，则绘制已设置的宽高，否则按照图片默认宽高绘制
            if (this.imgs[i_1].width && this.imgs[i_1].height) {
                drawPara.push(this.imgs[i_1].width, this.imgs[i_1].height);
            }

            this.ctx.drawImage(...drawPara);
            if (this.imgs[i_1].text) {
                this.drawTextOn(this.imgs[i_1].text, this.imgs[i_1].position, this.imgs[i_1].width, this.imgs[i_1].font);
            }

        });
        // 以base64格式导出图片
        return Promise.resolve(this.ctx.canvas.toDataURL(this.opts.type), this.opts.compress);

    }

}

window.ImgMerge = ImgMerge;   //  可用于全局引用
export default ImgMerge;   //  可用于模块化引用