async function getAuthorsResponse(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.authors;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getRandomAuthor() {
  try {
    let authors = await getAuthorsResponse('https://poetrydb.org/author');
    if (authors.length === 0) throw new Error('No authors found');
    let randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    return randomAuthor;
  } catch (error) {
    console.error('Error:', error);
    return 'Author not available';
  }
}

async function getTitlesByAuthor(author) {
  try {
    let encodedAuthor = encodeURIComponent(author);
    let response = await fetch(
      `https://poetrydb.org/author/${encodedAuthor}/title`
    );
    const data = await response.json();
    const titles = data.map((poem) => poem.title);
    return titles;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getRandomTitleByAuthor(author) {
  try {
    let titles = await getTitlesByAuthor(author);
    if (titles.length === 0) throw new Error('No titles found');
    let randomTitle = titles[Math.floor(Math.random() * titles.length)];
    return randomTitle;
  } catch (error) {
    console.error('Error:', error);
    return 'Title not available';
  }
}

async function getPoem() {
  try {
    let randomAuthor = await getRandomAuthor();
    let randomTitle = await getRandomTitleByAuthor(randomAuthor);

    let encodedAuthor = encodeURIComponent(randomAuthor);
    let encodedTitle = encodeURIComponent(randomTitle);

    let response = await fetch(
      `https://poetrydb.org/author,title/${encodedAuthor};${encodedTitle}/lines`
    );
    const data = await response.json();
    const poemLines = data[0].lines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 20);
    return poemLines;
  } catch (error) {
    console.error('Error:', error);
    return 'Poem not available';
  }
}

export default getPoem;
