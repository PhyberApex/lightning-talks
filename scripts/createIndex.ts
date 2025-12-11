import fs from 'fs';

type Talk = {
    title: string,
    date: string,
    link: string,
    tags: string[],
}

// Function to parse the markdown content
function parseMarkdown(markdownContent: string) {
    const talks: Array<Talk> = [];
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
            const tags = row[3].split(',').map(tag => tag.trim());

            talks.push({ title, date, link, tags });
        }
        currentIndex++;
    }

    return talks;
}

// Function to format the date
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to generate tags HTML
function generateTagsHTML(tags: string[]) {
    return tags
        .filter(tag => tag.length > 0)
        .map(tag => `<span class="talk-tag">${tag}</span>`)
        .join('');
}

// Function to generate talk cards HTML
function generateTalkCards(talks: Array<Talk>) {
    return talks.map(talk => `
            <div class="talk-card">
                <h2 class="talk-title">${talk.title}</h2>
                <div class="talk-date">${formatDate(talk.date)}</div>
                <div class="talk-tags">${generateTagsHTML(talk.tags)}</div>
                <a href="${talk.link}" class="view-talk">View Talk</a>
            </div>`
    ).join('\n');
}

// Main function to convert markdown to HTML
function convertMarkdownToHTML(templatePath: string, markdownPath: string, outputPath: string) {
    try {
        const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        const markdownContent = fs.readFileSync(markdownPath, 'utf8');

        const talks = parseMarkdown(markdownContent) as Array<Talk>;

        const talkCardsHTML = generateTalkCards(talks);
        const finalHTML = htmlTemplate.replace('{{TALKS}}', talkCardsHTML);

        fs.writeFileSync(outputPath, finalHTML);

        console.log(`Successfully generated ${outputPath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage
const markdownPath = 'README.md';  // Path to your markdown file
const outputPath = 'dist/index.html';   // Output path for the HTML file
const templatePath = 'scripts/indexTemplate.html';

convertMarkdownToHTML(templatePath, markdownPath, outputPath);