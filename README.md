# Blog Application

A full-stack blog application built with React, GraphQL, and MongoDB.

## Features

- **Rich Text Editor**: Create and edit articles with formatting, images, and styling using Tiptap
- **GraphQL API**: Efficient data fetching with Apollo Server and Apollo Client
- **Real-time Updates**: WebSocket subscriptions for live content updates
- **Contact Form**: Email integration using EmailJS
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Apollo Client** for GraphQL
- **Tiptap** for rich text editing
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **Apollo Server** with GraphQL subscriptions
- **MongoDB** with native driver
- **TypeScript** for type safety

## Project Structure

```
blog/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── ...
├── server/          # Node.js backend
│   ├── src/
│   │   ├── features/    # Feature-based modules
│   │   ├── db/          # Database connection
│   │   └── ...
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- EmailJS account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

3. **Environment Setup**

   **Server** (`server/.env`):
   ```env
   ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/articles
   PORT=5050
   ```

   **Client** (`client/.env`):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Development

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - GraphQL Playground: http://localhost:5050/graphql

## API Endpoints

### GraphQL Queries
- `articles` - Get all articles
- `article(id: ID!)` - Get article by ID

### GraphQL Mutations
- `createArticle(input: CreateArticleInput!)` - Create new article
- `updateArticle(input: UpdateArticleInput!)` - Update existing article
- `deleteArticle(id: ID!)` - Delete article

### WebSocket Subscriptions
- Available at `ws://localhost:5050/graphql`

## Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request