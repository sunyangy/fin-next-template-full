# Fin Next.js Full-Stack Template

A comprehensive, production-ready Next.js template with authentication, internationalization, dark mode, and modern UI components.

## 🚀 Features

### 🔐 Authentication System
- **NextAuth.js Integration**: Complete authentication with multiple providers
- **Email Verification**: Secure email verification system
- **Session Management**: Robust session handling with middleware protection
- **Protected Routes**: Automatic route protection with AuthGuard component

### 🌍 Internationalization (i18n)
- **Multi-language Support**: Built-in support for English and Chinese
- **Dynamic Routing**: Locale-based routing with `[locale]` structure
- **Message Management**: Centralized message files for easy translation
- **RTL Support**: Ready for right-to-left languages

### 🎨 UI/UX Features
- **Dark Mode**: Complete dark/light theme system with ThemeProvider
- **Modern Components**: Reusable UI components with TypeScript
- **Responsive Design**: Mobile-first responsive layout
- **Beautiful UI**: Clean, modern interface with best UX practices

### 🛠️ Development Features
- **TypeScript**: Full TypeScript support for type safety
- **Prisma ORM**: Database management with Prisma
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management

### 📱 Modern Stack
- **Next.js 14**: Latest Next.js with App Router
- **React 18**: Latest React features
- **PostCSS**: Advanced CSS processing
- **Vercel Ready**: Optimized for Vercel deployment

## 🏗️ Project Structure

```
fin-next-template-full/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Protected dashboard
│   │   └── layout.tsx      # Root layout
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication APIs
│   │   └── ...             # Other API endpoints
│   └── globals.css         # Global styles
├── components/
│   ├── auth/               # Authentication components
│   ├── darkmode/           # Theme components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utility libraries
├── messages/               # i18n message files
├── prisma/                 # Database schema
├── stores/                 # State management
└── middleware.ts           # Route protection
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:sunyangy/fin-next-template-full.git
   cd fin-next-template-full
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_SERVER_HOST="your-email-host"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email-user"
   EMAIL_SERVER_PASSWORD="your-email-password"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

## 🔧 Configuration

### Authentication
The template uses NextAuth.js with the following features:
- Email/password authentication
- Email verification
- Session management
- Protected routes

### Internationalization
- Supported languages: English (en), Chinese (zh)
- Dynamic locale routing
- Message file management

### Database
- Prisma ORM for database management
- SQLite for development (easily switchable to PostgreSQL/MySQL)
- User management schema included

## 🎨 Customization

### Adding New Languages
1. Create a new message file in `messages/` directory
2. Update the locale configuration in `i18n/` directory
3. Add the locale to your routing configuration

### Styling
- Tailwind CSS for styling
- Custom CSS variables for theming
- Dark mode support built-in

### Components
- Reusable UI components in `components/ui/`
- Authentication components in `components/auth/`
- Theme components in `components/darkmode/`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The template is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management

## 📞 Support

If you have any questions or need help with this template, please:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy coding! 🎉**