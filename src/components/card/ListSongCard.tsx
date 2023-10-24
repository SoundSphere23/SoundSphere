import { Button } from "../button/Button";
import { AiOutlineHeart, AiOutlinePlayCircle, AiFillHeart } from 'react-icons/ai';
import { SongCardProps,  SongName, SongArtist, ListCard, ListCardImage, ListCardDescription } from "./ListCard";
import { FavoriteButton } from "./SongCard";
import { NavIcon } from '../NavBar/NavBar';



export function ListSongCard({ song, toggleFavorite, isFavorite, addToRecents }: Partial<SongCardProps>) {
    // La mierda esa del undefined la he resuelto con partial y esto, pero no estoy seguro
    if (!song) {
        return null;
    }
    if (!toggleFavorite || !isFavorite || !addToRecents) {
        return null;
    }

    return (
        <ListCard>
            <ListCardImage src={song.thumbnail} alt={song.name} />
            <ListCardDescription>
                <SongName>{song.name}</SongName>
                <SongArtist>{song.artist}</SongArtist>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlinePlayCircle} />}
                        ariaLabel="Music Player"
                        onClick={()=> addToRecents(song)}
                    />
                    <div style={{color: "var(--clr-accent)"} as React.CSSProperties}> {/* Define the variable somewhere in your styles */}
      <FavoriteButton onClick={() => toggleFavorite(song)}>
        {isFavorite(song.id) ? <AiFillHeart style={{ color: "var(--clr-accent)" }} /> : <AiOutlineHeart />}
      </FavoriteButton>
    </div>

                </div>


            </ListCardDescription>
        </ListCard>
    );
}