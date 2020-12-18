const { REACT_APP_HOST } = process.env;

async function search(keyword) {
  try {
    const res = await fetch(`${REACT_APP_HOST}/search?q=${keyword}`);
    const results = await res.json();

    return results;
  } catch (error) {
    return error;
  }
}

export default search;
