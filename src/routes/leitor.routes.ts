import { Router } from "express";
import Leitor from "../entities/Leitor";
import { AppDataSource } from "../database/data-source";

const leitorRouter = Router();

// Repositório da entidade Leitor
const leitorRepository = AppDataSource.getRepository(Leitor);

// Criar um leitor
leitorRouter.post("/", async (req, res) => {
  try {
    const { name, email, phone_number, birthdate, address } = req.body;
    const leitor = leitorRepository.create({
      name,
      email,
      phone_number,
      birthdate,
      address,
      active: true,
    });
    await leitorRepository.save(leitor);
    return res.status(201).json(leitor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar leitor" });
  }
});

// Buscar todos os leitores
leitorRouter.get("/", async (req, res) => {
  try {
    const leitores = await leitorRepository.find();
    return res.json(leitores);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar leitores" });
  }
});

// Buscar um leitor por ID
leitorRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leitor = await leitorRepository.findOneBy({ id: Number(id) });
    if (!leitor) {
      return res.status(404).json({ error: "Leitor não encontrado" });
    }
    return res.json(leitor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar leitor" });
  }
});

// Atualizar um leitor
leitorRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, birthdate, address, active } = req.body;

    const leitor = await leitorRepository.findOneBy({ id: Number(id) });
    if (!leitor) {
      return res.status(404).json({ error: "Leitor não encontrado" });
    }

    leitorRepository.merge(leitor, { name, email, phone_number, birthdate, address, active });
    await leitorRepository.save(leitor);

    return res.json(leitor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar leitor" });
  }
});

// Deletar um leitor
leitorRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const leitor = await leitorRepository.findOneBy({ id: Number(id) });
    if (!leitor) {
      return res.status(404).json({ error: "Leitor não encontrado" });
    }

    await leitorRepository.remove(leitor);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar leitor" });
  }
});

export default leitorRouter;

