import mongoose, { Schema, Document } from 'mongoose';

export interface INeighborhood extends Document {
    neighborhood: string;
    city: string;
    averageAge?: number;
    distanceFromCityCenter?: number;
    averageIncome?: number;
    publicTransportAvailability?: string;
    latitude: number;
    longitude: number;
}

const NeighborhoodSchema = new Schema<INeighborhood>({
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    averageAge: { type: Number },
    distanceFromCityCenter: { type: Number },
    averageIncome: { type: Number },
    publicTransportAvailability: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

const Neighborhood = mongoose.model<INeighborhood>('Neighborhood', NeighborhoodSchema);
export default Neighborhood;
