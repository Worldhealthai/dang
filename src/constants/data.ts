// Dog Breeds (AKC Database - Top 100 popular breeds)
export const DOG_BREEDS = [
  'Labrador Retriever',
  'Golden Retriever',
  'German Shepherd',
  'French Bulldog',
  'Bulldog',
  'Beagle',
  'Poodle',
  'Rottweiler',
  'German Shorthaired Pointer',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Doberman Pinscher',
  'Australian Shepherd',
  'Miniature Schnauzer',
  'Cavalier King Charles Spaniel',
  'Shih Tzu',
  'Boston Terrier',
  'Pomeranian',
  'Havanese',
  'Shetland Sheepdog',
  'Brittany',
  'Pembroke Welsh Corgi',
  'Australian Cattle Dog',
  'English Springer Spaniel',
  'Pug',
  'Cocker Spaniel',
  'Border Collie',
  'Maltese',
  'Mastiff',
  'Chihuahua',
  'Basset Hound',
  'Newfoundland',
  'Rhodesian Ridgeback',
  'Shiba Inu',
  'Bernese Mountain Dog',
  'Cane Corso',
  'West Highland White Terrier',
  'Bloodhound',
  'Vizsla',
  'Akita',
  'Collie',
  'Bichon Frise',
  'Papillon',
  'Saint Bernard',
  'Chesapeake Bay Retriever',
  'Bull Terrier',
  'Chinese Shar-Pei',
  'Mixed Breed',
].sort();

// Temperament Tags
export const TEMPERAMENT_TAGS = [
  'Playful',
  'Friendly',
  'Calm',
  'Energetic',
  'Gentle',
  'Protective',
  'Independent',
  'Social',
  'Affectionate',
  'Alert',
  'Loyal',
  'Intelligent',
  'Confident',
  'Adaptable',
  'Patient',
  'Curious',
];

// Activity Levels
export const ACTIVITY_LEVELS = [
  { value: 'low', label: 'Low Energy', description: 'Short walks, mostly relaxing' },
  { value: 'moderate', label: 'Moderate', description: 'Daily walks and playtime' },
  { value: 'high', label: 'High Energy', description: 'Long runs, lots of exercise' },
  { value: 'very_high', label: 'Very High', description: 'Constant activity, working dog' },
];

// Size Categories
export const SIZE_CATEGORIES = [
  { value: 'small', label: 'Small', weightRange: '0-25 lbs' },
  { value: 'medium', label: 'Medium', weightRange: '26-60 lbs' },
  { value: 'large', label: 'Large', weightRange: '61-100 lbs' },
  { value: 'giant', label: 'Giant', weightRange: '100+ lbs' },
];

// Premium Features
export const PREMIUM_FEATURES = {
  gold: [
    { icon: '💛', title: 'Unlimited Likes', description: 'Like as many dogs as you want' },
    { icon: '👀', title: 'See Who Liked You', description: 'Know who swiped right on your pup' },
    { icon: '⭐', title: '5 Super Likes/Day', description: 'Stand out with Super Likes' },
    { icon: '🚀', title: '1 Boost/Month', description: 'Be the top profile in your area' },
    { icon: '⏮️', title: 'Rewind', description: 'Undo accidental swipes' },
    { icon: '🎯', title: 'Advanced Filters', description: 'Filter by specific breeds' },
    { icon: '🚫', title: 'No Ads', description: 'Uninterrupted matching' },
  ],
  platinum: [
    { icon: '💎', title: 'All Gold Features', description: 'Everything from Gold tier' },
    { icon: '⭐', title: 'Unlimited Super Likes', description: 'As many Super Likes as you want' },
    { icon: '🚀', title: '1 Boost/Week', description: 'Weekly visibility boost' },
    { icon: '👑', title: 'Priority Visibility', description: 'Always appear first in the stack' },
    { icon: '💬', title: 'Message Before Match', description: 'Break the ice first' },
    { icon: '🟢', title: 'See Active Status', description: 'Know when matches are online' },
    { icon: '📊', title: 'Profile Insights', description: 'See who viewed your profile' },
    { icon: '👑', title: 'VIP Badge', description: 'Exclusive Platinum badge' },
  ],
};

// Icebreaker Suggestions
export const ICEBREAKERS = [
  "Our dogs would be great playmates! What's their favorite game?",
  "Your pup is adorable! How long have you had them?",
  "I think our dogs would get along great! Where do you usually take them?",
  "Love the photos! What's their favorite treat?",
  "Our dogs seem like a perfect match! Want to arrange a playdate?",
  "Your dog looks so happy! What's their favorite outdoor spot?",
];

// Dog Park Sample Data (would be fetched from API in production)
export const SAMPLE_DOG_PARKS = [
  {
    id: '1',
    name: 'Central Bark Dog Park',
    address: '123 Park Ave',
    rating: 4.5,
    features: ['Fenced', 'Water fountain', 'Small dog area'],
  },
  {
    id: '2',
    name: 'Pawsome Park',
    address: '456 Main St',
    rating: 4.8,
    features: ['Large space', 'Agility equipment', 'Shade'],
  },
  {
    id: '3',
    name: 'Woof Woods',
    address: '789 Forest Rd',
    rating: 4.3,
    features: ['Natural trails', 'Creek access', 'Quiet'],
  },
];
