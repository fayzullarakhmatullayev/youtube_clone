import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setimgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleTags = (e) => setTags(e.target.value.split(","));
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const upoloadTask = uploadBytesResumable(storageRef, file);
    upoloadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setimgPerc(progress) : setVideoPerc(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(upoloadTask.snapshot.ref).then((downloadUrl) => {
          setInputs((prev) => ({ ...prev, urlType: downloadUrl }));
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>&times;</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc.toFixed(0) + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <Desc
          placeholder="Description"
          rows={8}
          onChange={handleChange}
          name="desc"
        />
        <Input
          type="text"
          placeholder="Seperate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc.toFixed(0) + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}

        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
