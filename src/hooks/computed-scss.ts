const computedScss = (scss: string) => {
  const scssStr = scss.replace(/(:export)|{|}|\n| /g, '')
  const scssMap = scssStr
    .split(';')
    .slice(0, -1)
    .map((item) => item.split(':'))
  return Object.fromEntries(scssMap)
}

export default computedScss
