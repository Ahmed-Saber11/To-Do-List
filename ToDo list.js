const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

app.use(express.json());


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Simple Todo API using Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'], // هنا يشير لملف الكود
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - due_date
 *         - priority
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         due_date:
 *           type: string
 *           format: date
 *         completed:
 *           type: boolean
 *         priority:
 *           type: string
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks with optional filters
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter tasks by priority
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
let tasks = [
  { id: 1, title: 'Finish Homework', description: 'Complete the math assignment', due_date: '2025-04-20', completed: false, priority: 'high' },
  { id: 2, title: 'Buy Groceries', description: 'Buy fruits and vegetables', due_date: '2025-04-21', completed: false, priority: 'medium' }
];

app.get('/tasks', (req, res) => {
  const query = req.query;
  let filteredTasks = tasks;

  Object.keys(query).forEach(key => {
    filteredTasks = filteredTasks.filter(task => task[key] == query[key]);
  });

  res.json(filteredTasks);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.post('/tasks', (req, res) => {
  const { title, description, due_date, priority } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    due_date,
    completed: false,
    priority
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  Object.assign(task, req.body);
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Mark a task as complete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task marked as complete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = true;
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}/incomplete:
 *   put:
 *     summary: Mark a task as incomplete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task marked as incomplete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id/incomplete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = false;
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}/priority:
 *   put:
 *     summary: Change the priority of a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task priority updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id/priority', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { priority } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.priority = priority;
  res.json(task);
});

app.listen(port, () => {
  console.log(`Todo API running on port ${port}`);
});
