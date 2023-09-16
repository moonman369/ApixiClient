import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader, LoaderSmall } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initRandomPrompt, setInitRandomPrompt] = useState("");

  useEffect(() => {
    setInitRandomPrompt(getRandomPrompt(""));
  }, []);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://apixi-server.cyclic.cloud/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.error(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://apixi-server.cyclic.cloud/api/v1/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        console.log(response);
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    setForm({ ...form, prompt: initRandomPrompt });
    setInitRandomPrompt(getRandomPrompt(initRandomPrompt));
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#ececee] text-[32px] ">Create</h1>
        {/* prettier-ignore */}
        <p className="mt-2 text-[#a0a4a7] text-[16px] max-w-[700px]">
          Create imaginative and visually stunning images through Apixi
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} action="">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder={initRandomPrompt}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  focus:border-blue-500 w-64 p-3 h-64 justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-12/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader w={10} h={10} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-emerald-600 font-medium rounded-md text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>

          {form.photo ? (
            <a
              download={`apixi-${form.prompt}`}
              href={form.photo}
              className="text-white bg-sky-700 font-medium rounded-md text-md w-[50%] sm:w-auto px-5 py-2.5 text-center"
            >
              Download
            </a>
          ) : (
            <></>
          )}
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once your have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            <span className="align-middle justify-center flex flex-row">
              {loading ? <LoaderSmall /> : <></>}
              {loading ? "Sharing..." : "Share with the community"}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
