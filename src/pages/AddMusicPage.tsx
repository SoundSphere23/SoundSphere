import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Container, HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import { useApiCalls } from "../context/songContext/ApiCalls";
import axios from "axios";
import postData from "../api/postApi";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #767677;
`;

const ButtonContainer = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Button = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 35px;
  background-color: #ccc;
  border-radius: 15px;
  padding: 2px;
  cursor: pointer;
`;

const Slider = styled.div<{ isPrivate: boolean }>`
  height: 20px;
  width: 50%;
  background-color: #fff;
  border-radius: 13px;
  transform: translateX(${({ isPrivate }) => (isPrivate ? "100%" : "0")});
  transition: transform 0.3s ease-in-out;
`;

const Text = styled.span`
  text-align: center;
  color: white;
  position: absolute;
  top: 51.35em;
  left: 8em;
`;

const Input = styled.input`
  height: 26px;
`;
const Select = styled.select`
  height: 26px;
`;
const ButtonSummit = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`;

export const AddMusicPage = () => {
  const { uploadSong } = useApiCalls();
  const { user } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [soundSrc, setSoundSrc] = useState<string>("");
  const [songName, setSongName] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("existing");
  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [imageToUpload, setImageToUpload] = useState<string>("");
  const [songToUpload, setSongToUpload] = useState<string>("");
  const { getAccessTokenSilently: getToken } = useAuth0();

  // Para el genero
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  // Para el nombre de la musica
  const songNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };

  // Para subir la musica
  const soundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setSongToUpload(file);
    if (!file) {
      return null;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSoundSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Para subir la imagen de la musica

  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return null;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setImageToUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Privado o no
  const togglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };
  // Esto pilla el cambio en el select del album y si seleccionas crear uno nuevo te abre un imput para ponerle nombre

  const optionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // Aqui subimos desde la API los generos pero pongo estos de momento
  const availableGenres = [
    { name: "Pop", id: "6564f693cdafe12787660bed" },
    { name: "Rock", id: "6560712d54a3139491bfad8f" },
    { name: "Hip Hop", id: "6564f6b1cdafe12787660bee" },
    { name: "Jazz", id: "6564f6bacdafe12787660bef" },
    { name: "Classical", id: "6564f6c8cdafe12787660bf0" },
    { name: "Electronic", id: "6564f6d4cdafe12787660bf1" },
  ];

  const Submit = async () => {
    const imageData = new FormData();
    imageData.append("file", imageToUpload);
    imageData.append("upload_preset", "UploadImages");

    console.log("IMAGE DATA:", imageData);

    const { data: cloudinaryImage } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmoqsjh7/image/upload",
      imageData
    );
    console.log(cloudinaryImage);

    const songData = new FormData();
    songData.append("file", songToUpload);
    songData.append("upload_preset", "UploadAudio");
    console.log("SONG FILE", songToUpload);

    console.log("SONG DATA:", songData);

    const { data: cloudinarySong } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload",
      songData
    );
    console.log(cloudinarySong);

    const requestData = {
      thumbnail: cloudinaryImage.secure_url,
      url: cloudinarySong.secure_url,
      name: songName,
      genreId: selectedGenre,
      isPublic: true,
      userCreator: user.userId,
    };

    const requestUrl = `song/${user.userId}`;

    try {
      await postData(requestUrl, requestData, getToken);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section>
      <Container>
        <HeaderSection text="Add Music" />
        <ImageContainer>
          {imageSrc ? (
            <Image src={imageSrc} alt="uploaded image" />
          ) : (
            <AiOutlineCamera size={70} />
          )}
        </ImageContainer>

        <ButtonContainer>
          <Input
            type="file"
            accept="image/*"
            onChange={imageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />

          <label htmlFor="image-upload">
            <Button as="span">Add Image</Button>
          </label>

          <Input
            type="file"
            accept="audio/mpeg, audio/mp3"
            onChange={soundUpload}
            style={{ display: "none" }}
            id="sound-upload"
          />

          <label htmlFor="sound-upload">
            <Button as="span">Add sound</Button>
          </label>
        </ButtonContainer>

        <Input
          type="text"
          placeholder="Enter song name"
          value={songName}
          onChange={songNameChange}
        />

        <Select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a genre</option>
          {availableGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>

        <Select value={selectedOption} onChange={optionChange}>
          <option value="existing">Select Existing Album</option>
          <option value="new">Create New Album</option>
        </Select>
        {selectedOption === "new" && (
          <Input
            type="text"
            placeholder="Enter new album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
        )}

        <SwitchContainer onClick={togglePrivacy}>
          <Slider isPrivate={isPrivate} />
        </SwitchContainer>
        <Text>{isPrivate ? "Private" : "Public"}</Text>

        <ButtonSummit onClick={Submit}>Submit</ButtonSummit>
      </Container>
    </section>
  );
};
