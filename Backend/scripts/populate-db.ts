import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

import Neighborhood, {IBasicNeighborhoodDTO} from '../models/Neighborhood'; // Ensure the path is correct

const MONGO_URl = 'mongodb://localhost:27017/noy';

// Connect to MongoDB
mongoose
    .connect(MONGO_URl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: unknown) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

const filePath = path.resolve(__dirname, '../db/neighborhoods_data.json');

async function populateDatabase(): Promise<void> {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const neighborhoods: IBasicNeighborhoodDTO[] = JSON.parse(fileData);

        const validNeighborhoods = neighborhoods.map((entry: any) => {
            return {
                neighborhood: entry.neigborhood || 'Unknown Neighborhood',
                city: entry.city || 'Unknown City',
                averageAge: entry['average age'] || null,
                distanceFromCityCenter: entry['distance from city center'] || null,
                averageIncome: entry['average income'] || null,
                publicTransportAvailability: entry['public transport availability'] || 'unknown',
                latitude: entry.latitude || 0,
                longitude: entry.longitude || 0,
            };
        });

        await Neighborhood.deleteMany({});
        console.log('Cleared existing data.');

        await Neighborhood.insertMany(validNeighborhoods);
        console.log('Data successfully inserted into the neighborhoods collection!');

        mongoose.connection.close();
    } catch (error: unknown) {
        console.error('Error while populating database:', error);
        mongoose.connection.close();
        process.exit(1);
    }
}

populateDatabase();
