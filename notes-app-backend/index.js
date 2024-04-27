import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes" , async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({message: "Title and description are required"});
    };

    try {
        const note = await prisma.note.create({
            data: {title, description, createdAt: new Date()}
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

app.put("/api/notes/:id", async (req, res) => {
   const id = parseInt(req.params.id);
   const { title, description } = req.body;
   
    if(!id || isNaN(id)) {
        return res.status(400).json({message: "Invalid ID"});
    };

    if (!title || !description) {
        return res.status(400).json({message: "Title and description are required"});
    };

   try {
    const updatedNote = await prisma.note.update({
        where: {id},
        data: {title, description, createdAt: new Date()}
    });
    res.json(updatedNote);
   } catch(error) {
    res.status(500).json({message: "Something went wrong"});
   }
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
        return res.status(400).json({message: "Invalid ID"});
    };

    try {
        const deletedNote = await prisma.note.delete({
            where: {id}
        });
        res.json(deletedNote);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})