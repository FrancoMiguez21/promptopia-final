import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET, leer

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// PATCH, para actualizar

export const PATCH = async (request, { params }) =>{
    const {prompt, tag} = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status:200})
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE, para borrar

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Encuentra una prompt por id y la elimina
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};