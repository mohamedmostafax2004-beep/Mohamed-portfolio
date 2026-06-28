const portfolioData = {
    personal: {
        name: "Mohamed Mostafa",
        title: "Front-End Developer & UI/UX Designer",
        age: 21,
        location: "El Mahalla El Kubra, Gharbia",
        education: {
            university: "Sinai University",
            faculty: "Faculty of Computers and Information",
            duration: "2022 - 2026",
        },
        about:
            "I am Mohamed, a 21-year-old Front-End Developer. I have embarked on a passionate journey in learning and mastering HTML, CSS, JavaScript, Tailwind CSS, and React. Along the way, I have successfully built and deployed numerous interactive web projects, focusing on responsive design, clean semantic code, and exceptional user experiences.",
        specialties: "Web Design & UI/UX Development",
        email: "mohamedmostafax2004@gmail.com",
        whatsapp: "https://wa.me/201050792421",
        facebook: "https://www.facebook.com/share/1GuoqNma7U/",
        github: "https://github.com/mohamedmostafax2004-beep",
        linkedin: "",
        profileImage: "profile.jpg",
    },
    skills: {
        frontend: [
            {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                level: "Advanced",
            },
            {
                name: "JavaScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                level: "Advanced",
            },
            {
                name: "HTML5 & CSS3",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                level: "Advanced",
            },
            {
                name: "Tailwind CSS",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
                level: "Advanced",
            },
        ],
        uiux: [
            {
                name: "Figma Prototyping",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                level: "Advanced",
            },
            {
                name: "Design Systems",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
                level: "Advanced",
            },
            {
                name: "User Flow Design",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unifiedmodelinglanguage/unifiedmodelinglanguage-original.svg",
                level: "Advanced",
            },
            {
                name: "Wireframing",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
                level: "Advanced",
            },
        ],
        additional: [
            {
                name: "Python",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                level: "Advanced",
            },
            {
                name: "C++",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
                level: "Advanced",
            },
        ],
    },
    tools: [
        {
            category: "Version Control",
            icon: "🔧",
            items: [
                {
                    name: "Git",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                },
                {
                    name: "GitHub",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                    invert: true,
                },
            ],
        },
        {
            category: "Hosting & Deployment",
            icon: "🚀",
            items: [
                {
                    name: "Vercel",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
                    invert: true,
                },
                {
                    name: "Netlify",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
                },
            ],
        },
        {
            category: "Development & CLI",
            icon: "💻",
            items: [
                {
                    name: "VS Code",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                },
                { name: "PowerShell / Terminal", emoji: "⬛" },
                {
                    name: "npm / npx",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
                },
            ],
        },
        {
            category: "AI & Productivity",
            icon: "🤖",
            items: [
                { name: "Gemini AI Integrations", emoji: "✨" },
                {
                    name: "Figma Designs",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                },
                { name: "AI Coding Assistants", emoji: "🤖" },
            ],
        },
    ],
    projects: [
        {
            title: "Advanced Weather Forecasting Web System",
            description: "Advanced Weather Forecasting Web System, is a full-stack web application designed to help users analyze historical weather data and forecast future weather conditions using reliable climate datasets.",
            link: "https://skycast-weather-dashboard-three.vercel.app/",
            icon: "🌤️",
            tag: "Full-Stack",
            tech: ["React", "JavaScript", "HTML5 & CSS3", "Climate API"]
        },
        {
            title: "El-Abd Furnitures Factory",
            description: "El-Abd Furnitures Web System is a premium digital catalog and showroom application built for El-Abd Furniture Factory, designed to showcase high-quality modern furniture with an interactive, responsive layout.",
            link: "https://el-abd-furniture.vercel.app/",
            icon: "🛋️",
            tag: "Frontend Catalog",
            tech: ["JavaScript", "HTML5", "CSS3", "Responsive UI"]
        }
    ]
};

// Export to window object for browser access
window.portfolioData = portfolioData;
