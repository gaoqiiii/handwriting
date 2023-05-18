let executeCount = 0;
const targetFn = async nums => {
  executeCount++;
  return nums.map(num => 2 * num + 1);
};

const batcher = (fn) => {
  // todo batch logic
  let queue = []
  let isProcessing = false
  return nums => {   
    return new Promise( reslove => {
      queue.push({
        nums,
        reslove
      })
      if(!isProcessing) {
        isProcessing = true
        setTimeout( async () => {
          const result = await fn(queue.map(item => item.nums).flat())
          queue.forEach((item, index) => {
            const startIndex = index * item.nums.length
            const endIndex = startIndex + item.nums.length
            item.reslove(result.slice(startIndex, endIndex))
          })
          queue = []
          isProcessing = false
        }, 0)
      } 
    })
  }
}

const batchedFn = batcher(targetFn);

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7]),
  ]);
  
  console.log(result1, result2, result3) 
  console.log(executeCount)  // 预期为 1
}

main()