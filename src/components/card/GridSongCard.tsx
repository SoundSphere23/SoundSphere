import { Button } from "../button/Button";
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiFillHeart,
} from "react-icons/ai";
import {
  SongCardProps,
  GridCard,
  GridCardImage,
  GridCardDescription,
  SongName,
  SongArtist,
} from "./GridCard";
import { FavoriteButton } from "./SongCard";
import { NavIcon } from "../NavBar/NavBar";

export function GridSongCard({
  song,
  toggleFavorite,
  isFavorite,
  addToRecents,
}: Partial<SongCardProps>) {
  if (!song) {
    return null;
  }
  if (!toggleFavorite || !isFavorite || !addToRecents) {
    return null;
  }

  return (
    <GridCard>
      <GridCardImage src={song.thumbnail} alt={song.name} />
      <GridCardDescription>
        <SongName>{song.name}</SongName>
        <SongArtist>{song.artist}</SongArtist>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={AiOutlinePlayCircle} />}
            ariaLabel="Music Player"
            onClick={() => addToRecents(song)}
          />
          <div style={{ color: "var(--clr-accent)" } as React.CSSProperties}>
            <FavoriteButton onClick={() => toggleFavorite(song)}>
              {isFavorite(song.id) ? (
                <AiFillHeart style={{ color: "var(--clr-accent)" }} />
              ) : (
                <AiOutlineHeart />
              )}
            </FavoriteButton>
          </div>
        </div>
      </GridCardDescription>
    </GridCard>
  );
}
