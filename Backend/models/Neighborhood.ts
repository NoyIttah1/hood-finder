import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IBasicNeighborhoodDTO {
    neighborhood: string;
    city: string;
    averageAge?: number;
    distanceFromCityCenter?: number;
    averageIncome?: number;
    publicTransportAvailability?: string;
    latitude: number;
    longitude: number;
}

export interface IDBNeighborhoodDTO extends IBasicNeighborhoodDTO, Document {
    _id: Types.ObjectId;
}

export interface INeighborhoodOutDTO extends IBasicNeighborhoodDTO {
    id: string;
}

const NeighborhoodSchema = new Schema<IDBNeighborhoodDTO>({
    neighborhood: {type: String, required: true},
    city: {type: String, required: true},
    averageAge: {type: Number},
    distanceFromCityCenter: {type: Number},
    averageIncome: {type: Number},
    publicTransportAvailability: {type: String},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
});

const Neighborhood = mongoose.model<IDBNeighborhoodDTO>('Neighborhood', NeighborhoodSchema);
export default Neighborhood;


export class NeighborhoodDTOConverter {
    public static convertFromDBToOut(neighborhood: IDBNeighborhoodDTO) {
        const outNeighborhood: INeighborhoodOutDTO = {
            id: neighborhood._id.toString(),
            averageAge: neighborhood.averageAge,
            city: neighborhood.city,
            longitude: neighborhood.longitude,
            averageIncome: neighborhood.averageIncome,
            distanceFromCityCenter: neighborhood.distanceFromCityCenter,
            neighborhood: neighborhood.neighborhood,
            latitude: neighborhood.latitude,
            publicTransportAvailability: neighborhood.publicTransportAvailability,
        }
        return outNeighborhood;
    }
}