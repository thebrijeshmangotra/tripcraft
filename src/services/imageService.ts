interface TravelImage {
  src: string;
  alt: string;
  fallback: string;
}

class ImageService {
  private static instance: ImageService;
  private travelImages: TravelImage[] | null = null;

  private constructor() {}

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  async getTravelImages(): Promise<TravelImage[]> {
    if (this.travelImages) {
      return this.travelImages;
    }

    try {
      const categories = ['car', 'hotel', 'bus', 'airplane'];
      const fallbacks = ['🚗', '🏨', '🚌', '✈️'];
      
      this.travelImages = categories.map((category, index) => ({
        src: `https://picsum.photos/100/100?random=${Date.now() + index}&blur=0`,
        alt: category.charAt(0).toUpperCase() + category.slice(1),
        fallback: fallbacks[index]
      }));

      return this.travelImages;
    } catch (error) {
      // Fallback to static images if API fails
      return [
        { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center", alt: "Car", fallback: "🚗" },
        { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center", alt: "Hotel", fallback: "🏨" },
        { src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center", alt: "Bus", fallback: "🚌" },
        { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center", alt: "Plane", fallback: "✈️" },
      ];
    }
  }
}

export const imageService = ImageService.getInstance();
export type { TravelImage };
