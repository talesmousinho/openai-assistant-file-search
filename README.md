# Next.js 14 OpenAI Assistants Chatbot with File Search

This is a **Next.js 14** project using features like _App Router_ and _Server Actions_. It showcases the use of the **OpenAI Assistants API** with the _File Search Tool_ enabled, allowing it to interact with any document supported by OpenAI.  
**This application does not rely on any provisioned vector database or third-party libraries for Retrieval-augmented generation (RAG). Instead, it exclusively utilizes the OpenAI SDK to manage and interact with proprietary documents.**

## Features

- [Next.js 14](https://nextjs.org) App Router and Server Actions
- [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview)
  - With [File Search](https://platform.openai.com/docs/assistants/tools/file-search) tool to chat with any [document supported](https://platform.openai.com/docs/assistants/tools/file-search/supported-files) by OpenAI
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
  - Use [createStreamableValue](https://sdk.vercel.ai/docs/api-reference/generative-ui/create-streamable-value) and [readStreamableValue](https://github.com/vercel/ai/pull/1114) for streaming OpenAI's response
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Lucide Icons](https://lucide.dev/)

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies with `npm install`.
3. Set up your environment variables in a `.env.local` file in the root directory of the project. Use the provided `.env.example` file as a template. You will need to provide your OpenAI API Key.
4. Run the development server with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [OpenAI Documentation](https://platform.openai.com/docs/assistants/overview) - learn how to use the OpenAI Assistants API.

## Not for production

This is a proof of concept and should not be used in production as it is. It does not have any rate limiting or security features enabled.
