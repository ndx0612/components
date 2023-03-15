function downloadImage(url: string, filename: string) {
  const img = new Image();
  img.crossOrigin = 'anonymous'; // 设置跨域请求
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      try {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = filename;
        link.click();
      } catch (e) {
        console.error(e);
      }
    }
  };
  img.src = url;
}

downloadImage('https://example.com/image.jpg', 'myimage.jpg');
