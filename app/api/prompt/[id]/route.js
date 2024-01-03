import Prompt from "@models/promptModel";
import { connectToDB } from "@util/database";

// GET (read) -
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 400 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the requested prompt", {
      status: 500,
    });
  }
};

// PATCH (update) -
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 400 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE (delete) -
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    console.log(params.id);
    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 400 });

    return new Response("Prompt is deleted", { status: 200 });
  } catch (error) {
    // return new Response("Prompt cannot be deleted", { status: 500 });
    console.log("ERROR : ", error)
  }
};
