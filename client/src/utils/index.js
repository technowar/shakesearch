function search(result, search) {
  let text = result;
  const lowercaseResult = result.toLowerCase();
  const lowercaseSearch = search.toLowerCase();

  if (new RegExp(lowercaseSearch).test(lowercaseResult)) {
    text = lowercaseResult.replace(new RegExp(lowercaseSearch), `<span class="bold italic underline">${search.toUpperCase()}</span>`);
  }

  return text;
}

export default search;
