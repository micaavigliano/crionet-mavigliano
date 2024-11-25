export const breakWords = (phrase: string) => {
  return phrase ? phrase
    .split(' ')
    .map(
      (word) =>
        // create a case where there is two scenarios and compares them on the server side using regex
        // to check if one of the two options is correct. This will prevent to make the check on the client
        // side and improve the performance of the search
        `(${word[0].toLowerCase()}|${word[0].toUpperCase()})${word.slice(1)}`
    )
    .join('\\s+')
  : '';
}