export type Songs = {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
};
export type Category = {
  name: string;
  id: number;
};

export type Artist = {
  id: number;
  name: string;
  genres: string[];
  popularity: number;
  photoUrl: string;
};
