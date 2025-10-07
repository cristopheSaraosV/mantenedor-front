const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/images/optimized';

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuración de optimización
const configs = [
  { suffix: '_webp', format: 'webp', quality: 80 },
  { suffix: '_avif', format: 'avif', quality: 80 },
  { suffix: '_jpg', format: 'jpeg', quality: 85 }
];

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath, config) {
  try {
    const { format, quality } = config;
    const outputFile = outputPath.replace(/\.[^/.]+$/, `${config.suffix}.${format}`);
    
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .toFormat(format, { quality })
      .toFile(outputFile);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputFile)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Función principal
async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('No se encontraron imágenes para optimizar');
    return;
  }

  console.log(`🖼️  Optimizando ${imageFiles.length} imágenes...`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    for (const config of configs) {
      await optimizeImage(inputPath, outputPath, config);
    }
  }

  console.log('🎉 Optimización completada!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };
