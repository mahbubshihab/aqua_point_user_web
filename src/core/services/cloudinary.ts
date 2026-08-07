export const CLOUDINARY_CONFIG = {
  cloudName: 'rvoym2gw',
  uploadPreset: 'aqua_point',
  baseUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload',
};

/**
 * Transforms or constructs a Cloudinary URL with parameters like crop, quality, format
 */
export const getCloudinaryUrl = (publicIdOrUrl: string, options: { width?: number; height?: number; crop?: string; quality?: string } = {}) => {
  if (!publicIdOrUrl) return '';

  // If it's already a full URL (http/https), return it directly unless it's a Cloudinary URL
  if (publicIdOrUrl.startsWith('http') && !publicIdOrUrl.includes('cloudinary.com')) {
    return publicIdOrUrl;
  }

  const { width = 800, height = 600, crop = 'fill', quality = 'auto' } = options;
  const transformations = `c_${crop},w_${width},h_${height},q_${quality},f_auto`;

  if (publicIdOrUrl.includes('cloudinary.com')) {
    return publicIdOrUrl.replace('/upload/', `/upload/${transformations}/`);
  }

  // Treat as public ID
  return `${CLOUDINARY_CONFIG.baseUrl}/${transformations}/${publicIdOrUrl}`;
};

/**
 * High quality water purifier & aqua equipment sample images hosted on Cloudinary / Unsplash optimized assets
 */
export const SAMPLE_PRODUCT_IMAGES = {
  roPurifier: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=800&q=80',
  mineralPurifier: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
  filterCartridge: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80',
  industrialRo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  membrane: 'https://images.unsplash.com/photo-1585832770485-e68a5fcffd69?auto=format&fit=crop&w=800&q=80',
  uvSterilizer: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
};
