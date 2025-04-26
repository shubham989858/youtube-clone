import { db } from "@/db"
import { categories } from "@/db/schema"

const categoriesData: {
    name: string,
    description?: string,
}[] = [
        {
            name: "Entertainment",
            description: "Movies, TV shows, celebrity news, and pop culture",
        },
        {
            name: "Music",
            description: "Music videos, covers, instrumentals, and playlists",
        },
        {
            name: "Gaming",
            description: "Gameplays, live streams, reviews, and esports",
        },
        {
            name: "Sports",
            description: "Live games, highlights, commentary, and fitness routines",
        },
        {
            name: "News",
            description: "Breaking news, politics, and world events",
        },
        {
            name: "Education",
            description: "Tutorials, how-to guides, and learning resources",
        },
        {
            name: "Technology",
            description: "Tech reviews, gadgets, software, and coding",
        },
        {
            name: "Science",
            description: "Discoveries, experiments, and scientific breakdowns",
        },
        {
            name: "Health & Fitness",
            description: "Wellness, workouts, mental health, and medical tips",
        },
        {
            name: "Travel",
            description: "Travel vlogs, destination guides, and exploration",
        },
        {
            name: "Food & Drink",
            description: "Cooking, recipes, food reviews, and eating challenges",
        },
        {
            name: "Fashion & Beauty",
            description: "Style tips, makeup, skincare, and clothing hauls",
        },
        {
            name: "Lifestyle",
            description: "Daily routines, vlogs, productivity, and organization",
        },
        {
            name: "Comedy",
            description: "Funny skits, stand-up, memes, and parodies",
        },
        {
            name: "Business & Finance",
            description: "Money tips, investing, entrepreneurship, and markets",
        },
        {
            name: "Motivation & Self Help",
            description: "Inspirational content, success stories, and advice",
        },
        {
            name: "History",
            description: "Historical facts, documentaries, and retrospectives",
        },
        {
            name: "Documentary",
            description: "Deep dives into real-world topics and stories",
        },
        {
            name: "Automotive",
            description: "Cars, bikes, reviews, and custom builds",
        },
        {
            name: "Art & Design",
            description: "Drawing, painting, digital art, and creativity",
        },
        {
            name: "Photography & Film",
            description: "Cinematography, camera tips, and editing tutorials",
        },
        {
            name: "DIY & Crafts",
            description: "Home projects, crafts, and creative builds",
        },
        {
            name: "Home & Garden",
            description: "Interior design, gardening, and home improvement",
        },
        {
            name: "Pets & Animals",
            description: "Cute pets, animal care, and wildlife content",
        },
        {
            name: "Spirituality & Religion",
            description: "Faith, beliefs, and spiritual discussions",
        },
        {
            name: "Books & Literature",
            description: "Book reviews, readings, and discussions",
        },
        {
            name: "Real Estate",
            description: "Home tours, market insights, and buying tips",
        },
        {
            name: "Parenting & Family",
            description: "Tips for parents, family vlogs, and child care",
        },
        {
            name: "Shorts",
            description: "Quick, engaging vertical videos across topics",
        },
        {
            name: "Podcasts",
            description: "Full episodes, clips, and interviews from audio shows",
        },
    ]

const main = async () => {
    try {
        await db.insert(categories).values(categoriesData)

        console.log("Categories seeded successfully.")
    } catch (error) {
        console.error(`Error occurred while seeding categories: ${error}`)

        process.exit(1)
    }
}

main()