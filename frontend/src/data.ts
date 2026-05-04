export type PetListing = {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  price: string;
  description: string;
  images: string[];
  featured: boolean;
  stockQuantity: number;
  species?: string;
  breed?: string;
  age?: string;
  categoryId?: number;
};

export const cutePawFallback = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Cute pet placeholder">
    <rect width="256" height="256" rx="48" fill="#fff5ef"/>
    <circle cx="76" cy="88" r="18" fill="#ff9f7a"/>
    <circle cx="104" cy="58" r="18" fill="#ff9f7a"/>
    <circle cx="152" cy="58" r="18" fill="#49c5b6"/>
    <circle cx="180" cy="88" r="18" fill="#49c5b6"/>
    <path d="M128 108c-33 0-60 24-60 54 0 28 22 46 60 46s60-18 60-46c0-30-27-54-60-54z" fill="#ff8a65"/>
    <circle cx="108" cy="164" r="8" fill="#fff" opacity="0.9"/>
    <circle cx="148" cy="164" r="8" fill="#fff" opacity="0.9"/>
  </svg>
`)}`;

export const fallbackCatalog: PetListing[] = [
  // DOGS
  {
    id: 1,
    name: 'Golden Retriever',
    category: 'dogs',
    categoryName: 'Dogs',
    breed: 'Retriever',
    species: 'Dog',
    age: '2 years',
    price: '1200.00',
    description: 'The Golden Retriever is one of the most popular and beloved dog breeds in the world — and for good reason. Known for their warm, sunny temperament and breathtaking golden coat, these dogs are the ultimate family companion. They are highly intelligent, eager to please, and wonderfully patient with children of all ages. Golden Retrievers thrive on human interaction and love to be part of every family activity, from morning jogs to lazy afternoons on the couch. They are natural athletes who excel in obedience, agility, and search-and-rescue work. Their gentle mouth makes them excellent at retrieving without damaging anything. Regular grooming is needed to manage their luscious double coat, and daily exercise keeps them happy and healthy. If you are looking for a loyal, loving, and endlessly cheerful companion, the Golden Retriever is your perfect match.',
    images: ['https://placedog.net/600/400?id=1', 'https://placedog.net/600/400?id=2', 'https://placedog.net/600/400?id=3'],
    featured: true,
    stockQuantity: 3
  },
  {
    id: 2,
    name: 'Labrador Retriever',
    category: 'dogs',
    categoryName: 'Dogs',
    breed: 'Retriever',
    species: 'Dog',
    age: '1.5 years',
    price: '1100.00',
    description: 'The Labrador Retriever consistently ranks as one of the most popular dog breeds worldwide, celebrated for its friendly nature, intelligence, and unwavering loyalty. Labs come in three stunning coat colors — yellow, black, and chocolate — and each one is just as lovable as the next. Originally bred as a working dog for fishermen in Newfoundland, the Lab has an innate love for water and is a powerful swimmer. Their outgoing, even-tempered personality makes them an ideal family pet and an excellent choice for first-time dog owners. They are famously good with children and other animals. Labs are also widely used as guide dogs, therapy dogs, and detection dogs due to their extraordinary trainability. They do require regular exercise and mental stimulation to prevent boredom. A Labrador will give you a lifetime of joy, laughter, and unconditional love.',
    images: ['https://placedog.net/600/400?id=4', 'https://placedog.net/600/400?id=5'],
    featured: true,
    stockQuantity: 4
  },
  {
    id: 3,
    name: 'German Shepherd',
    category: 'dogs',
    categoryName: 'Dogs',
    breed: 'Shepherd',
    species: 'Dog',
    age: '2 years',
    price: '1400.00',
    description: 'The German Shepherd is a breed of extraordinary intelligence, courage, and versatility. Originally developed in Germany for herding and guarding sheep, this breed has become one of the most respected working dogs in the world, serving in roles as a police dog, military dog, search-and-rescue dog, and guide dog. Their loyalty to their family is unmatched — they are deeply devoted, forming strong bonds and being naturally protective without being unnecessarily aggressive. German Shepherds are known for their striking appearance: a muscular, agile body, alert erect ears, and a rich double coat that can be tan and black or sable. They are highly energetic dogs who need substantial daily exercise and mental challenges. With proper socialization and training, a German Shepherd is a calm, confident, and incredibly loving companion that will stand by your side through anything.',
    images: ['https://placedog.net/600/400?id=6', 'https://placedog.net/600/400?id=7'],
    featured: false,
    stockQuantity: 2
  },
  {
    id: 4,
    name: 'French Bulldog',
    category: 'dogs',
    categoryName: 'Dogs',
    breed: 'Bulldog',
    species: 'Dog',
    age: '1 year',
    price: '1600.00',
    description: 'The French Bulldog is a small yet sturdy dog with a big personality that simply cannot be ignored. With their distinctive bat-like ears, smushed face, and compact muscular body, Frenchies are utterly irresistible. They are charming, affectionate, and playful — perfect for city dwellers and apartment living due to their moderate exercise needs. French Bulldogs love being the center of attention and will happily entertain their owners with their clownish antics. Despite their somewhat grumpy expression, they are one of the most sociable and adaptable breeds, getting along well with children, other dogs, and even cats. They rarely bark excessively, which makes them popular with neighbors too. While they love playtime, they are equally happy snuggling on the sofa. Note that their flat face means they are sensitive to heat, so they should always have access to shade and fresh water.',
    images: ['https://placedog.net/600/400?id=8', 'https://placedog.net/600/400?id=9'],
    featured: true,
    stockQuantity: 2
  },
  {
    id: 5,
    name: 'Beagle',
    category: 'dogs',
    categoryName: 'Dogs',
    breed: 'Hound',
    species: 'Dog',
    age: '1.5 years',
    price: '900.00',
    description: 'The Beagle is a merry, curious, and friendly hound dog that has been capturing hearts for centuries. Originally bred for hunting rabbits and hares in packs, Beagles possess an extraordinary sense of smell — one of the best among all dog breeds — and an almost bottomless well of energy. Their classic tri-color coat of black, tan, and white is iconic, and those long droopy ears and big soulful brown eyes make them impossibly endearing. Beagles are pack animals at heart and thrive in family environments where there is always someone around to keep them company. They get along wonderfully with children and other dogs. Due to their scent-driven nature, they can be prone to following their nose, so a secure yard and a leash on walks are essential. They are vocal dogs, known for their melodious howl, which is part of their charm. A Beagle in your home means laughter, adventure, and endless love.',
    images: ['https://placedog.net/600/400?id=10', 'https://placedog.net/600/400?id=11'],
    featured: false,
    stockQuantity: 5
  },

  // CATS
  {
    id: 6,
    name: 'Maine Coon',
    category: 'cats',
    categoryName: 'Cats',
    breed: 'Maine Coon',
    species: 'Cat',
    age: '2 years',
    price: '1300.00',
    description: 'The Maine Coon is the gentle giant of the cat world — a majestic, large-boned breed with a stunning lion-like mane and a personality to match. Native to North America and one of the oldest natural breeds in the United States, the Maine Coon is perfectly adapted for cold climates with its thick, shaggy water-resistant fur and enormous bushy tail. Despite their impressive size, they are known for being extraordinarily affectionate and sociable. Maine Coons often follow their owners from room to room, greeting them at the door like a dog would. They are playful well into adulthood and love interactive toys, puzzle feeders, and climbing trees. Their chirping, trilling vocalizations are unique and endearing. They tend to get along well with children, dogs, and other cats. Grooming their semi-long coat a few times a week keeps it tangle-free and beautiful. A Maine Coon is not just a pet — it is a magnificent companion.',
    images: ['https://loremflickr.com/600/400/mainecoon,cat?lock=1', 'https://loremflickr.com/600/400/mainecoon,cat?lock=2'],
    featured: true,
    stockQuantity: 2
  },
  {
    id: 7,
    name: 'Persian Cat',
    category: 'cats',
    categoryName: 'Cats',
    breed: 'Persian',
    species: 'Cat',
    age: '1.5 years',
    price: '1100.00',
    description: 'The Persian cat is the epitome of feline elegance and luxury. With their long, flowing silky coat, flat expressive face, and large luminous eyes, Persians are often described as living works of art. They carry themselves with a regal, calm demeanor that makes them the perfect lap cat for someone who appreciates a gentle and undemanding companion. Persians are quiet and sweet-natured, preferring a serene home environment over boisterous activity. They are not great jumpers or climbers, and they are content to drape themselves over a favorite cushion for hours. Despite their glamorous appearance, Persians are actually quite laid-back and adaptable. Their coat does require daily grooming to prevent matting and keep it looking its gorgeous best. Their flat face also needs regular cleaning around the eye area. If you are looking for a graceful, affectionate, and visually stunning companion who loves peaceful home life, the Persian is your perfect match.',
    images: ['https://loremflickr.com/600/400/persiancat?lock=3', 'https://loremflickr.com/600/400/persiancat?lock=4'],
    featured: false,
    stockQuantity: 3
  },
  {
    id: 8,
    name: 'Bengal Cat',
    category: 'cats',
    categoryName: 'Cats',
    breed: 'Bengal',
    species: 'Cat',
    age: '1 year',
    price: '1800.00',
    description: 'The Bengal cat is a breathtaking hybrid breed that looks like a miniature leopard — wild, exotic, and absolutely stunning. Created by crossing domestic cats with the Asian Leopard Cat, Bengals have a distinctive spotted or marbled coat in rich shades of gold, brown, and black that literally shimmers in the light. But Bengals are not just beautiful — they are highly intelligent, curious, and incredibly active cats that need plenty of mental and physical stimulation every day. They love to climb to the highest point in any room, hunt toy mice with focused intensity, and even play in water, which is unusual for a cat. Bengals form strong bonds with their people and can be surprisingly affectionate, though they tend to be vocal and demanding of attention. They do best in homes where someone is around regularly and where they have space to roam and play. Owning a Bengal is an adventure — a wild, beautiful, endlessly entertaining adventure.',
    images: ['https://loremflickr.com/600/400/bengalcat?lock=5', 'https://loremflickr.com/600/400/bengalcat?lock=6'],
    featured: true,
    stockQuantity: 1
  },
  {
    id: 9,
    name: 'Siamese Cat',
    category: 'cats',
    categoryName: 'Cats',
    breed: 'Siamese',
    species: 'Cat',
    age: '2 years',
    price: '950.00',
    description: 'The Siamese cat is one of the oldest and most recognizable cat breeds in the world, instantly identified by its striking color-point coat, piercing sapphire-blue eyes, and sleek, elegant body. Originating from ancient Siam (now Thailand), the Siamese has a rich history as a sacred companion to royalty. But beyond their stunning looks, it is their personality that truly sets them apart. Siamese cats are extraordinarily social, vocal, and intelligent — often described as the most "dog-like" of cat breeds. They love to have conversations with their owners in their distinctive loud, raspy meow and will follow you from room to room demanding your attention and affection. They do not tolerate being alone for long periods and thrive best in homes where they have constant companionship — whether human or another pet. They are highly playful and benefit from interactive toys and puzzle games. A Siamese is not just a cat — it is a charismatic, opinionated, deeply loving best friend.',
    images: ['https://loremflickr.com/600/400/siamesecat?lock=7', 'https://loremflickr.com/600/400/siamesecat?lock=8'],
    featured: false,
    stockQuantity: 4
  },
  {
    id: 10,
    name: 'British Shorthair',
    category: 'cats',
    categoryName: 'Cats',
    breed: 'British Shorthair',
    species: 'Cat',
    age: '1.5 years',
    price: '1050.00',
    description: 'The British Shorthair is the teddy bear of the cat world — round, plush, and utterly huggable. This ancient breed, one of the oldest in Britain, is known for its stocky, powerful build, broad face with chubby cheeks, and dense, plush coat that comes in a mesmerizing array of colors, with the famous "British Blue" being the most iconic. British Shorthairs have a calm, dignified, and undemanding personality that makes them one of the easiest cats to live with. They are affectionate without being overly clingy — they enjoy being near their family but are not constant lap cats. They tend to be quietly devoted, following you with their eyes rather than their paws. British Shorthairs are adaptable and get along well with children, dogs, and other cats. Their short, dense coat requires minimal grooming. They are not very vocal and carry themselves with a quiet confidence. If you want a laid-back, loving, and visually stunning companion, the British Shorthair is an outstanding choice.',
    images: ['https://loremflickr.com/600/400/britishshorthair?lock=9', 'https://loremflickr.com/600/400/britishshorthair?lock=10'],
    featured: false,
    stockQuantity: 3
  },

  // BIRDS
  {
    id: 11,
    name: 'Macaw',
    category: 'birds',
    categoryName: 'Birds',
    breed: 'Macaw',
    species: 'Bird',
    age: '3 years',
    price: '2500.00',
    description: 'The Macaw is arguably the most spectacular parrot in the world — a living, flying rainbow of extraordinary intelligence and personality. With wingspans reaching up to four feet and plumage that blazes in vivid scarlets, royal blues, sunny yellows, and emerald greens, the Macaw is a truly awe-inspiring creature. Native to the rainforests of Central and South America, they are highly social birds that form lifelong pair bonds in the wild and will extend that same devotion to their human family in captivity. Macaws are gifted mimics who can learn dozens of words, phrases, and even songs, and they love showing off their vocabulary. They are curious, playful, and need a tremendous amount of daily interaction, mental stimulation, and out-of-cage time. They require large cages, a varied diet of fruits, vegetables, nuts, and seeds, and plenty of chewable toys to keep their powerful beaks busy. Owning a Macaw is a lifelong commitment — they can live 50 to 80 years — but the bond you build with one is unlike anything else in the world.',
    images: ['https://loremflickr.com/600/400/macaw,bird?lock=11', 'https://loremflickr.com/600/400/macaw,bird?lock=12'],
    featured: true,
    stockQuantity: 1
  },
  {
    id: 12,
    name: 'Cockatoo',
    category: 'birds',
    categoryName: 'Birds',
    breed: 'Cockatoo',
    species: 'Bird',
    age: '2 years',
    price: '2000.00',
    description: 'The Cockatoo is one of the most affectionate and emotionally complex birds you can keep as a companion — a feathered friend that will love you with its entire heart. With their dramatic, fanned crest that rises when they are excited or alarmed, their powder-white or salmon-pink plumage, and their warm, expressive eyes, Cockatoos are visually stunning birds. But it is their personality that truly captivates owners. They are deeply social and bond intensely with their human family, craving attention and physical affection like no other bird. They love to be cuddled, scratched behind the crest, and held close. This same intensity means they can suffer from separation anxiety if left alone too long, so they are best suited for owners who are home frequently. Cockatoos are also talented talkers and entertainers — they will dance, sing, and perform to get your attention. A properly socialized Cockatoo is a warm, joyful, and endlessly entertaining companion for the right family.',
    images: ['https://loremflickr.com/600/400/cockatoo,bird?lock=13', 'https://loremflickr.com/600/400/cockatoo,bird?lock=14'],
    featured: false,
    stockQuantity: 2
  },
  {
    id: 13,
    name: 'Lovebird',
    category: 'birds',
    categoryName: 'Birds',
    breed: 'Lovebird',
    species: 'Bird',
    age: '1 year',
    price: '400.00',
    description: 'Lovebirds are small, vibrant, and full of personality — a big bird spirit packed into a tiny, jewel-colored body. Native to Africa, these compact parrots come in a stunning rainbow of colors including bright green, peach-faced with coral, and electric blue. They earned their romantic name from the devoted, pair-bonded relationships they form in the wild — and they will readily transfer that deep affection to their human owners. Hand-raised Lovebirds become wonderfully tame and enjoy sitting on your shoulder, playing with toys, and exploring their surroundings. They are energetic, curious, and surprisingly vocal for their size, chattering happily throughout the day. While they do not typically talk like larger parrots, they more than make up for it with their playful antics and cheerful personalities. Lovebirds are a great choice for beginner bird owners who want an interactive, affectionate companion. They need a spacious cage, daily interaction, and plenty of toys to keep their active minds engaged.',
    images: ['https://loremflickr.com/600/400/lovebird?lock=15', 'https://loremflickr.com/600/400/lovebird?lock=16'],
    featured: false,
    stockQuantity: 8
  },
  {
    id: 14,
    name: 'Parakeet',
    category: 'birds',
    categoryName: 'Birds',
    breed: 'Parakeet',
    species: 'Bird',
    age: '6 months',
    price: '250.00',
    description: 'The Parakeet, also known as the Budgerigar or simply "Budgie," is one of the most popular pet birds in the world — and it is easy to see why. These small, colorful birds are incredibly charming, full of personality, and surprisingly intelligent. They come in a dazzling spectrum of colors including bright greens, sky blues, sunny yellows, vibrant violets, and pure white. Despite their small size, Parakeets are big talkers — with patience and daily interaction, many learn to mimic words, phrases, and even whistled tunes with impressive clarity. They are social birds that thrive on interaction with their owners and will happily ride on your shoulder, preen your hair, and show genuine affection. A pair of Parakeets will keep each other company beautifully, though be warned — two birds can be twice the chirping fun! They require a roomy cage, a varied diet, and daily enrichment. For families, children, or first-time bird owners, a Parakeet is a wonderful, joyful, low-maintenance feathered companion.',
    images: ['https://loremflickr.com/600/400/parakeet?lock=17', 'https://loremflickr.com/600/400/parakeet?lock=18'],
    featured: true,
    stockQuantity: 12
  },
  {
    id: 15,
    name: 'Canary',
    category: 'birds',
    categoryName: 'Birds',
    breed: 'Canary',
    species: 'Bird',
    age: '1 year',
    price: '150.00',
    description: 'The Canary is a legendary songbird whose beautiful, complex, and melodious song has enchanted humans for centuries. Originally from the Canary Islands off the coast of Africa, these small finches have been bred by humans for over 500 years, resulting in dozens of varieties ranging from the classic sunshine-yellow Canary to vibrant reds, rich oranges, pure whites, and elegant greens. Male Canaries are particularly famous for their extraordinary singing ability — a rolling, sustained musical performance that fills a room with natural beauty. Canaries are independent birds that do not necessarily need constant handling to be happy; in fact, many prefer to be admired from nearby rather than picked up. They are a perfect pet for someone who wants a cheerful, visually beautiful, and musically gifted companion without the demands of a highly interactive parrot. They do require fresh food and water daily, a clean, spacious cage, and exposure to natural light to encourage singing. A Canary brings nature\'s music into your home every single day.',
    images: ['https://loremflickr.com/600/400/canary,bird?lock=19', 'https://loremflickr.com/600/400/canary,bird?lock=20'],
    featured: false,
    stockQuantity: 6
  },

  // FISHES
  {
    id: 16,
    name: 'Betta Fish',
    category: 'fishes',
    categoryName: 'Fishes',
    breed: 'Siamese Fighting Fish',
    species: 'Fish',
    age: '1 year',
    price: '85.00',
    description: 'The Betta Fish, also known as the Siamese Fighting Fish, is one of the most visually stunning freshwater fish in the aquarium hobby. Native to the shallow rice paddies and slow-moving streams of Southeast Asia, Bettas have evolved dramatic, flowing fins and tails that billow like silken fabric in the water, displaying a breathtaking spectrum of colors — deep royal blues, flaming reds, vivid purples, emerald greens, and iridescent multicolor combinations. Each Betta has a unique personality and will often recognize and respond to their owner\'s presence at the tank. They are relatively hardy and low-maintenance compared to many other fish, making them excellent for beginners. One critical rule: male Bettas must always be kept alone, as they are fiercely territorial and will fight other males to the death — hence their name. They thrive in tanks of at least 5 gallons with a gentle filter, a heater to maintain tropical temperatures, and plenty of silk or live plants to explore and rest on. A Betta is a living jewel that brings color and life to any space.',
    images: ['https://loremflickr.com/600/400/bettafish?lock=21', 'https://loremflickr.com/600/400/bettafish?lock=22'],
    featured: true,
    stockQuantity: 15
  },
  {
    id: 17,
    name: 'Goldfish',
    category: 'fishes',
    categoryName: 'Fishes',
    breed: 'Goldfish',
    species: 'Fish',
    age: '2 years',
    price: '45.00',
    description: 'The Goldfish is one of humanity\'s oldest and most beloved pet animals, with a history of domestication stretching back over a thousand years in ancient China. What began as a selective breeding project with dull carp has resulted in one of the most diverse and beautiful fish in the world, available in an astounding variety of body shapes, fin styles, and colors ranging from classic shimmering gold and orange, to white, black, calico, and multi-colored varieties. Contrary to popular myth, Goldfish are actually quite intelligent — they can recognize their owners, learn simple tricks, and even navigate mazes. They can also live remarkably long lives; well-cared-for Goldfish regularly reach 10 to 15 years, with some record holders living well past 20. They are social fish that do best in groups and thrive in spacious tanks with good filtration, as they produce a lot of waste. A proper setup with clean water, a varied diet, and companions makes for a thriving, energetic, and genuinely delightful Goldfish. They are a timeless, rewarding pet for all ages.',
    images: ['https://loremflickr.com/600/400/goldfish?lock=23', 'https://loremflickr.com/600/400/goldfish?lock=24'],
    featured: false,
    stockQuantity: 20
  },
  {
    id: 18,
    name: 'Neon Tetra',
    category: 'fishes',
    categoryName: 'Fishes',
    breed: 'Tetra',
    species: 'Fish',
    age: '6 months',
    price: '15.00',
    description: 'The Neon Tetra is a small but extraordinarily beautiful freshwater fish that is one of the most popular aquarium fish in the entire world — and once you see a school of them, it is immediately obvious why. Their slender silver bodies are adorned with a vivid, electric-blue horizontal stripe running from nose to tail, and a bright cherry-red stripe that lights up the lower half of the body from the tail forward. In a well-planted aquarium, a group of Neon Tetras moving in synchronized formation looks like a living neon sign — genuinely mesmerizing. They are peaceful schooling fish that must be kept in groups of at least 6 to feel secure and display their most natural behavior; a group of 10 or more is ideal. Neon Tetras are hardy, adaptable, and peaceful with other small, non-aggressive fish, making them perfect for community aquariums. They prefer slightly soft, acidic water with plenty of plants and hiding spots, and a dim, natural-feeling environment brings out their colors most brilliantly. For beginners and experienced aquarists alike, Neon Tetras are an essential, magical addition to any tank.',
    images: ['https://loremflickr.com/600/400/neontetra?lock=25', 'https://loremflickr.com/600/400/neontetra?lock=26'],
    featured: false,
    stockQuantity: 50
  },
  {
    id: 19,
    name: 'Angelfish',
    category: 'fishes',
    categoryName: 'Fishes',
    breed: 'Angelfish',
    species: 'Fish',
    age: '1 year',
    price: '35.00',
    description: 'The Angelfish is one of the most graceful and recognizable freshwater aquarium fish in the world. With their distinctive triangular, laterally compressed body, dramatically elongated dorsal and anal fins, and beautiful vertical striping, Angelfish have an almost otherworldly, majestic presence in the aquarium. They glide through the water with slow, deliberate elegance, like living sculptures in constant motion. Native to the Amazon River basin in South America, Angelfish are cichlids — a family known for intelligence and personality — and they do not disappoint. They can recognize their owners, learn feeding times, and will often swim to the front of the tank when they see a familiar face. Angelfish are moderately easy to care for but do require a tall aquarium (at least 20 gallons) to accommodate their fin height. They prefer warm, slightly acidic water and a densely planted environment that mimics their natural habitat. They can be kept with other peaceful fish of similar size, though they may eat very small fish like Neon Tetras. Angelfish are a showpiece for any aquarium — elegant, intelligent, and absolutely stunning.',
    images: ['https://loremflickr.com/600/400/angelfish?lock=27', 'https://loremflickr.com/600/400/angelfish?lock=28'],
    featured: true,
    stockQuantity: 10
  },
  {
    id: 20,
    name: 'Clownfish',
    category: 'fishes',
    categoryName: 'Fishes',
    breed: 'Clownfish',
    species: 'Fish',
    age: '1.5 years',
    price: '120.00',
    description: 'The Clownfish — made world-famous by the animated film "Finding Nemo" — is one of the most charming, recognizable, and captivating saltwater fish you can keep in a marine aquarium. With their bold orange body wrapped in brilliant white bands outlined in black, every Clownfish looks like a tiny, cheerful sunset swimming through your tank. In the wild, Clownfish live in a fascinating symbiotic relationship with sea anemones — they are immune to the anemone\'s stinging tentacles and shelter within them for protection, while the anemone benefits from the Clownfish cleaning it and driving away predators. In captivity, pairing a Clownfish with a host anemone recreates this magical natural behavior and makes for a stunning display. Clownfish are relatively hardy for a saltwater species and are often recommended as a starter fish for those new to marine aquariums. They are bold, curious, and personable fish that will swim to the front of the tank and interact with observers. They should be kept in pairs and thrive in a well-maintained reef aquarium. A Clownfish is a piece of the ocean — and a piece of magic — in your own home.',
    images: ['https://loremflickr.com/600/400/clownfish?lock=29', 'https://loremflickr.com/600/400/clownfish?lock=30'],
    featured: true,
    stockQuantity: 8
  }
];
