class CanvasHelper {
  private canvas: OffscreenCanvas;
  private ctx: OffscreenCanvasRenderingContext2D;
  private originalImage: ImageBitmap;

  constructor(image: ImageBitmap) {
    this.originalImage = image;
    this.canvas = new OffscreenCanvas(image.width, image.height);
    this.ctx = this.canvas.getContext('2d', {
      willReadFrequently: true
    })!;
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.ctx.drawImage(image, 0, 0);
  }

  // 이미지 크기 조정 (Resizing)
  resize(
    width: number,
    padding: number = 10,
    bg: string = 'black'
  ): CanvasHelper {
    const aspectRatio = this.originalImage.height / this.originalImage.width;
    const height = width * aspectRatio; // 원본 이미지 비율에 맞춰 세로 크기 계산

    // 10% 여백 추가
    const padd = padding / 100;
    const paddingX = width * padd; // 가로 여백 (5%씩 좌우 총 10%)
    const paddingY = height * padd; // 세로 여백 (5%씩 상하 총 10%)

    const newWidth = width + paddingX * 2;
    const newHeight = height + paddingY * 2;

    this.canvas.width = newWidth;
    this.canvas.height = newHeight;

    // 배경 채우기
    this.ctx.fillStyle = bg;
    this.ctx.fillRect(0, 0, newWidth, newHeight);

    // 캔버스 중앙에 이미지 배치
    this.ctx.drawImage(this.originalImage, paddingX, paddingY, width, height);

    return this;
  }

  // 그레이스케일 처리 (Grayscale)
  toGrayscale(): CanvasHelper {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r >= 90 && g <= 5 && b <= 5) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }

      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    this.ctx.putImageData(imageData, 0, 0);

    return this;
  }

  // 이진화 처리 (Binarization)
  toBinary(threshold: number = 128): CanvasHelper {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      const color = avg < threshold ? 0 : 255;
      imageData.data[i] = color;
      imageData.data[i + 1] = color;
      imageData.data[i + 2] = color;
    }
    this.ctx.putImageData(imageData, 0, 0);
    return this;
  }

  // 잡음 제거 (Noise Reduction) - 중간값 필터
  applyMedianFilter(windowSize: number = 3): CanvasHelper {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const newImageData = new Uint8ClampedArray(imageData.data.length);
    const halfWindow = Math.floor(windowSize / 2);

    for (let y = halfWindow; y < this.canvas.height - halfWindow; y++) {
      for (let x = halfWindow; x < this.canvas.width - halfWindow; x++) {
        const pixels = [];
        for (let ky = -halfWindow; ky <= halfWindow; ky++) {
          for (let kx = -halfWindow; kx <= halfWindow; kx++) {
            const idx = ((y + ky) * this.canvas.width + (x + kx)) * 4;
            pixels.push(imageData.data[idx]);
          }
        }
        pixels.sort((a, b) => a - b);
        const median = pixels[Math.floor(pixels.length / 2)];
        const idx = (y * this.canvas.width + x) * 4;
        newImageData[idx] = median;
        newImageData[idx + 1] = median;
        newImageData[idx + 2] = median;
        newImageData[idx + 3] = 255;
      }
    }
    imageData.data.set(newImageData);
    this.ctx.putImageData(imageData, 0, 0);
    return this;
  }

  // 이미지 기울기 보정 (Deskew)
  deskew(angle: number): CanvasHelper {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.ctx.drawImage(this.originalImage, 0, 0);
    return this;
  }

  applyBlur(blurRadius: number = 5): CanvasHelper {
    // 블러 필터 적용
    this.ctx.filter = `blur(${blurRadius}px)`;

    // 블러 효과가 적용된 이미지를 다시 그립니다
    this.ctx.drawImage(this.canvas, 0, 0);

    // 필터를 초기화하여 다른 필터에 영향을 주지 않도록 함
    this.ctx.filter = 'none';

    return this;
  }

  applyInvert(rate: number = 5): CanvasHelper {
    this.ctx.filter = `invert(${rate})`;

    this.ctx.drawImage(this.canvas, 0, 0);

    this.ctx.filter = 'none';

    return this;
  }

  // 보정된 이미지를 반환 (toImageData)
  toImageData(): Promise<Blob> {
    return new Promise((resolve) => {
      this.canvas
        .convertToBlob({ type: 'image/png' })
        .then((data) => resolve(data));
    });
  }
}

self.onmessage = async (event) => {
  const { buffer, fileType } = event.data;

  const blob = new Blob([buffer], { type: fileType });

  const imageBitmap = await createImageBitmap(blob);

  const canvasHelper = new CanvasHelper(imageBitmap);

  canvasHelper
    .resize(1200, 10, 'white') // 1200
    .toGrayscale()
    .toBinary(84) // 84
    .applyMedianFilter(Math.round(1300 / imageBitmap.width)); // 3~4
  //.applyBlur(1)
  //.applyInvert(1)

  const processedImage = await canvasHelper.toImageData();

  self.postMessage({ origin: imageBitmap, processed: processedImage });
};
