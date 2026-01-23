function formatarData(body) {
    return body
    .split(',')
    .map(dateStr => dateStr.trim())
    .map(dateStr => {
        const parts = dateStr.split('/')
        return new Date(parts[2], parts[1] - 1, parts[0])
    })

}

export default formatarData