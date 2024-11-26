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

export const pastelColors = [
  'bg-red-200 text-red-800',
  'bg-pink-200 text-pink-800',
  'bg-orange-200 text-orange-800',
  'bg-yellow-200 text-yellow-800',
  'bg-lime-200 text-lime-800',
  'bg-green-200 text-green-800',
  'bg-emerald-200 text-emerald-800',
  'bg-teal-200 text-teal-800',
  'bg-cyan-200 text-cyan-800',
  'bg-sky-200 text-sky-800',
  'bg-blue-200 text-blue-800',
  'bg-indigo-200 text-indigo-800',
  'bg-violet-200 text-violet-800',
  'bg-purple-200 text-purple-800',
  'bg-fuchsia-200 text-fuchsia-800',
  'bg-rose-200 text-rose-800'
];