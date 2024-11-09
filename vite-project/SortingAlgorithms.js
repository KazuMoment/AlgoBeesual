// src/sortAlgorithms.js

export async function bubbleSort(array, displayArray, sleep) {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                displayArray(arr);
                await sleep(100);
            }
        }
    }
}

export async function selectionSort(array, displayArray, sleep) {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        displayArray(arr);
        await sleep(100);
    }
}

export async function insertionSort(array, displayArray, sleep) {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        displayArray(arr);
        await sleep(100);
    }
}

export async function mergeSort(array, displayArray, sleep) {
    let arr = [...array];

    async function mergeSortRecursive(arr, l, r) {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        await mergeSortRecursive(arr, l, m);
        await mergeSortRecursive(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;
        let left = [], right = [];

        for (let i = 0; i < n1; i++) left[i] = arr[l + i];
        for (let j = 0; j < n2; j++) right[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
            displayArray(arr);
            await sleep(100);
        }

        while (i < n1) arr[k++] = left[i++];
        while (j < n2) arr[k++] = right[j++];
        displayArray(arr);
        await sleep(100);
    }

    await mergeSortRecursive(arr, 0, arr.length - 1);
}

export async function quickSort(array, displayArray, sleep) {
    let arr = [...array];

    async function quickSortRecursive(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            await quickSortRecursive(arr, low, pi - 1);
            await quickSortRecursive(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                displayArray(arr);
                await sleep(100);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        displayArray(arr);
        await sleep(100);
        return i + 1;
    }

    await quickSortRecursive(arr, 0, arr.length - 1);
}
