export interface Cat {
    id: string;
    url: string;
}

export interface Breed {
    id: number;
    name: string;
}

export interface BreedInfo {
    id: number;
    name: string;
    origin: string;
    temperament: string;
    description: string;
}

export interface CatInfo {
    id: string;
    url: string;
    breeds: BreedInfo[];
}