export type IntroProfile = {
  id: string
  name: string
  age: number
  bio: string
  portrait: string
}

export type MatchProfile = IntroProfile & {
  location: string
  occupation: string
  school: string
  instagram: string
  gallery: string[]
}

export const weeklyIntros: IntroProfile[] = [
  { id: 'alex', name: 'Alex', age: 31, bio: 'Architect who collects vintage guitars and passport stamps.', portrait: 'alex' },
  { id: 'ben', name: 'Ben', age: 28, bio: 'Coffee fanatic. Road trip enthusiast. Browns sufferer.', portrait: 'ben' },
  { id: 'chris', name: 'Chris', age: 32, bio: 'Surfer, chef, dog dad. Always up for something real.', portrait: 'chris' },
  { id: 'david', name: 'David', age: 30, bio: 'Entrepreneur with a weakness for live music and late nights.', portrait: 'david' },
  { id: 'matt', name: 'Matt', age: 29, bio: 'Loves to write, play tennis, and laugh too loud.', portrait: 'matt' },
]

export const incomingMatches: MatchProfile[] = [
  { id: 'samantha', name: 'Samantha', age: 29, bio: 'Marketing manager who loves long walks and good coffee.', portrait: 'samantha', location: 'Los Angeles, CA', occupation: 'Marketing Manager', school: 'USC', instagram: '@samanthalee', gallery: ['studio', 'coast', 'coffee', 'dog', 'city'] },
  { id: 'olivia', name: 'Olivia', age: 31, bio: 'Designer, dog person, and always planning her next trip.', portrait: 'olivia', location: 'Santa Monica, CA', occupation: 'Product Designer', school: 'UCLA', instagram: '@oliviawest', gallery: ['coast', 'studio', 'city'] },
  { id: 'maya', name: 'Maya', age: 27, bio: 'Yoga teacher, wellness lover, and beach sunset chaser.', portrait: 'maya', location: 'Venice, CA', occupation: 'Yoga Instructor', school: 'LMU', instagram: '@mayamoves', gallery: ['studio', 'coast', 'coffee'] },
  { id: 'elena', name: 'Elena', age: 30, bio: 'Finance professional with a love for live music and date nights.', portrait: 'elena', location: 'West Hollywood, CA', occupation: 'Finance Director', school: 'NYU', instagram: '@elenanights', gallery: ['city', 'coffee', 'coast'] },
]
