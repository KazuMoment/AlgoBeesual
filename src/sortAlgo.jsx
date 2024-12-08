// src/sortAlgorithms.js
export async function bubbleSort(array, setArray, sleep) {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setArray([...arr]);
                await sleep(100);
            }
        }
    }
}


