const getChunk = async () => {
    const result = []

    console.log('Iterator reading started ...')

    for await (const chunk of process.stdin) {
        console.log('New chunk')

        result.push(chunk.toString())
    }

    console.log('Iterator Ended')

    return result
}

const result = await getChunk()

console.log('\n------\n')
console.log(result)