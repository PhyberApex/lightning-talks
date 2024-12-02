import fs from 'fs';

// HTML template with styles
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Lightning Talks by PhyberApex</title>
    <style>
        :root {
            --primary-color: #3178c6;
            --secondary-color: #235a97;
            --background-color: #f5f5f5;
            --card-background: #ffffff;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        header {
            background-color: var(--primary-color);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
            text-align: center;
        }

        h1 {
            margin: 0;
            font-size: 2.5rem;
        }

        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            margin-top: 0.5rem;
        }

        .talks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .talk-card {
            background: var(--card-background);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .talk-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .talk-title {
            color: var(--primary-color);
            font-size: 1.25rem;
            margin: 0 0 0.5rem 0;
        }

        .talk-date {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .view-talk {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background-color 0.2s ease-in-out;
        }

        .view-talk:hover {
            background-color: var(--secondary-color);
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>TypeScript Lightning Talks</h1>
            <p class="subtitle">A series of lightning talks by <a href="https://phyberapex.de">@PhyberApex</a> exploring TypeScript concepts</p>
        </div>
    </header>

    <main class="container">
        <div class="talks-grid">
            {{TALKS}}
        </div>
    </main>
</body>
</html>`;

// Function to parse the markdown content
function parseMarkdown(markdownContent) {
    const talks = [];
    const lines = markdownContent.split('\n');

    // Find the table content
    const tableStart = lines.findIndex(line => line.includes('| Topic'));
    if (tableStart === -1) return talks;

    // Skip the header and separator rows
    let currentIndex = tableStart + 2;

    // Parse each table row
    while (currentIndex < lines.length && lines[currentIndex].includes('|')) {
        const row = lines[currentIndex].split('|').filter(cell => cell.trim());
        if (row.length >= 3) {
            const title = row[0].trim();
            const date = row[1].trim();
            const link = row[2].trim().match(/\((.*?)\)/)?.[1] || '';

            talks.push({ title, date, link });
        }
        currentIndex++;
    }

    return talks;
}

// Function to format the date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to generate talk cards HTML
function generateTalkCards(talks) {
    return talks.map(talk => `
            <div class="talk-card">
                <h2 class="talk-title">${talk.title}</h2>
                <div class="talk-date">${formatDate(talk.date)}</div>
                <a href="${talk.link}" class="view-talk">View Talk</a>
            </div>`
    ).join('\n');
}

// Main function to convert markdown to HTML
function convertMarkdownToHTML(markdownPath, outputPath) {
    try {
        // Read markdown file
        const markdownContent = fs.readFileSync(markdownPath, 'utf8');

        // Parse markdown content
        const talks = parseMarkdown(markdownContent);

        // Generate talk cards
        const talkCardsHTML = generateTalkCards(talks);

        // Generate final HTML
        const finalHTML = htmlTemplate.replace('{{TALKS}}', talkCardsHTML);

        // Write to output file
        fs.writeFileSync(outputPath, finalHTML);

        console.log(`Successfully generated ${outputPath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage
const markdownPath = 'README.md';  // Path to your markdown file
const outputPath = 'dist/index.html';   // Output path for the HTML file

convertMarkdownToHTML(markdownPath, outputPath);