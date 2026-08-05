/**
 * Compresses an image file and returns a smaller data URL along with some metadata.
 * 
 * @param {File} file - The image file to compress.
 * @returns {Promise<{ compressedDataUrl: string, imageInfo: { originalSize: string, dimensions: string } }>}
 */
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided.'));
      return;
    }

    const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const imageInfo = {
          originalSize: originalSizeMB + ' MB',
          dimensions: `${img.width}x${img.height}`
        };
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        resolve({ compressedDataUrl, imageInfo });
      };
      
      img.onerror = () => {
        reject(new Error('حدث خطأ أثناء قراءة الصورة. يرجى تجربة صورة أخرى.'));
      };
      
      img.src = reader.result;
    };
    
    reader.onerror = () => {
        reject(new Error('حدث خطأ أثناء قراءة الملف.'));
    };
    
    reader.readAsDataURL(file);
  });
};
