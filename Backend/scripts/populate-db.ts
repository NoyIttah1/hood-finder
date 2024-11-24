import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

import Neighborhood, {INeighborhood} from '../models/Neighborhood'; // Ensure the path is correct

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

// Function to populate the database
async function populateDatabase(): Promise<void> {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const neighborhoods: INeighborhood[] = JSON.parse(fileData);

        const validNeighborhoods = neighborhoods.map((entry: any) => {
            // Map JSON fields to schema fields
            return {
                neighborhood: entry.neigborhood || 'Unknown Neighborhood', // Correcting 'neigborhood'
                city: entry.city || 'Unknown City',
                averageAge: entry['average age'] || null, // Correcting 'average age'
                distanceFromCityCenter: entry['distance from city center'] || null, // Correcting 'distance from city center'
                averageIncome: entry['average income'] || null, // Correcting 'average income'
                publicTransportAvailability: entry['public transport availability'] || 'unknown', // Correcting 'public transport availability'
                latitude: entry.latitude || 0,
                longitude: entry.longitude || 0,
            };
        });


        // Clear existing data and insert valid entries
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

// Execute the function
populateDatabase();
