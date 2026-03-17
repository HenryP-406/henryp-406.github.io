// Sorting methodology:
// A sorting algorithm is able to take an array and return a ne

// Generic methods to implement.
const SortingPrototype = {
    // An array of items. When declaring a sorting algorithm, it should operate
    // on `this.items`. To set up a sorting algorithm, simply modify this array.
    items: [],
    // Used by the algorithm to save data between runs. Unless you know what
    // you're doing, don't modify this outside the object.
    store: {},
    // Performs an iteration of sorting on the algorithm.
    sort() {},
    resetStore() {},
    isDone: checkIsSorted
}

function checkIsSorted() {
    for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i] > this.items[i + 1]) return false;
    }
    return true;
}

function newSortingAlgorithm(sortFunction, resetFunction) {
    let object = {
        __proto__: SortingPrototype,
        // store: resetFunction(),
        sort: sortFunction,
        resetStore: resetFunction,
    };
    object.resetStore();
    return object;
}

function bubbleSortSetup() {
    this.store = {
        max_index: this.items.length - 1
    };
}

function bubbleSort() {
    for (var i = 0; i < this.store.max_index; ++i) {
        if (this.items[i] > this.items[i + 1]) {
            temp = this.items[i];
            this.items[i] = this.items[i + 1];
            this.items[i + 1] = temp;
        }
    }
    this.store.max_index -= 1;
}

function bubbleSortIsDone() {
    return this.store.max_index = 0;
}

var bubbleSortAlgorithm = newSortingAlgorithm(bubbleSort, bubbleSortSetup);
bubbleSortAlgorithm.isDone = bubbleSortIsDone;

var sortingCanvas = document.getElementById("sorting-display");
function sortCanvas(canvas) {
    
}
sortingCanvas