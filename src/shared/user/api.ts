export interface User {
  id: string;
  isPremium: boolean;
  yearsActive: number;
  referralCount: number;
  tags: string[];
}

export function getUserData(userId: string): Promise<User> {
  // return mock data for demonstration purposes
  return Promise.resolve({
    id: userId,
    isPremium: true,
    yearsActive: 5,
    referralCount: 0,
    tags: ["developer", "blogger"],
  });
}
