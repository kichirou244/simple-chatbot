export default function chunkTexts(text, chunkSize = 500, overlapSize = 100) {
    const chunks = [];
    
    let start = 0;

    while (start < text.length) {
        const end = start + chunkSize;
        const chunk = text.slice(start, end);
        chunks.push(chunk);

        start += (chunkSize - overlapSize);
    }

    return chunks;
}