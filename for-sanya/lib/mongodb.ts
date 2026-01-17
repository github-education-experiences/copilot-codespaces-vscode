// MongoDB connection disabled - using frontend/backend only for now
// To re-enable: set MONGODB_URI environment variable and uncomment MongoDB imports

// Mock client for development without MongoDB
const createMockClientPromise = () => {
  return Promise.resolve({
    db: () => ({
      collection: () => ({
        find: () => ({
          sort: () => ({
            toArray: async () => []
          })
        }),
        countDocuments: async () => 0,
        distinct: async () => [],
        aggregate: () => [],
        insertOne: async () => ({ insertedId: Date.now() })
      })
    })
  } as any);
};

let clientPromise: Promise<any>;

if (process.env.MONGODB_URI) {
  // MongoDB support could be re-enabled here if needed
  // For now, we're using frontend/backend only
  clientPromise = createMockClientPromise();
} else {
  // Use mock client when no MongoDB connection
  clientPromise = createMockClientPromise();
}

export default clientPromise;
