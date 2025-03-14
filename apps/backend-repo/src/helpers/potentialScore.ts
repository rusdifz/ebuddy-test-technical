export function calculatePotentialScore(totalAverageWeightRatings:number, numberOfRents: number, recentlyActive: number) {
  const weight1 = 100; // first priority for ratings
  const weight2 = 10; // second priority for rent
  const weight3 = 1; // third priority for recent activity
  const timeSinceLastActiveMax = Date.now();

  const weightTotalAverageWeightRatings = (totalAverageWeightRatings*weight1)
  const weightNumberRents = (numberOfRents*weight2)
  const normalizeRecentlyActive = (recentlyActive/timeSinceLastActiveMax)*weight3 

  const potentialScore = weightTotalAverageWeightRatings+weightNumberRents+normalizeRecentlyActive

  return potentialScore
}
