import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wand2, Share2, AlertCircle, Image } from "lucide-react";

import { preview } from "../../assets";
import { getRandomPrompt } from "../utils/index";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (err) {
        setError("Failed to share image. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please generate an image with a prompt first");
    }
  };

  const generateImg = async () => {
    if (!form.prompt) {
      setError("Please enter a prompt first");
      return;
    }

    setError("");
    try {
      setGeneratingImg(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log("Server request timed out");
        controller.abort();
      }, 90000);

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: form.prompt }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (!data.photo) {
        throw new Error("No photo returned from server");
      }

      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (error) {
      console.error("GenerateImg Error:", error.message);
      setError(`Error generating image: ${error.message}`);
    } finally {
      setGeneratingImg(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-8 rounded-xl shadow-lg mb-10 text-white text-center">
        <h1 className="text-3xl font-bold mb-3">Create New Image</h1>
        <p className="text-lg text-purple-100 max-w-xl mx-auto">
          Transform your ideas into stunning AI-generated artwork. Enter a prompt, 
          generate your image, and share it with the community.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <form 
        className="mt-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-gray-900 dark:text-white" 
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A man standing in front of a stargate to another dimension"
            value={form.prompt}
            handleChange={(e) => setForm({ ...form, prompt: e.target.value })}
            isSurpriseMe
            handleSurpriseMe={() => {
              const randomPrompt = getRandomPrompt(form.prompt);
              setForm({ ...form, prompt: randomPrompt });
            }}
          />
          
          <div className="relative bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden transition-all duration-300 aspect-square flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Image size={80} className="text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                  Your creation will appear here. Enter a prompt and click "Generate" to create an image.
                </p>
              </div>
            )}
            
            {generatingImg && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/70 backdrop-blur-sm">
                <Loader />
                <p className="font-bold text-white mt-4 animate-pulse">
                  Creating your masterpiece...
                </p>
                <p className="text-gray-300 text-sm mt-2 max-w-xs text-center">
                  This may take up to a minute depending on the complexity of your prompt
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button
              type="button"
              onClick={generateImg}
              className="text-white cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-medium rounded-lg text-sm px-6 py-3 text-center flex-1 flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              disabled={generatingImg}
            >
              <Wand2 size={18} />
              {generatingImg ? "Generating..." : "Generate Image"}
            </button>
            
            <button
              type="submit"
              className={`font-medium rounded-lg text-sm px-6 py-3 text-center flex-1 flex items-center justify-center gap-2 shadow-md transition-all duration-200 ${
                form.photo
                  ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={loading || !form.photo}
            >
              <Share2 size={18} />
              {loading ? "Sharing..." : "Share with Community"}
            </button>
          </div>
          
          {form.photo && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mt-2">
              <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                Great job! Your image is ready to be shared with the community. Click the "Share" button to showcase your creation.
              </p>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreatePost;