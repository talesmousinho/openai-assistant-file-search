This is a **[Next.js](https://nextjs.org/) 14** project using new features like App Router and Server Actions.  
It serves as an example of how to use the OpenAI Assistant API with the Retrieval Tool enabled, allowing it to chat with any document supported by OpenAI.  
**It does not require any provisioned vector database to do Retrieval-augmented generation (RAG), uses only OpenAI SDK to manage and chat with proprietary documents.**

## Features

- [Next.js 14](https://nextjs.org) App Router and Server Actions
- [OpenAI Assistant API](https://platform.openai.com/docs/assistants/overview) with Retrieval Tool to chat with any document supported by OpenAI, see [Supported files](https://platform.openai.com/docs/assistants/tools/file-search/supported-files).
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Lucide Icons](https://lucide.dev/)

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies with `npm install`.
3. Set up your environment variables in a `.env` file in the root directory of the project. Use the provided `.env.example` file as a template. You will need to provide your OpenAI API Key.
4. Run the development server with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [OpenAI Documentation](https://platform.openai.com/docs/assistants/overview) - learn how to use the OpenAI Assistant API.

## Not for production

This is a proof of concept and should not be used in production as it is. It does not have any rate limiting or security features enabled.
