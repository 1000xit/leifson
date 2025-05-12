export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  credentials: string;
  imageSrc: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: '"Nero took my streams to the next level."',
    name: 'Kato on The Track',
    credentials: '2.1M+ FOLLOWERS, 3B+ VIEWS',
    imageSrc: '/images/katoonthetrack.png',
  },
  {
    id: 2,
    quote: '"Unreal. the best tool out there for livestreams"',
    name: 'Wonderlust Beats',
    credentials: '2.1M+ FOLLOWERS, 3B+ VIEWS',
    imageSrc: '/images/wonderlustbeats.png',
  },
  {
    id: 3,
    quote: '"Nero lowkey changed my life. it quadrupled my revenue"',
    name: 'Futuristic',
    credentials: '1.3M+ FOLLOWERS, 900M+ STREAMS',
    imageSrc: '/images/futuristic.png',
  },
  {
    id: 4,
    quote: '"Our community LOVES nero."',
    name: 'Bridging The Gap',
    credentials: '2M+ FOLLOWERS',
    imageSrc: '/images/bridgingthegap.png',
  },
  // Add more testimonials if needed
]; 