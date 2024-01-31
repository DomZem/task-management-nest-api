import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = await argon.hash('zaq1@WSX');

  // create user
  const user = await prisma.user.upsert({
    where: { email: 'anakin.skywalker@gmail.com' },
    update: {},
    create: {
      email: 'anakin.skywalker@gmail.com',
      firstName: 'Anakin',
      lastName: 'Skywalker',
      password,
    },
  });

  const boardNames = ['Platform Launch', 'Marketing Plan', 'Roadmap'];
  const statusNames = ['Todo', 'Doing', 'Done'];
  const colorsHex = ['#9333ea', '#2563eb', '#c026d3'];

  const taskTitles = [
    'Build UI for onboarding flow',
    'Build UI for search',
    'Build settings UI',
    'QA and test all major user journeys',
    'Design settings and search pages',
    'Add account management endpoints',
    'Design onboarding flow',
    'Add search endpoints',
    'Add authentication endpoints',
    'Research pricing points of various competitors and trial different business models',
    'Conduct 5 wireframe tests',
    'Create wireframe prototype',
    'Review results of usability tests and iterate',
    'Create paper prototypes and conduct 10 usability tests with potential customers',
    'Market discovery',
    'Competitor analysis',
    'Research the market',
  ];
  const taskDescriptions = [
    "We have a clear vision for our version one product, and now it's time to create the user interface for the onboarding flow.",
    "Our goal is to develop the user interface components that facilitate an efficient search experience. Users should be able to quickly find what they're looking for.",
    'We need to create the user interface for the settings page, allowing users to customize their preferences and configurations.',
    "It's time to thoroughly test the major user journeys within our application. Identify critical paths, simulate user interactions, and ensure a smooth user experience.",
    'Currently in the design phase, this task involves creating the visual layouts for both the settings and search pages.',
    "In this phase, we're extending the backend functionality to support user account management. Implement API endpoints for user registration, login, and profile management.",
    "In this active task, we're focusing on creating a smooth and engaging onboarding experience for our users. Design the step-by-step journey that introduces users to our platform.",
    'This task involves developing the necessary backend API endpoints to enable robust search functionality. Implement search queries, filters, and sorting.',
    "Security is crucial for our application. In this task, we're creating the backend endpoints needed for user authentication and authorization.",
    "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    'We successfully conducted usability tests on our wireframe prototypes, involving users to provide valuable feedback. This process helped us identify usability issues early.',
    "We've created a comprehensive wireframe prototype that serves as a visual blueprint for our product's interface. This prototype is the result of careful planning.",
    'After analyzing the results of our usability tests, we identified areas for improvement. We iterated on our design based on the feedback received from users.',
    'We went through a comprehensive process of creating paper prototypes and conducting usability tests with potential customers. This helped us validate our design concepts and gather insights.',
    "Through thorough research and analysis, we've successfully explored the market landscape. This task provided us with valuable insights into potential opportunities.",
    'We conducted a comprehensive analysis of our competitors, identifying their strengths and weaknesses. This analysis has informed our strategy and allowed us to differentiate our product.',
    'Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges.',
  ];

  const subtaskTitles = [
    'Research UI design patterns for onboarding flow',
    'Finalize user journey for onboarding process',
    'Design onboarding user interface elements',
    'Design onboarding user interface elements', // Duplicate entry, please verify
    'Identify critical user journeys for testing',
    'Create test scenarios for user journey validation',
    'Sketch UI concepts for settings page',
    'Prototype search results page layout',
    'Refine visual design for settings UI',
    'Define API endpoints for account creation',
    'Implement user profile update endpoints',
    'Test account-related API functionalities',
    'Sketch initial onboarding process steps',
    'Create wireframes for onboarding screens',
    'Design seamless transitions between onboarding stages',
    'Define API endpoints for search functionality',
    'Implement search query processing logic',
    'Develop API endpoints for user authentication',
    'Implement token-based authentication logic',
    'Research competitor pricing and business models',
    'Outline a business model that works for our solution',
    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
    'Recruit participants for wireframe evaluation',
    'Develop interactive wireframes for user testing',
    'Collect usability testing feedback data',
    'Analyze usability test results for improvements',
    'Implement iterative design changes based on feedback',
    'Craft paper-based prototypes for usability testing',
    'Recruit participants for paper prototype evaluations',
    'Investigate potential target markets for the product',
    'Research competing products and services',
    'Analyze strengths and weaknesses of competitors',
    'Explore market trends and emerging technologies',
    'Identify opportunities and challenges in the market',
  ];

  // create boards
  for (let i = 0; i < boardNames.length; i++) {
    const board = await prisma.board.create({
      data: {
        name: boardNames[i],
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // create statuses
    for (let i = 0; i < statusNames.length; i++) {
      const status = await prisma.status.create({
        data: {
          color:
            colorsHex[
              faker.helpers.rangeToNumber({ min: 0, max: colorsHex.length - 1 })
            ],
          name: statusNames[i],
          board: {
            connect: {
              id: board.id,
            },
          },
        },
      });

      // create tasks
      for (let i = 0; i < faker.number.int({ min: 2, max: 6 }); i++) {
        const task = await prisma.task.create({
          data: {
            title:
              taskTitles[
                faker.helpers.rangeToNumber({
                  min: 0,
                  max: taskTitles.length - 1,
                })
              ],
            description:
              taskDescriptions[
                faker.helpers.rangeToNumber({
                  min: 0,
                  max: taskDescriptions.length - 1,
                })
              ],
            statusId: status.id,
          },
        });

        // create subtasks
        for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
          await prisma.subtask.create({
            data: {
              title:
                subtaskTitles[
                  faker.helpers.rangeToNumber({
                    min: 0,
                    max: subtaskTitles.length - 1,
                  })
                ],
              isComplete: faker.datatype.boolean({ probability: 0.5 }),
              taskId: task.id,
            },
          });
        }
      }
    }
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
