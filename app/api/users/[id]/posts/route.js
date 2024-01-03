// import User from "@models/userModel";
// import { connectToDB } from "@util/database";

// export const GET = async (req, { params }) => {
//   try {
//     await connectToDB();

//     const prompts = await User.find({
//         creator: params.id
//     }).populate("creator");

//     return new Response(JSON.stringify(prompts), { status: 200 });
//   } catch (error) {
//     return new Response( "Falied to fetch the personl prompts for profile page" ,  { status: 500 });
//   }
// };

import { connectToDB } from "@util/database";
import Prompt from "@models/promptModel";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
