const express = require('express');
const { uuid } = require('uuidv4');

const server = express();
server.use(express.json());

const projects = [];

server.get('/projects', (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(results);
});

server.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };
  projects.push(project);

  return res.json(project);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

const port = 3333;

server.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
