/* eslint-disable react/react-in-jsx-scope */

import { Button } from "..";
import { NavIcon } from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import {
  GridCard,
  ListCard,
  Card,
  GridImageContainer,
  GridCardImage,
  ListCardImage,
  CardImage,
  GridCardDescription,
  ListCardDescription,
  CardDescription,
  SongName,
  SongArtist,
  CommonButtonContainer,
  FullHeart,
  EmptyHeart,
  PlayButton,
  FaveButton,
  Minus,
  Plus,
} from "./card.styled.components";
import { AiOutlinePlayCircle } from "react-icons/ai";
import CardContainerButtons from "./CardContainerButtons";
import { SongCardProps } from "../../Types/SongsTypes";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { useLocation } from "react-router-dom";
import { MYSONGSPAGE } from "../../routes/paths";
import { useContext } from "react";
import { PlayerContext } from "../../context/playerContext/playerContext";

export function SongCard({ song, variant = "card", songs }: SongCardProps) {
  const location = useLocation();
  const CardComponent =
    variant === "grid" ? GridCard : variant === "list" ? ListCard : Card;
  const ImageComponent =
    variant === "grid"
      ? GridCardImage
      : variant === "list"
      ? ListCardImage
      : CardImage;
  const DescriptionComponent =
    variant === "grid"
      ? GridCardDescription
      : variant === "list"
      ? ListCardDescription
      : CardDescription;
  const {
    toggleFavorite,
    isFavorite,
    addToRecents,
    toggleSelected,
    isSelected,
  } = useInteractions();
  const { setCurrentSong, setCurrentList } = useContext(PlayerContext);
  if (!songs) {
    return null;
  }

  return (
    <CardComponent>
      {variant === "grid" && (
        <GridImageContainer
          onClick={() => {
            addToRecents(song);
            setCurrentList(songs);
            setCurrentSong(song);
          }}
        >
          <ImageComponent src={song.thumbnail} alt={song.name} />
        </GridImageContainer>
      )}

      {variant != "grid" && (
        <ImageComponent
          src={song.thumbnail}
          alt={song.name}
          onClick={() => {
            addToRecents(song);
            setCurrentList(songs);
            setCurrentSong(song);
          }}
        />
      )}

      <DescriptionComponent>
        <div>
          <SongName>{song.name}</SongName>
          <SongArtist>{song.artist}</SongArtist>
        </div>
        {variant != "grid" && (
          <CommonButtonContainer>
            <FaveButton
              onClick={() => {
                toggleFavorite(song);
              }}
            >
              {isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
            </FaveButton>
            <FaveButton
              onClick={() => {
                toggleSelected(song);
              }}
            >
              {isSelected(song.id) ? <Minus /> : <Plus />}
            </FaveButton>
          </CommonButtonContainer>
        )}
      </DescriptionComponent>
      {location.pathname === MYSONGSPAGE && (
        <CardContainerButtons song={song} />
      )}
    </CardComponent>
  );
}
